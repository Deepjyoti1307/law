'use client';

import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface BookingItem {
    id: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    type: 'VIDEO' | 'PHONE' | 'IN_PERSON';
    notes: string | null;
    // Client view
    lawyerName?: string;
    lawyerAvatar?: string | null;
    specialization?: string;
    lawyerProfileId?: string;
    // Lawyer view
    clientName?: string;
    clientEmail?: string;
    clientAvatar?: string | null;
    createdAt: string;
}

export interface TimeSlot {
    startTime: string;
    endTime: string;
    available: boolean;
}

export interface AvailableSlotsResponse {
    date: string;
    dayName: string;
    slots: TimeSlot[];
    message?: string;
}

export function useMyBookings() {
    return useQuery<BookingItem[]>({
        queryKey: ['bookings', 'my'],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/bookings/my`, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch bookings');
            return response.json();
        },
    });
}

export function useAvailableSlots(lawyerProfileId: string, date: string) {
    return useQuery<AvailableSlotsResponse>({
        queryKey: ['available-slots', lawyerProfileId, date],
        queryFn: async () => {
            const response = await fetch(
                `${API_URL}/bookings/available-slots/${lawyerProfileId}?date=${date}`,
            );
            if (!response.ok) throw new Error('Failed to fetch available slots');
            return response.json();
        },
        enabled: !!lawyerProfileId && !!date,
    });
}

export async function createBooking(data: {
    lawyerProfileId: string;
    date: string;
    startTime: string;
    endTime: string;
    type?: string;
    notes?: string;
}): Promise<BookingItem> {
    const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create booking');
    }
    return response.json();
}

export async function updateBookingStatus(
    bookingId: string,
    status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
): Promise<void> {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update booking');
    }
}
