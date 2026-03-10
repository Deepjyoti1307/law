import { ReviewsService } from './reviews.service';
declare class CreateReviewDto {
    lawyerProfileId: string;
    rating: number;
    comment?: string;
}
export declare class ReviewsController {
    private reviewsService;
    constructor(reviewsService: ReviewsService);
    create(req: any, dto: CreateReviewDto): Promise<{
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
    findByLawyer(lawyerProfileId: string, page?: string, limit?: string): Promise<{
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
export {};
