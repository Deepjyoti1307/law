import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getClientDashboard(req: any): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
            avatar: string | null;
            createdAt: Date;
            _count: {
                clientReviews: number;
                clientBookings: number;
            };
        } | null;
        stats: {
            reviewsWritten: number;
            upcomingConsultations: number;
            activeCases: number;
            messages: number;
            savedLawyers: number;
        };
    }>;
    getAdminDashboard(): Promise<{
        stats: {
            totalUsers: number;
            totalLawyers: number;
            verifiedLawyers: number;
            totalReviews: number;
            totalBookings: number;
            revenue: number;
        };
        recentUsers: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
        }[];
        pendingVerifications: {
            id: string;
            userId: string;
            name: string;
            email: string;
            specialization: string;
            barNumber: string | null;
            createdAt: Date;
        }[];
    }>;
    verifyLawyer(profileId: string): Promise<{
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
    unverifyLawyer(profileId: string): Promise<{
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
}
