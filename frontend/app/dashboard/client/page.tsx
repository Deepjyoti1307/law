'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { Calendar, MessageSquare, FileText, Search, Clock, TrendingUp } from 'lucide-react';

export default function ClientDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['CLIENT']}>
            <ClientDashboard />
        </ProtectedRoute>
    );
}

function ClientDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Your client dashboard - manage consultations and cases
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Calendar className="text-accent" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">3</h3>
                        <p className="text-sm text-muted-foreground">Upcoming Consultations</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="text-primary" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">2</h3>
                        <p className="text-sm text-muted-foreground">Active Cases</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <MessageSquare className="text-accent" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">12</h3>
                        <p className="text-sm text-muted-foreground">Messages</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Search className="text-primary" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">5</h3>
                        <p className="text-sm text-muted-foreground">Saved Lawyers</p>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Clock size={24} className="text-accent" />
                            Upcoming Consultations
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-foreground">
                                            Corporate Law Consultation
                                        </h3>
                                        <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                                            Tomorrow
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        with Sarah Mitchell
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        2:00 PM - 3:00 PM
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <FileText size={24} className="text-primary" />
                            Active Cases
                        </h2>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="p-4 border border-border rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-foreground">
                                            Business Contract Review
                                        </h3>
                                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                            In Progress
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Lawyer: Sarah Mitchell
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <div className="flex-1 bg-muted rounded-full h-2">
                                            <div className="bg-accent h-2 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                        <span>60%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
