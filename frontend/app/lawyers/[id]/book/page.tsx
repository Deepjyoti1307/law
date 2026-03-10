'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useLawyer } from '@/hooks/use-lawyers';
import { useAvailableSlots, createBooking } from '@/hooks/use-bookings';
import {
    Calendar, Clock, Video, Phone, MapPin,
    ChevronLeft, ChevronRight, CheckCircle, Loader2, AlertCircle
} from 'lucide-react';

const CONSULTATION_TYPES = [
    { value: 'VIDEO', label: 'Video Call', icon: Video, description: 'Meet via video conference' },
    { value: 'PHONE', label: 'Phone Call', icon: Phone, description: 'Consultation by phone' },
    { value: 'IN_PERSON', label: 'In Person', icon: MapPin, description: 'Meet at the office' },
];

export default function BookLawyerPage() {
    return (
        <ProtectedRoute allowedRoles={['CLIENT']}>
            <BookingFlow />
        </ProtectedRoute>
    );
}

function BookingFlow() {
    const params = useParams();
    const router = useRouter();
    const lawyerProfileId = params.id as string;

    const { data: lawyer, isLoading: lawyerLoading } = useLawyer(lawyerProfileId);

    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState<{ startTime: string; endTime: string } | null>(null);
    const [consultationType, setConsultationType] = useState('VIDEO');
    const [notes, setNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const { data: slotsData, isLoading: slotsLoading } = useAvailableSlots(lawyerProfileId, selectedDate);

    // Generate next 14 days for date selection
    const dateOptions = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
            value: d.toISOString().split('T')[0],
            label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
            dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
        };
    });

    const handleSubmit = async () => {
        if (!selectedSlot || !selectedDate) return;

        setIsSubmitting(true);
        setError('');

        try {
            await createBooking({
                lawyerProfileId,
                date: selectedDate,
                startTime: selectedSlot.startTime,
                endTime: selectedSlot.endTime,
                type: consultationType,
                notes: notes || undefined,
            });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (lawyerLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={32} />
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <Card className="p-8 text-center max-w-md">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
                    <p className="text-muted-foreground mb-2">
                        Your consultation with <strong>{lawyer?.name}</strong> has been requested.
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                        {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedSlot?.startTime} – {selectedSlot?.endTime}
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="gradient" onClick={() => router.push('/dashboard/bookings')}>
                            View My Bookings
                        </Button>
                        <Button variant="outline" onClick={() => router.push('/lawyers')}>
                            Browse Lawyers
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground mb-4 flex items-center gap-1 text-sm transition">
                        <ChevronLeft size={16} /> Back to profile
                    </button>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Book a Consultation
                    </h1>
                    {lawyer && (
                        <p className="text-muted-foreground">
                            Schedule a session with <strong className="text-foreground">{lawyer.name}</strong> — {lawyer.specialization}
                            <span className="ml-2 text-accent font-semibold">${lawyer.hourlyRate}/hour</span>
                        </p>
                    )}
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 mb-6 flex items-center gap-2">
                        <AlertCircle size={18} /> {error}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Step 1: Date Selection */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Calendar className="text-accent" size={22} />
                                Select a Date
                            </h2>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                                {dateOptions.map(d => (
                                    <button
                                        key={d.value}
                                        onClick={() => { setSelectedDate(d.value); setSelectedSlot(null); }}
                                        className={`p-3 rounded-lg text-center text-sm transition-all border ${selectedDate === d.value
                                                ? 'border-accent bg-accent/10 text-accent font-semibold'
                                                : 'border-border hover:border-accent/40 text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        {d.label}
                                    </button>
                                ))}
                            </div>
                        </Card>

                        {/* Step 2: Time Slot Selection */}
                        {selectedDate && (
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Clock className="text-accent" size={22} />
                                    Select a Time
                                </h2>
                                {slotsLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="animate-spin text-accent" size={24} />
                                    </div>
                                ) : slotsData?.slots && slotsData.slots.length > 0 ? (
                                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                        {slotsData.slots.map(slot => (
                                            <button
                                                key={slot.startTime}
                                                onClick={() => slot.available && setSelectedSlot(slot)}
                                                disabled={!slot.available}
                                                className={`p-3 rounded-lg text-center text-sm transition-all border ${selectedSlot?.startTime === slot.startTime
                                                        ? 'border-accent bg-accent/10 text-accent font-semibold'
                                                        : slot.available
                                                            ? 'border-border hover:border-accent/40 text-foreground'
                                                            : 'border-border bg-muted/50 text-muted-foreground line-through opacity-50 cursor-not-allowed'
                                                    }`}
                                            >
                                                {slot.startTime}
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm py-4">
                                        {slotsData?.message || 'No available slots for this day.'}
                                    </p>
                                )}
                            </Card>
                        )}

                        {/* Step 3: Consultation Type */}
                        {selectedSlot && (
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">Consultation Type</h2>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {CONSULTATION_TYPES.map(ct => {
                                        const Icon = ct.icon;
                                        return (
                                            <button
                                                key={ct.value}
                                                onClick={() => setConsultationType(ct.value)}
                                                className={`p-4 rounded-lg border text-left transition-all ${consultationType === ct.value
                                                        ? 'border-accent bg-accent/10'
                                                        : 'border-border hover:border-accent/40'
                                                    }`}
                                            >
                                                <Icon size={20} className={consultationType === ct.value ? 'text-accent' : 'text-muted-foreground'} />
                                                <p className="font-medium text-foreground mt-2 text-sm">{ct.label}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{ct.description}</p>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Notes */}
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Notes (optional)
                                    </label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Briefly describe your legal needs..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                    />
                                </div>
                            </Card>
                        )}
                    </div>

                    {/* Booking Summary Sidebar */}
                    <div>
                        <Card className="p-6 sticky top-24">
                            <h3 className="text-lg font-bold text-foreground mb-4">Booking Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Lawyer</span>
                                    <span className="text-foreground font-medium">{lawyer?.name ?? '—'}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Date</span>
                                    <span className="text-foreground font-medium">
                                        {selectedDate
                                            ? new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                            : '—'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Time</span>
                                    <span className="text-foreground font-medium">
                                        {selectedSlot ? `${selectedSlot.startTime} – ${selectedSlot.endTime}` : '—'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Type</span>
                                    <span className="text-foreground font-medium">
                                        {CONSULTATION_TYPES.find(c => c.value === consultationType)?.label ?? '—'}
                                    </span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Rate</span>
                                    <span className="text-accent font-bold">${lawyer?.hourlyRate ?? 0}/hr</span>
                                </div>
                            </div>

                            <Button
                                variant="gradient"
                                size="lg"
                                className="w-full mt-6"
                                onClick={handleSubmit}
                                disabled={!selectedDate || !selectedSlot || isSubmitting}
                                icon={isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                            >
                                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
