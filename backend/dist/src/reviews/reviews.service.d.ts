import { PrismaService } from '../prisma.service';
export declare class ReviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, data: {
        lawyerProfileId: string;
        rating: number;
        comment?: string;
    }): Promise<{
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
    }>;
    findByLawyer(lawyerProfileId: string, page?: number, limit?: number): Promise<{
        reviews: {
            id: string;
            rating: number;
            comment: string | null;
            clientName: string;
            clientAvatar: string | null;
            createdAt: Date;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
}
