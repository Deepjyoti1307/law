'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { useClientDashboard } from '@/hooks/use-dashboard';
import { Calendar, MessageSquare, FileText, Search, Clock, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ClientDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['CLIENT']}>
            <ClientDashboard />
        </ProtectedRoute>
    );
}

function ClientDashboard() {
    const { user } = useAuth();
    const { data, isLoading } = useClientDashboard();

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Your client dashboard — manage consultations and cases
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={32} />
                    </div>
                ) : (
                    <>
                        {/* Quick Stats */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <Calendar className="text-accent" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data?.stats.upcomingConsultations ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">Upcoming Consultations</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FileText className="text-primary" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data?.stats.activeCases ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">Active Cases</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <MessageSquare className="text-accent" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data?.stats.messages ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">Messages</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Search className="text-primary" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data?.stats.reviewsWritten ?? 0}
                                </h3>
                                <p className="text-sm text-muted-foreground">Reviews Written</p>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Search size={24} className="text-accent" />
                                    Find a Lawyer
                                </h2>
                                <p className="text-muted-foreground mb-4">
                                    Browse our network of verified legal professionals and book a consultation.
                                </p>
                                <Link
                                    href="/lawyers"
                                    className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#c49b5a] via-[#d4a862] to-[#c49b5a] text-white font-medium transition-all duration-300 hover:shadow-lg"
                                >
                                    Browse Lawyers
                                </Link>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Clock size={24} className="text-primary" />
                                    Your Activity
                                </h2>
                                <div className="space-y-3">
                                    <p className="text-muted-foreground text-sm">
                                        {data?.stats.reviewsWritten
                                            ? `You've written ${data.stats.reviewsWritten} review(s).`
                                            : 'No activity yet. Start by finding a lawyer and booking a consultation.'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Member since {data?.user?.createdAt ? new Date(data.user.createdAt).toLocaleDateString() : '—'}
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
