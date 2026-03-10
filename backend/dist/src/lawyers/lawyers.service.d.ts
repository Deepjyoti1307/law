import { PrismaService } from '../prisma.service';
import { CreateLawyerProfileDto } from './dto/create-lawyer-profile.dto';
import { UpdateLawyerProfileDto } from './dto/update-lawyer-profile.dto';
export declare class LawyersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(query: {
        search?: string;
        specialization?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        lawyers: {
            id: string;
            userId: string;
            name: string;
            avatar: string | null;
            specialization: string;
            location: string | null;
            rating: number;
            reviewCount: number;
            hourlyRate: number;
            experience: string | null;
            verified: boolean;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        name: string;
        email: string;
        avatar: string | null;
        specialization: string;
        barNumber: string | null;
        hourlyRate: number;
        experience: string | null;
        education: string | null;
        bio: string | null;
        languages: string[];
        availability: import("@prisma/client/runtime/library").JsonValue;
        location: string | null;
        verified: boolean;
        rating: number;
        reviewCount: number;
        reviews: {
            id: string;
            rating: number;
            comment: string | null;
            clientName: string;
            clientAvatar: string | null;
            createdAt: Date;
        }[];
        createdAt: Date;
    }>;
    createProfile(userId: string, dto: CreateLawyerProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialization: string;
        barNumber: string | null;
        hourlyRate: number;
        experience: string | null;
        education: string | null;
        bio: string | null;
        languages: string[];
        availability: import("@prisma/client/runtime/library").JsonValue | null;
        location: string | null;
        verified: boolean;
        rating: number;
        reviewCount: number;
    }>;
    updateProfile(userId: string, dto: UpdateLawyerProfileDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialization: string;
        barNumber: string | null;
        hourlyRate: number;
        experience: string | null;
        education: string | null;
        bio: string | null;
        languages: string[];
        availability: import("@prisma/client/runtime/library").JsonValue | null;
        location: string | null;
        verified: boolean;
        rating: number;
        reviewCount: number;
    }>;
    getMyProfile(userId: string): Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            avatar: string | null;
        };
        reviews: ({
            client: {
                id: string;
                name: string;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clientId: string;
            rating: number;
            comment: string | null;
            lawyerProfileId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        specialization: string;
        barNumber: string | null;
        hourlyRate: number;
        experience: string | null;
        education: string | null;
        bio: string | null;
        languages: string[];
        availability: import("@prisma/client/runtime/library").JsonValue | null;
        location: string | null;
        verified: boolean;
        rating: number;
        reviewCount: number;
    }) | null>;
    getDashboardStats(userId: string): Promise<{
        hasProfile: boolean;
        totalReviews: number;
        rating: number;
        verified: boolean;
        hourlyRate?: undefined;
        specialization?: undefined;
        location?: undefined;
    } | {
        hasProfile: boolean;
        totalReviews: number;
        rating: number;
        hourlyRate: number;
        verified: boolean;
        specialization: string;
        location: string | null;
    }>;
}
