'use client';

import { useState } from 'react';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { useMyBookings, updateBookingStatus } from '@/hooks/use-bookings';
import { useQueryClient } from '@tanstack/react-query';
import {
    Calendar, Clock, Video, Phone, MapPin, CheckCircle,
    XCircle, Loader2, AlertCircle
} from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
    PENDING: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    CONFIRMED: 'bg-green-500/15 text-green-400 border-green-500/30',
    CANCELLED: 'bg-red-500/15 text-red-400 border-red-500/30',
    COMPLETED: 'bg-primary/15 text-primary border-primary/30',
};

const TYPE_ICONS: Record<string, typeof Video> = {
    VIDEO: Video,
    PHONE: Phone,
    IN_PERSON: MapPin,
};

export default function BookingsPage() {
    const { user } = useAuth();
    const { data: bookings, isLoading } = useMyBookings();
    const queryClient = useQueryClient();
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [tab, setTab] = useState<'upcoming' | 'past' | 'cancelled'>('upcoming');

    const isLawyer = user?.role === 'LAWYER';

    const handleStatusUpdate = async (bookingId: string, status: 'CONFIRMED' | 'CANCELLED' | 'COMPLETED') => {
        setProcessingId(bookingId);
        try {
            await updateBookingStatus(bookingId, status);
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        } catch (err) {
            console.error('Failed to update booking:', err);
        } finally {
            setProcessingId(null);
        }
    };

    const now = new Date();

    const filteredBookings = (bookings || []).filter(b => {
        const bookingDate = new Date(b.date);
        if (tab === 'upcoming') return ['PENDING', 'CONFIRMED'].includes(b.status) && bookingDate >= now;
        if (tab === 'cancelled') return b.status === 'CANCELLED';
        return b.status === 'COMPLETED' || (bookingDate < now && b.status !== 'CANCELLED');
    });

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        My Bookings
                    </h1>
                    <p className="text-muted-foreground">
                        {isLawyer ? 'Manage your client consultations' : 'Track your legal consultations'}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 mb-8 bg-muted/50 p-1 rounded-lg w-fit">
                    {(['upcoming', 'past', 'cancelled'] as const).map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-2 rounded-md text-sm font-medium transition-all capitalize ${tab === t
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={32} />
                    </div>
                ) : filteredBookings.length === 0 ? (
                    <Card className="p-8 text-center">
                        <Calendar className="mx-auto text-muted-foreground mb-4" size={40} />
                        <p className="text-muted-foreground">
                            No {tab} bookings found.
                        </p>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredBookings.map(booking => {
                            const TypeIcon = TYPE_ICONS[booking.type] || Video;
                            const displayName = isLawyer ? booking.clientName : booking.lawyerName;
                            const displayAvatar = isLawyer ? booking.clientAvatar : booking.lawyerAvatar;
                            const bookingDate = new Date(booking.date);

                            return (
                                <Card key={booking.id} className="p-6">
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {/* Avatar */}
                                        <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center text-xl font-bold text-accent flex-shrink-0 overflow-hidden">
                                            {displayAvatar ? (
                                                <img src={displayAvatar} alt={displayName || ''} className="w-full h-full object-cover" />
                                            ) : (
                                                (displayName || '?').charAt(0)
                                            )}
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                                <div>
                                                    <h3 className="text-lg font-bold text-foreground">
                                                        {displayName}
                                                    </h3>
                                                    {!isLawyer && booking.specialization && (
                                                        <p className="text-sm text-muted-foreground">{booking.specialization}</p>
                                                    )}
                                                    {isLawyer && booking.clientEmail && (
                                                        <p className="text-sm text-muted-foreground">{booking.clientEmail}</p>
                                                    )}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[booking.status]}`}>
                                                    {booking.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar size={14} />
                                                    {bookingDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    {booking.startTime} – {booking.endTime}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <TypeIcon size={14} />
                                                    {booking.type.replace('_', ' ')}
                                                </span>
                                            </div>

                                            {booking.notes && (
                                                <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg mb-3">
                                                    "{booking.notes}"
                                                </p>
                                            )}

                                            {/* Action Buttons */}
                                            {booking.status === 'PENDING' && (
                                                <div className="flex gap-2">
                                                    {isLawyer && (
                                                        <button
                                                            onClick={() => handleStatusUpdate(booking.id, 'CONFIRMED')}
                                                            disabled={processingId === booking.id}
                                                            className="flex items-center gap-1 px-4 py-1.5 text-sm bg-green-500/10 text-green-400 border border-green-500/30 rounded-md hover:bg-green-500/20 transition disabled:opacity-50"
                                                        >
                                                            {processingId === booking.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                                                            Confirm
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                        disabled={processingId === booking.id}
                                                        className="flex items-center gap-1 px-4 py-1.5 text-sm bg-red-500/10 text-red-400 border border-red-500/30 rounded-md hover:bg-red-500/20 transition disabled:opacity-50"
                                                    >
                                                        <XCircle size={14} /> Cancel
                                                    </button>
                                                </div>
                                            )}

                                            {booking.status === 'CONFIRMED' && isLawyer && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'COMPLETED')}
                                                        disabled={processingId === booking.id}
                                                        className="flex items-center gap-1 px-4 py-1.5 text-sm bg-primary/10 text-primary border border-primary/30 rounded-md hover:bg-primary/20 transition disabled:opacity-50"
                                                    >
                                                        <CheckCircle size={14} /> Mark Complete
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')}
                                                        disabled={processingId === booking.id}
                                                        className="flex items-center gap-1 px-4 py-1.5 text-sm bg-red-500/10 text-red-400 border border-red-500/30 rounded-md hover:bg-red-500/20 transition disabled:opacity-50"
                                                    >
                                                        <XCircle size={14} /> Cancel
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
