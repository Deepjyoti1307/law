"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, data) {
        const lawyerProfile = await this.prisma.lawyerProfile.findUnique({
            where: { id: data.lawyerProfileId },
        });
        if (!lawyerProfile) {
            throw new common_1.NotFoundException('Lawyer profile not found');
        }
        if (lawyerProfile.userId === clientId) {
            throw new common_1.ForbiddenException('Cannot review yourself');
        }
        const existing = await this.prisma.review.findUnique({
            where: {
                clientId_lawyerProfileId: {
                    clientId,
                    lawyerProfileId: data.lawyerProfileId,
                },
            },
        });
        if (existing) {
            throw new common_1.ConflictException('You have already reviewed this lawyer');
        }
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
    async findByLawyer(lawyerProfileId, page = 1, limit = 10) {
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
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map