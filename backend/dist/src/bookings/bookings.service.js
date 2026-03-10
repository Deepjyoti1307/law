"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, dto) {
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: dto.lawyerProfileId },
            include: { user: { select: { id: true } } },
        });
        if (!lawyerProfile) {
            throw new common_1.NotFoundException('Lawyer profile not found');
        }
        if (lawyerProfile.userId === clientId) {
            throw new common_1.ForbiddenException('Cannot book a consultation with yourself');
        }
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
            throw new common_1.BadRequestException('This time slot is already booked');
        }
        const booking = await this.prisma.booking.create({
            data: {
                clientId,
                lawyerProfileId: dto.lawyerProfileId,
                date: bookingDate,
                startTime: dto.startTime,
                endTime: dto.endTime,
                type: dto.type || 'VIDEO',
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
    async findByClient(clientId) {
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
    async findByLawyer(userId) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
        });
        if (!profile)
            return [];
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
    async updateStatus(bookingId, userId, userRole, dto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                lawyerProfile: { select: { userId: true } },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        const isClient = booking.clientId === userId;
        const isLawyer = booking.lawyerProfile.userId === userId;
        if (!isClient && !isLawyer) {
            throw new common_1.ForbiddenException('Not authorized to update this booking');
        }
        if (isClient && dto.status !== 'CANCELLED') {
            throw new common_1.ForbiddenException('Clients can only cancel bookings');
        }
        if (isLawyer && !['CONFIRMED', 'CANCELLED', 'COMPLETED'].includes(dto.status)) {
            throw new common_1.BadRequestException('Invalid status transition');
        }
        const updated = await this.prisma.booking.update({
            where: { id: bookingId },
            data: { status: dto.status },
        });
        return updated;
    }
    async getAvailableSlots(lawyerProfileId, dateStr) {
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: lawyerProfileId },
        });
        if (!lawyerProfile) {
            throw new common_1.NotFoundException('Lawyer profile not found');
        }
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const availability = lawyerProfile.availability;
        if (!availability || !availability[dayName] || !availability[dayName].enabled) {
            return { date: dateStr, dayName, slots: [], message: 'Lawyer is not available on this day' };
        }
        const { start, end } = availability[dayName];
        const slots = [];
        let [startHour] = start.split(':').map(Number);
        const [endHour] = end.split(':').map(Number);
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
    formatBooking(booking) {
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
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map