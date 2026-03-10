import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService) { }

    async getClientDashboard(userId: string) {
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

        // Get recent users
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

        // Get pending lawyer verifications
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

    async verifyLawyer(profileId: string) {
        return this.prisma.lawyerProfile.update({
            where: { id: profileId },
            data: { verified: true },
        });
    }

    async unverifyLawyer(profileId: string) {
        return this.prisma.lawyerProfile.update({
            where: { id: profileId },
            data: { verified: false },
        });
    }
}
