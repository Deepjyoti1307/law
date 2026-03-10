import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';

enum ConsultationType {
    VIDEO = 'VIDEO',
    PHONE = 'PHONE',
    IN_PERSON = 'IN_PERSON',
}

export class CreateBookingDto {
    @IsString()
    lawyerProfileId: string;

    @IsDateString()
    date: string; // ISO date string e.g. "2026-03-15"

    @IsString()
    startTime: string; // e.g. "09:00"

    @IsString()
    endTime: string; // e.g. "10:00"

    @IsOptional()
    @IsEnum(ConsultationType)
    type?: ConsultationType;

    @IsOptional()
    @IsString()
    notes?: string;
}

export class UpdateBookingStatusDto {
    @IsString()
    status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}
