declare enum ConsultationType {
    VIDEO = "VIDEO",
    PHONE = "PHONE",
    IN_PERSON = "IN_PERSON"
}
export declare class CreateBookingDto {
    lawyerProfileId: string;
    date: string;
    startTime: string;
    endTime: string;
    type?: ConsultationType;
    notes?: string;
}
export declare class UpdateBookingStatusDto {
    status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
}
export {};
