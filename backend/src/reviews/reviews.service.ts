import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewsService {
    constructor(private prisma: PrismaService) { }

    async create(clientId: string, data: { lawyerProfileId: string; rating: number; comment?: string }) {
        // Check lawyer profile exists
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: data.lawyerProfileId },
        });

        if (!lawyerProfile) {
            throw new NotFoundException('Lawyer profile not found');
        }

        // Prevent self-review
        if (lawyerProfile.userId === clientId) {
            throw new ForbiddenException('Cannot review yourself');
        }

        // Check if already reviewed
        const existing = await this.prisma.review.findUnique({
            where: {
                clientId_lawyerProfileId: {
                    clientId,
                    lawyerProfileId: data.lawyerProfileId,
                },
            },
        });

        if (existing) {
            throw new ConflictException('You have already reviewed this lawyer');
        }

        // Create review
        const review = await this.prisma.review.create({
            data: {
                clientId,
                lawyerProfileId: data.lawyerProfileId,
                rating: data.rating,
                comment: data.comment,
            },
            include: {
                client: {
                    select: { id: true, name: true, avatar: true },
                },
            },
        });

        // Update lawyer's aggregate rating
        const aggregation = await this.prisma.review.aggregate({
            where: { lawyerProfileId: data.lawyerProfileId },
            _avg: { rating: true },
            _count: { rating: true },
        });

        await this.prisma.lawyerProfile.update({
            where: { id: data.lawyerProfileId },
            data: {
                rating: Math.round((aggregation._avg.rating || 0) * 10) / 10,
                reviewCount: aggregation._count.rating,
            },
        });

        return review;
    }

    async findByLawyer(lawyerProfileId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const [reviews, total] = await Promise.all([
            this.prisma.review.findMany({
                where: { lawyerProfileId },
                include: {
                    client: {
                        select: { id: true, name: true, avatar: true },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.review.count({ where: { lawyerProfileId } }),
        ]);

        return {
            reviews: reviews.map((r) => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment,
                clientName: r.client.name,
                clientAvatar: r.client.avatar,
                createdAt: r.createdAt,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
}
