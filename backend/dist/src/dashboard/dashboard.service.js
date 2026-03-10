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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getClientDashboard(userId) {
        const [user, upcomingConsultations] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    role: true,
                    createdAt: true,
                    _count: {
                        select: {
                            clientReviews: true,
                            clientBookings: true,
                        },
                    },
                },
            }),
            this.prisma.booking.count({
                where: {
                    clientId: userId,
                    status: { in: ['PENDING', 'CONFIRMED'] },
                    date: { gte: new Date() },
                },
            }),
        ]);
        return {
            user,
            stats: {
                reviewsWritten: user?._count.clientReviews || 0,
                upcomingConsultations,
                activeCases: user?._count.clientBookings || 0,
                messages: 0,
                savedLawyers: 0,
            },
        };
    }
    async getAdminDashboard() {
        const [totalUsers, totalLawyers, verifiedLawyers, totalReviews, totalBookings] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { role: 'LAWYER' } }),
            this.prisma.lawyerProfile.count({ where: { verified: true } }),
            this.prisma.review.count(),
            this.prisma.booking.count(),
        ]);
        const recentUsers = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
            take: 5,
        });
        const pendingVerifications = await this.prisma.lawyerProfile.findMany({
            where: { verified: false },
            include: {
                user: {
                    select: { id: true, name: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: 10,
        });
        return {
            stats: {
                totalUsers,
                totalLawyers,
                verifiedLawyers,
                totalReviews,
                totalBookings,
                revenue: 0,
            },
            recentUsers,
            pendingVerifications: pendingVerifications.map((p) => ({
                id: p.id,
                userId: p.userId,
                name: p.user.name,
                email: p.user.email,
                specialization: p.specialization,
                barNumber: p.barNumber,
                createdAt: p.createdAt,
            })),
        };
    }
    async verifyLawyer(profileId) {
        return this.prisma.lawyerProfile.update({
            where: { id: profileId },
            data: { verified: true },
        });
    }
    async unverifyLawyer(profileId) {
        return this.prisma.lawyerProfile.update({
            where: { id: profileId },
            data: { verified: false },
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map