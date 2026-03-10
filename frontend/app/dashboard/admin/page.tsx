'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { useAdminDashboard, verifyLawyer } from '@/hooks/use-dashboard';
import { Users, Scale, FileText, DollarSign, AlertCircle, TrendingUp, Loader2, CheckCircle } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function AdminDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['ADMIN']}>
            <AdminDashboard />
        </ProtectedRoute>
    );
}

function AdminDashboard() {
    const { user } = useAuth();
    const { data, isLoading } = useAdminDashboard();
    const queryClient = useQueryClient();
    const [verifyingId, setVerifyingId] = useState<string | null>(null);

    const handleVerify = async (profileId: string) => {
        setVerifyingId(profileId);
        try {
            await verifyLawyer(profileId);
            queryClient.invalidateQueries({ queryKey: ['dashboard', 'admin'] });
        } catch (err) {
            console.error('Failed to verify lawyer:', err);
        } finally {
            setVerifyingId(null);
        }
    };

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back, {user?.name}. Manage platform operations.
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={32} />
                    </div>
                ) : data ? (
                    <>
                        {/* Admin Stats */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <Users className="text-primary" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.stats.totalUsers.toLocaleString()}
                                </h3>
                                <p className="text-sm text-muted-foreground">Total Users</p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-accent/10 rounded-lg">
                                        <Scale className="text-accent" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.stats.verifiedLawyers}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Verified Lawyers (of {data.stats.totalLawyers} total)
                                </p>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg">
                                        <FileText className="text-primary" size={24} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-foreground mb-1">
                                    {data.stats.totalReviews}
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
                                    {data.stats.totalBookings}
                                </h3>
                                <p className="text-sm text-muted-foreground">Total Bookings</p>
                            </Card>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Pending Lawyer Verifications */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <Scale size={24} className="text-accent" />
                                    Pending Lawyer Verifications
                                </h2>
                                {data.pendingVerifications.length > 0 ? (
                                    <div className="space-y-4">
                                        {data.pendingVerifications.map((lawyer) => (
                                            <div key={lawyer.id} className="p-4 bg-muted/50 rounded-lg">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="font-semibold text-foreground">{lawyer.name}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {lawyer.specialization}
                                                            {lawyer.barNumber && ` • Bar #${lawyer.barNumber}`}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                                        Pending
                                                    </span>
                                                </div>
                                                <p className="text-xs text-muted-foreground mb-3">
                                                    Applied {new Date(lawyer.createdAt).toLocaleDateString()}
                                                </p>
                                                <button
                                                    onClick={() => handleVerify(lawyer.id)}
                                                    disabled={verifyingId === lawyer.id}
                                                    className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 transition disabled:opacity-50 flex items-center gap-1"
                                                >
                                                    {verifyingId === lawyer.id ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <CheckCircle size={14} />
                                                    )}
                                                    Approve
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No pending verifications.</p>
                                )}
                            </Card>

                            {/* Recent Users */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                    <TrendingUp size={24} className="text-primary" />
                                    Recent Users
                                </h2>
                                {data.recentUsers.length > 0 ? (
                                    <div className="space-y-4">
                                        {data.recentUsers.map((recentUser) => (
                                            <div key={recentUser.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                                                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center font-bold text-accent text-sm">
                                                    {recentUser.name.charAt(0)}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {recentUser.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {recentUser.email}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-xs px-2 py-0.5 rounded ${recentUser.role === 'ADMIN'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : recentUser.role === 'LAWYER'
                                                                ? 'bg-accent/20 text-accent'
                                                                : 'bg-primary/20 text-primary'
                                                            }`}>
                                                            {recentUser.role}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(recentUser.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground text-sm">No users yet.</p>
                                )}
                            </Card>
                        </div>
                    </>
                ) : (
                    <Card className="p-8 text-center">
                        <p className="text-red-400">Failed to load admin dashboard data.</p>
                    </Card>
                )}
            </div>
        </div>
    );
}
