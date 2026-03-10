'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { useLawyerDashboard } from '@/hooks/use-dashboard';
import { Users, Calendar, FileText, DollarSign, Star, CheckCircle, XCircle, Loader2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function LawyerDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['LAWYER']}>
            <LawyerDashboard />
        </ProtectedRoute>
    );
}

function LawyerDashboard() {
    const { user } = useAuth();
    const { data, isLoading } = useLawyerDashboard();

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Welcome back, Counselor {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Your lawyer dashboard — manage your profile and clients
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={32} />
                    </div>
                ) : !data?.hasProfile ? (
                    <Card className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Complete Your Profile</h2>
                        <p className="text-muted-foreground mb-6">
                            You haven't set up your lawyer profile yet. Complete your profile to start receiving clients.
                        </p>
                        <Link
                            href="/dashboard/lawyer/profile"
                            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-[#c49b5a] via-[#d4a862] to-[#c49b5a] text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#c49b5a]/25"
                        >
                            Set Up Profile
                        </Link>
                    </Card>
                ) : (
                    <>
                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <Star className="text-accent" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.rating.toFixed(1)}
                                </h3>
                                <p className="text-sm text-muted-foreground">Rating</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Users className="text-primary" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.totalReviews}
                                </h3>
                                <p className="text-sm text-muted-foreground">Total Reviews</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <DollarSign className="text-accent" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    ${data.hourlyRate ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">Hourly Rate</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        {data.verified ? (
                                            <CheckCircle className="text-green-500" size={24} />
                                        ) : (
                                            <XCircle className="text-amber-500" size={24} />
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.verified ? 'Verified' : 'Pending'}
                                </h3>
                                <p className="text-sm text-muted-foreground">Verification Status</p>
                            </Card>
                        </div>

                        {/* Profile Info */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                                        <FileText size={24} className="text-accent" />
                                        Your Profile
                                    </h2>
                                    <Link
                                        href="/dashboard/lawyer/profile"
                                        className="flex items-center gap-1 px-3 py-1.5 text-sm bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition"
                                    >
                                        <Edit size={14} /> Edit
                                    </Link>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b border-border">
                                        <span className="text-muted-foreground">Specialization</span>
                                        <span className="text-foreground font-medium">{data.specialization}</span>
                                    </div>
                                    {data.location && (
                                        <div className="flex justify-between py-2 border-b border-border">
                                            <span className="text-muted-foreground">Location</span>
                                            <span className="text-foreground font-medium">{data.location}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between py-2 border-b border-border">
                                        <span className="text-muted-foreground">Hourly Rate</span>
                                        <span className="text-foreground font-medium">${data.hourlyRate}</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Reviews</span>
                                        <span className="text-foreground font-medium">{data.totalReviews}</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Calendar size={24} className="text-primary" />
                                    Quick Tips
                                </h2>
                                <div className="space-y-3 text-sm text-muted-foreground">
                                    {!data.verified && (
                                        <p className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                                            ⚠️ Your profile is pending verification. An admin will review and verify your credentials.
                                        </p>
                                    )}
                                    <p>• Keep your profile up to date to attract more clients</p>
                                    <p>• Respond to inquiries quickly for better reviews</p>
                                    <p>• Set competitive hourly rates for your specialization</p>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
