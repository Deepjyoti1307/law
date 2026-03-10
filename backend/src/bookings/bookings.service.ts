import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
    constructor(private prisma: PrismaService) { }

    async create(clientId: string, dto: CreateBookingDto) {
        // Verify lawyer profile exists
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: dto.lawyerProfileId },
            include: { user: { select: { id: true } } },
        });

        if (!lawyerProfile) {
            throw new NotFoundException('Lawyer profile not found');
        }

        // Prevent booking with self
        if (lawyerProfile.userId === clientId) {
            throw new ForbiddenException('Cannot book a consultation with yourself');
        }

        // Check for time conflicts
        const bookingDate = new Date(dto.date);
        const existingBooking = await this.prisma.booking.findFirst({
            where: {
                lawyerProfileId: dto.lawyerProfileId,
                date: bookingDate,
                startTime: dto.startTime,
                status: { in: ['PENDING', 'CONFIRMED'] },
            },
        });

        if (existingBooking) {
            throw new BadRequestException('This time slot is already booked');
        }

        const booking = await this.prisma.booking.create({
            data: {
                clientId,
                lawyerProfileId: dto.lawyerProfileId,
                date: bookingDate,
                startTime: dto.startTime,
                endTime: dto.endTime,
                type: (dto.type as any) || 'VIDEO',
                notes: dto.notes,
            },
            include: {
                lawyerProfile: {
                    include: {
                        user: { select: { id: true, name: true, email: true } },
                    },
                },
                client: { select: { id: true, name: true, email: true } },
            },
        });

        return this.formatBooking(booking);
    }

    async findByClient(clientId: string) {
        const bookings = await this.prisma.booking.findMany({
            where: { clientId },
            include: {
                lawyerProfile: {
                    include: {
                        user: { select: { id: true, name: true, avatar: true } },
                    },
                },
            },
            orderBy: { date: 'desc' },
        });

        return bookings.map(b => ({
            id: b.id,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            status: b.status,
            type: b.type,
            notes: b.notes,
            lawyerName: b.lawyerProfile.user.name,
            lawyerAvatar: b.lawyerProfile.user.avatar,
            specialization: b.lawyerProfile.specialization,
            lawyerProfileId: b.lawyerProfileId,
            createdAt: b.createdAt,
        }));
    }

    async findByLawyer(userId: string) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
        });

        if (!profile) return [];

        const bookings = await this.prisma.booking.findMany({
            where: { lawyerProfileId: profile.id },
            include: {
                client: { select: { id: true, name: true, email: true, avatar: true } },
            },
            orderBy: { date: 'desc' },
        });

        return bookings.map(b => ({
            id: b.id,
            date: b.date,
            startTime: b.startTime,
            endTime: b.endTime,
            status: b.status,
            type: b.type,
            notes: b.notes,
            clientName: b.client.name,
            clientEmail: b.client.email,
            clientAvatar: b.client.avatar,
            createdAt: b.createdAt,
        }));
    }

    async updateStatus(bookingId: string, userId: string, userRole: string, dto: UpdateBookingStatusDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                lawyerProfile: { select: { userId: true } },
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        // Authorization checks
        const isClient = booking.clientId === userId;
        const isLawyer = booking.lawyerProfile.userId === userId;

        if (!isClient && !isLawyer) {
            throw new ForbiddenException('Not authorized to update this booking');
        }

        // Clients can only cancel
        if (isClient && dto.status !== 'CANCELLED') {
            throw new ForbiddenException('Clients can only cancel bookings');
        }

        // Lawyers can confirm, cancel, or complete
        if (isLawyer && !['CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(dto.status)) {
            throw new BadRequestException('Invalid status transition');
        }

        const updated = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: dto.status as any },
        });

        return updated;
    }

    async getAvailableSlots(lawyerProfileId: string, dateStr: string) {
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: lawyerProfileId },
        });

        if (!lawyerProfile) {
            throw new NotFoundException('Lawyer profile not found');
        }

        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });

        // Get lawyer's availability for this day
        const availability = lawyerProfile.availability as Record<string, any> | null;
        if (!availability || !availability[dayName] || !availability[dayName].enabled) {
            return { date: dateStr, dayName, slots: [], message: 'Lawyer is not available on this day' };
        }

        const { start, end } = availability[dayName];

        // Generate 1-hour slots
        const slots: { startTime: string; endTime: string; available: boolean }[] = [];
        let [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);

        // Get existing bookings for this date
        const existingBookings = await this.prisma.booking.findMany({
            where: {
                lawyerProfileId,
                date,
                status: { in: ['PENDING', 'CONFIRMED'] },
            },
            select: { startTime: true },
        });

        const bookedTimes = new Set(existingBookings.map(b => b.startTime));

        while (startHour < endHour) {
            const slotStart = `${String(startHour).padStart(2, '0')}:00`;
            const slotEnd = `${String(startHour + 1).padStart(2, '0')}:00`;
            slots.push({
                startTime: slotStart,
                endTime: slotEnd,
                available: !bookedTimes.has(slotStart),
            });
            startHour++;
        }

        return { date: dateStr, dayName, slots };
    }

    private formatBooking(booking: any) {
        return {
            id: booking.id,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime,
            status: booking.status,
            type: booking.type,
            notes: booking.notes,
            lawyerName: booking.lawyerProfile?.user?.name,
            clientName: booking.client?.name,
            createdAt: booking.createdAt,
        };
    }
}
