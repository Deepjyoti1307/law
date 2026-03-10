'use client';

import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface LawyerListItem {
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
}

export interface LawyerDetail {
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
    availability: Record<string, any> | null;
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
        createdAt: string;
    }[];
    createdAt: string;
}

export interface LawyersResponse {
    lawyers: LawyerListItem[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export function useLawyers(filters?: {
    search?: string;
    specialization?: string;
    page?: number;
    limit?: number;
}) {
    return useQuery<LawyersResponse>({
        queryKey: ['lawyers', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters?.search) params.set('search', filters.search);
            if (filters?.specialization) params.set('specialization', filters.specialization);
            if (filters?.page) params.set('page', String(filters.page));
            if (filters?.limit) params.set('limit', String(filters.limit));

            const response = await fetch(`${API_URL}/lawyers?${params.toString()}`);
            if (!response.ok) throw new Error('Failed to fetch lawyers');
            return response.json();
        },
    });
}

export function useLawyer(id: string) {
    return useQuery<LawyerDetail>({
        queryKey: ['lawyer', id],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/lawyers/profile/${id}`);
            if (!response.ok) throw new Error('Failed to fetch lawyer profile');
            return response.json();
        },
        enabled: !!id,
    });
}

export function useLawyerProfile() {
    return useQuery({
        queryKey: ['my-lawyer-profile'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/lawyers/my-profile`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error('Failed to fetch profile');
            }
            return response.json();
        },
    });
}
