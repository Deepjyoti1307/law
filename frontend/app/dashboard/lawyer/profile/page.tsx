'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useLawyerProfile } from '@/hooks/use-lawyers';
import { useQueryClient } from '@tanstack/react-query';
import {
    Briefcase, GraduationCap, DollarSign, MapPin, Globe, FileText,
    ChevronRight, ChevronLeft, CheckCircle, Loader2, Clock
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const SPECIALIZATIONS = [
    'Corporate Law', 'Criminal Defense', 'Family Law', 'Real Estate',
    'Intellectual Property', 'Immigration Law', 'Tax Law', 'Employment Law',
    'Environmental Law', 'Personal Injury', 'Civil Litigation', 'Bankruptcy',
    'Healthcare Law', 'International Law', 'Constitutional Law', 'Other'
];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface ProfileForm {
    specialization: string;
    barNumber: string;
    experience: string;
    education: string;
    bio: string;
    languages: string[];
    location: string;
    hourlyRate: number;
    availability: Record<string, { enabled: boolean; start: string; end: string }>;
}

const defaultAvailability = DAYS.reduce((acc, day) => {
    acc[day] = {
        enabled: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day),
        start: '09:00',
        end: '17:00'
    };
    return acc;
}, {} as Record<string, { enabled: boolean; start: string; end: string }>);

const defaultForm: ProfileForm = {
    specialization: '',
    barNumber: '',
    experience: '',
    education: '',
    bio: '',
    languages: ['English'],
    location: '',
    hourlyRate: 0,
    availability: defaultAvailability,
};

export default function LawyerProfileSetupPage() {
    return (
        <ProtectedRoute allowedRoles={['LAWYER']}>
            <ProfileSetup />
        </ProtectedRoute>
    );
}

function ProfileSetup() {
    const router = useRouter();
    const { data: existingProfile, isLoading: profileLoading } = useLawyerProfile();
    const queryClient = useQueryClient();

    const [step, setStep] = useState(1);
    const [form, setForm] = useState<ProfileForm>(defaultForm);
    const [newLanguage, setNewLanguage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const isEditing = !!existingProfile;

    // Populate form with existing data if editing
    useEffect(() => {
        if (existingProfile) {
            setForm({
                specialization: existingProfile.specialization || '',
                barNumber: existingProfile.barNumber || '',
                experience: existingProfile.experience || '',
                education: existingProfile.education || '',
                bio: existingProfile.bio || '',
                languages: existingProfile.languages || ['English'],
                location: existingProfile.location || '',
                hourlyRate: existingProfile.hourlyRate || 0,
                availability: existingProfile.availability
                    ? (existingProfile.availability as typeof defaultAvailability)
                    : defaultAvailability,
            });
        }
    }, [existingProfile]);

    const updateForm = (field: keyof ProfileForm, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const addLanguage = () => {
        if (newLanguage.trim() && !form.languages.includes(newLanguage.trim())) {
            updateForm('languages', [...form.languages, newLanguage.trim()]);
            setNewLanguage('');
        }
    };

    const removeLanguage = (lang: string) => {
        updateForm('languages', form.languages.filter(l => l !== lang));
    };

    const toggleDay = (day: string) => {
        setForm(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: { ...prev.availability[day], enabled: !prev.availability[day].enabled }
            }
        }));
    };

    const updateTime = (day: string, field: 'start' | 'end', value: string) => {
        setForm(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: { ...prev.availability[day], [field]: value }
            }
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('accessToken');
            const method = isEditing ? 'PATCH' : 'POST';

            const body: any = {
                specialization: form.specialization,
                barNumber: form.barNumber || undefined,
                hourlyRate: Number(form.hourlyRate),
                experience: form.experience || undefined,
                education: form.education || undefined,
                bio: form.bio || undefined,
                languages: form.languages,
                location: form.location || undefined,
                availability: form.availability,
            };

            const response = await fetch(`${API_URL}/lawyers/profile`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to save profile');
            }

            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: ['my-lawyer-profile'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'lawyer'] });

            setSuccess(true);
            setTimeout(() => router.push('/dashboard/lawyer'), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (profileLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={32} />
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center max-w-md">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                        Profile {isEditing ? 'Updated' : 'Created'}!
                    </h2>
                    <p className="text-muted-foreground">
                        Redirecting to your dashboard...
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {isEditing ? 'Edit Your Profile' : 'Set Up Your Profile'}
                    </h1>
                    <p className="text-muted-foreground">
                        {isEditing
                            ? 'Update your professional information'
                            : 'Complete your profile to start receiving clients'}
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center gap-2 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center gap-2 flex-1">
                            <button
                                onClick={() => setStep(s)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step === s
                                        ? 'bg-gradient-to-r from-[#c49b5a] to-[#d4a862] text-white'
                                        : step > s
                                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                            : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {step > s ? <CheckCircle size={18} /> : s}
                            </button>
                            <span className={`text-sm hidden sm:block ${step === s ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                                {s === 1 ? 'Credentials' : s === 2 ? 'Details' : 'Schedule'}
                            </span>
                            {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-green-500/40' : 'bg-border'}`} />}
                        </div>
                    ))}
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 mb-6">
                        {error}
                    </div>
                )}

                {/* Step 1: Credentials */}
                {step === 1 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Briefcase className="text-accent" size={24} />
                            Professional Credentials
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Specialization *
                                </label>
                                <select
                                    value={form.specialization}
                                    onChange={(e) => updateForm('specialization', e.target.value)}
                                    className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                >
                                    <option value="">Select your practice area</option>
                                    {SPECIALIZATIONS.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Bar Number
                                </label>
                                <input
                                    type="text"
                                    value={form.barNumber}
                                    onChange={(e) => updateForm('barNumber', e.target.value)}
                                    placeholder="e.g. BAR/2020/12345"
                                    className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    <GraduationCap size={16} className="inline mr-1" />
                                    Experience
                                </label>
                                <input
                                    type="text"
                                    value={form.experience}
                                    onChange={(e) => updateForm('experience', e.target.value)}
                                    placeholder="e.g. 10 years"
                                    className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Education
                                </label>
                                <input
                                    type="text"
                                    value={form.education}
                                    onChange={(e) => updateForm('education', e.target.value)}
                                    placeholder="e.g. Harvard Law School, J.D."
                                    className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <Button
                                variant="gradient"
                                size="lg"
                                onClick={() => setStep(2)}
                                disabled={!form.specialization}
                                icon={<ChevronRight size={20} />}
                            >
                                Next
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <FileText className="text-accent" size={24} />
                            Profile Details
                        </h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Bio / About You
                                </label>
                                <textarea
                                    value={form.bio}
                                    onChange={(e) => updateForm('bio', e.target.value)}
                                    placeholder="Tell clients about your practice, approach, and what makes you unique..."
                                    rows={4}
                                    className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                                />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <DollarSign size={16} className="inline mr-1" />
                                        Hourly Rate ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={form.hourlyRate || ''}
                                        onChange={(e) => updateForm('hourlyRate', Number(e.target.value))}
                                        placeholder="150"
                                        min="0"
                                        className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        <MapPin size={16} className="inline mr-1" />
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={form.location}
                                        onChange={(e) => updateForm('location', e.target.value)}
                                        placeholder="e.g. New York, NY"
                                        className="w-full px-4 py-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    <Globe size={16} className="inline mr-1" />
                                    Languages
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {form.languages.map(lang => (
                                        <span
                                            key={lang}
                                            className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-1"
                                        >
                                            {lang}
                                            <button
                                                onClick={() => removeLanguage(lang)}
                                                className="hover:text-red-400 ml-1"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newLanguage}
                                        onChange={(e) => setNewLanguage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                                        placeholder="Add a language"
                                        className="flex-1 px-4 py-2 border border-input rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    />
                                    <button
                                        onClick={addLanguage}
                                        className="px-4 py-2 bg-accent/10 text-accent rounded-md hover:bg-accent/20 text-sm transition"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" size="lg" onClick={() => setStep(1)} icon={<ChevronLeft size={20} />}>
                                Back
                            </Button>
                            <Button variant="gradient" size="lg" onClick={() => setStep(3)} icon={<ChevronRight size={20} />}>
                                Next
                            </Button>
                        </div>
                    </Card>
                )}

                {/* Step 3: Availability */}
                {step === 3 && (
                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                            <Clock className="text-accent" size={24} />
                            Availability Schedule
                        </h2>

                        <div className="space-y-4">
                            {DAYS.map(day => (
                                <div
                                    key={day}
                                    className={`p-4 rounded-lg border transition-all ${form.availability[day].enabled
                                            ? 'border-accent/30 bg-accent/5'
                                            : 'border-border bg-muted/30'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={form.availability[day].enabled}
                                                onChange={() => toggleDay(day)}
                                                className="w-5 h-5 accent-[#c49b5a]"
                                            />
                                            <span className={`font-medium ${form.availability[day].enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                {day}
                                            </span>
                                        </label>

                                        {form.availability[day].enabled && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <input
                                                    type="time"
                                                    value={form.availability[day].start}
                                                    onChange={(e) => updateTime(day, 'start', e.target.value)}
                                                    className="px-3 py-1.5 border border-input rounded bg-background text-foreground text-sm"
                                                />
                                                <span className="text-muted-foreground">to</span>
                                                <input
                                                    type="time"
                                                    value={form.availability[day].end}
                                                    onChange={(e) => updateTime(day, 'end', e.target.value)}
                                                    className="px-3 py-1.5 border border-input rounded bg-background text-foreground text-sm"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between mt-8">
                            <Button variant="outline" size="lg" onClick={() => setStep(2)} icon={<ChevronLeft size={20} />}>
                                Back
                            </Button>
                            <Button
                                variant="gradient"
                                size="lg"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !form.specialization}
                                icon={isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                            >
                                {isSubmitting ? 'Saving...' : isEditing ? 'Update Profile' : 'Create Profile'}
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
}
