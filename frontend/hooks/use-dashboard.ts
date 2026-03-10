'use client';

import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface ClientDashboardData {
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string | null;
        role: string;
        createdAt: string;
    };
    stats: {
        reviewsWritten: number;
        upcomingConsultations: number;
        activeCases: number;
        messages: number;
        savedLawyers: number;
    };
}

export interface LawyerDashboardStats {
    hasProfile: boolean;
    totalReviews: number;
    rating: number;
    hourlyRate?: number;
    verified: boolean;
    specialization?: string;
    location?: string;
}

export interface AdminDashboardData {
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
        name: string;
        email: string;
        role: string;
        createdAt: string;
    }[];
    pendingVerifications: {
        id: string;
        userId: string;
        name: string;
        email: string;
        specialization: string;
        barNumber: string | null;
        createdAt: string;
    }[];
}

export function useClientDashboard() {
    return useQuery<ClientDashboardData>({
        queryKey: ['dashboard', 'client'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/dashboard/client`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch client dashboard');
            return response.json();
        },
    });
}

export function useLawyerDashboard() {
    return useQuery<LawyerDashboardStats>({
        queryKey: ['dashboard', 'lawyer'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/lawyers/dashboard/stats`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch lawyer dashboard');
            return response.json();
        },
    });
}

export function useAdminDashboard() {
    return useQuery<AdminDashboardData>({
        queryKey: ['dashboard', 'admin'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/dashboard/admin`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch admin dashboard');
            return response.json();
        },
    });
}

export async function verifyLawyer(profileId: string): Promise<void> {
    const response = await fetch(`${API_URL}/dashboard/admin/verify-lawyer/${profileId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!response.ok) throw new Error('Failed to verify lawyer');
}

export async function unverifyLawyer(profileId: string): Promise<void> {
    const response = await fetch(`${API_URL}/dashboard/admin/unverify-lawyer/${profileId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
    });
    if (!response.ok) throw new Error('Failed to unverify lawyer');
}
