import { CreateLawyerProfileDto } from './create-lawyer-profile.dto';
import { IsString, IsNumber, IsOptional, IsArray, IsObject, Min } from 'class-validator';

export class UpdateLawyerProfileDto {
    @IsOptional()
    @IsString()
    specialization?: string;

    @IsOptional()
    @IsString()
    barNumber?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    hourlyRate?: number;

    @IsOptional()
    @IsString()
    experience?: string;

    @IsOptional()
    @IsString()
    education?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    languages?: string[];

    @IsOptional()
    @IsObject()
    availability?: Record<string, any>;

    @IsOptional()
    @IsString()
    location?: string;
}
