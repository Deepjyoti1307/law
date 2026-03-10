import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
export declare class BookingsController {
    private bookingsService;
    constructor(bookingsService: BookingsService);
    create(req: any, dto: CreateBookingDto): Promise<{
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
    getMyBookings(req: any): Promise<{
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
    }[] | {
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
    updateStatus(id: string, req: any, dto: UpdateBookingStatusDto): Promise<{
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
    getAvailableSlots(lawyerProfileId: string, date: string): Promise<{
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
}
