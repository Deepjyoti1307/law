import { Card } from '@/components/Card';
import { Users, FileText, Scale, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-muted-foreground">
                        Manage platform users, lawyers, and system settings
                    </p>
                </div>

                {/* Admin Stats */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Users className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+25%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">1,284</h3>
                        <p className="text-sm text-muted-foreground">Total Users</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <Scale className="text-accent" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+18%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">342</h3>
                        <p className="text-sm text-muted-foreground">Active Lawyers</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <FileText className="text-primary" size={24} />
                            </div>
                            <span className="text-sm text-blue-600 font-medium">+12%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">5,678</h3>
                        <p className="text-sm text-muted-foreground">Total Cases</p>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-accent/10 rounded-lg">
                                <DollarSign className="text-accent" size={24} />
                            </div>
                            <span className="text-sm text-green-600 font-medium">+32%</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-1">$156k</h3>
                        <p className="text-sm text-muted-foreground">Revenue (MTD)</p>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Lawyer Applications */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Scale size={24} className="text-accent" />
                            Pending Lawyer Verifications
                        </h2>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="p-4 bg-muted/50 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-foreground">Dr. Jane Smith</h3>
                                            <p className="text-sm text-muted-foreground">Corporate Law • NY Bar #12345</p>
                                        </div>
                                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                                            Pending
                                        </span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="px-3 py-1 text-sm bg-primary text-white rounded hover:bg-primary/90 transition">
                                            Approve
                                        </button>
                                        <button className="px-3 py-1 text-sm border border-border rounded hover:bg-muted transition">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* System Alerts */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <AlertCircle size={24} className="text-primary" />
                            System Alerts
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-red-600 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Payment Gateway Issue</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Stripe webhook failing for the last 2 hours
                                        </p>
                                        <span className="text-xs text-red-600 mt-2 inline-block">High Priority</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="text-amber-600 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-semibold text-foreground">Server Load High</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            CPU usage at 85% on production servers
                                        </p>
                                        <span className="text-xs text-amber-600 mt-2 inline-block">Medium Priority</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <TrendingUp className="text-blue-600 mt-0.5" size={20} />
                                    <div>
                                        <h3 className="font-semibold text-foreground">User Growth Spike</h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            50% increase in new signups this week
                                        </p>
                                        <span className="text-xs text-blue-600 mt-2 inline-block">Info</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="p-6 mt-8">
                    <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="p-4 border border-border rounded-lg hover:bg-muted transition text-left">
                            <Users className="text-primary mb-2" size={24} />
                            <h3 className="font-semibold text-foreground">Manage Users</h3>
                            <p className="text-sm text-muted-foreground mt-1">View and edit user accounts</p>
                        </button>
                        <button className="p-4 border border-border rounded-lg hover:bg-muted transition text-left">
                            <Scale className="text-accent mb-2" size={24} />
                            <h3 className="font-semibold text-foreground">Verify Lawyers</h3>
                            <p className="text-sm text-muted-foreground mt-1">Process pending applications</p>
                        </button>
                        <button className="p-4 border border-border rounded-lg hover:bg-muted transition text-left">
                            <FileText className="text-primary mb-2" size={24} />
                            <h3 className="font-semibold text-foreground">Review Cases</h3>
                            <p className="text-sm text-muted-foreground mt-1">Monitor active cases</p>
                        </button>
                        <button className="p-4 border border-border rounded-lg hover:bg-muted transition text-left">
                            <DollarSign className="text-accent mb-2" size={24} />
                            <h3 className="font-semibold text-foreground">Financial Reports</h3>
                            <p className="text-sm text-muted-foreground mt-1">View revenue and analytics</p>
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
