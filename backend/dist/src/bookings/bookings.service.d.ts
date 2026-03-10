import { PrismaService } from '../prisma.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, dto: CreateBookingDto): Promise<{
        id: any;
        date: any;
        startTime: any;
        endTime: any;
        status: any;
        type: any;
        notes: any;
        lawyerName: any;
        clientName: any;
        createdAt: any;
    }>;
    findByClient(clientId: string): Promise<{
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        type: import("@prisma/client").$Enums.ConsultationType;
        notes: string | null;
        lawyerName: string;
        lawyerAvatar: string | null;
        specialization: string;
        lawyerProfileId: string;
        createdAt: Date;
    }[]>;
    findByLawyer(userId: string): Promise<{
        id: string;
        date: Date;
        startTime: string;
        endTime: string;
        status: import("@prisma/client").$Enums.BookingStatus;
        type: import("@prisma/client").$Enums.ConsultationType;
        notes: string | null;
        clientName: string;
        clientEmail: string;
        clientAvatar: string | null;
        createdAt: Date;
    }[]>;
    updateStatus(bookingId: string, userId: string, userRole: string, dto: UpdateBookingStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        clientId: string;
        lawyerProfileId: string;
        date: Date;
        startTime: string;
        endTime: string;
        type: import("@prisma/client").$Enums.ConsultationType;
        notes: string | null;
        status: import("@prisma/client").$Enums.BookingStatus;
    }>;
    getAvailableSlots(lawyerProfileId: string, dateStr: string): Promise<{
        date: string;
        dayName: string;
        slots: never[];
        message: string;
    } | {
        date: string;
        dayName: string;
        slots: {
            startTime: string;
            endTime: string;
            available: boolean;
        }[];
        message?: undefined;
    }>;
    private formatBooking;
}
