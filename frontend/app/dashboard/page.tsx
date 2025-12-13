import { Card } from '@/components/Card';
import { BarChart3, Calendar, MessageSquare, FileText, Users, DollarSign } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome back! Here's an overview of your activity.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Calendar className="text-accent" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">24</h3>
                        <p className="text-sm text-muted-foreground">Active Cases</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <MessageSquare className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+8%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">156</h3>
                        <p className="text-sm text-muted-foreground">Consultations</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <FileText className="text-accent" size={24} />
                            </div>
                            <span className="text-sm text-blue-600 font-medium">+5%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">89</h3>
                        <p className="text-sm text-muted-foreground">Documents</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <DollarSign className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+15%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">$12.5k</h3>
                        <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                    </Card>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <BarChart3 size={24} className="text-accent" />
                            Recent Activity
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">
                                            New consultation scheduled
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            2 hours ago
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Upcoming Appointments */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Calendar size={24} className="text-primary" />
                            Upcoming Appointments
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-semibold text-foreground">
                                            Client Consultation
                                        </h3>
                                        <span className="text-xs bg-accent text-white px-2 py-1 rounded">
                                            Upcoming
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                        John Doe • Corporate Law
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Tomorrow, 2:00 PM - 3:00 PM
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
