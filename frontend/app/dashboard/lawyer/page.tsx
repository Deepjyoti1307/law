'use client';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { useAuth } from '@/contexts/auth-context';
import { Calendar, MessageSquare, FileText, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function LawyerDashboardPage() {
    return (
        <ProtectedRoute allowedRoles={['LAWYER']}>
            <LawyerDashboard />
        </ProtectedRoute>
    );
}

function LawyerDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Welcome back, Counselor {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">
                        Your lawyer dashboard - manage clients and cases
                    </p>
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Users className="text-accent" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+5 this week</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">24</h3>
                        <p className="text-sm text-muted-foreground">Active Clients</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Calendar className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-blue-600 font-medium">Today</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">8</h3>
                        <p className="text-sm text-muted-foreground">Consultations Scheduled</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <FileText className="text-accent" size={24} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">15</h3>
                        <p className="text-sm text-muted-foreground">Active Cases</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <DollarSign className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">$8.5k</h3>
                        <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Calendar size={24} className="text-accent" />
                            Today's Schedule
                        </h2>
                        <div className="space-y-4">
                            {[
                                { time: '9:00 AM', client: 'John Smith', type: 'Contract Review' },
                                { time: '11:00 AM', client: 'Jane Doe', type: 'Initial Consultation' },
                                { time: '2:00 PM', client: 'ABC Corp', type: 'Corporate Law' },
                                { time: '4:00 PM', client: 'XYZ LLC', type: 'IP Discussion' },
                            ].map((appointment, i) => (
                                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-foreground">
                                                {appointment.client}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {appointment.type}
                                            </p>
                                        </div>
                                        <span className="text-sm font-medium text-accent">
                                            {appointment.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <TrendingUp size={24} className="text-primary" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[
                                { action: 'New client request', time: '2 hours ago', type: 'new' },
                                { action: 'Case document uploaded', time: '5 hours ago', type: 'update' },
                                { action: 'Consultation completed', time: 'Yesterday', type: 'complete' },
                                { action: 'Payment received', time: '2 days ago', type: 'payment' },
                            ].map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'new' ? 'bg-green-500' :
                                            activity.type === 'payment' ? 'bg-primary' :
                                                activity.type === 'complete' ? 'bg-accent' : 'bg-blue-500'
                                        }`}></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {activity.time}
                                        </p>
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
