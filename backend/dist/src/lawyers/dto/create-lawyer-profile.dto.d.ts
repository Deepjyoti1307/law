export declare class CreateLawyerProfileDto {
    specialization: string;
    barNumber?: string;
    hourlyRate?: number;
    experience?: string;
    education?: string;
    bio?: string;
    languages?: string[];
    availability?: Record<string, any>;
    location?: string;
}
