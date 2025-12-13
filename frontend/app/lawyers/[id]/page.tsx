import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Star, MapPin, Briefcase, GraduationCap, Award, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function LawyerProfilePage({ params }: PageProps) {
    const { id } = await params;

    // Mock lawyer data - will be replaced with API call
    const lawyer = {
        id,
        name: 'Sarah Mitchell',
        specialization: 'Corporate Law',
        location: 'New York, NY',
        rating: 4.9,
        reviews: 127,
        hourlyRate: 350,
        experience: '15 years',
        education: 'Harvard Law School, J.D.',
        barNumber: 'NY-123456',
        languages: ['English', 'Spanish'],
        about: 'Experienced corporate attorney with a focus on mergers and acquisitions, contract negotiations, and corporate governance. Dedicated to providing strategic legal counsel to help businesses thrive.',
        achievements: [
            'Super Lawyers Rising Star 2020-2023',
            'Best Lawyers in America 2022',
            'Top 40 Under 40 Business Lawyers',
        ],
    };

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <Card className="p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center text-5xl font-bold text-accent flex-shrink-0">
                            {lawyer.name.charAt(0)}
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground mb-2">
                                        {lawyer.name}
                                    </h1>
                                    <p className="text-lg text-muted-foreground flex items-center gap-2 mb-2">
                                        <Briefcase size={18} />
                                        {lawyer.specialization}
                                    </p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                                        <MapPin size={16} />
                                        {lawyer.location}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Star size={20} className="fill-accent text-accent" />
                                        <span className="text-2xl font-bold text-foreground">{lawyer.rating}</span>
                                        <span className="text-muted-foreground">({lawyer.reviews} reviews)</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-foreground">${lawyer.hourlyRate}</span>
                                        <span className="text-muted-foreground">/hour</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Button variant="gradient" size="lg" icon={<Calendar size={20} />}>
                                    Book Consultation
                                </Button>
                                <Button variant="outline" size="lg" icon={<MessageSquare size={20} />}>
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* About */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                {lawyer.about}
                            </p>
                        </Card>

                        {/* Achievements */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Award size={24} className="text-accent" />
                                Achievements & Awards
                            </h2>
                            <ul className="space-y-3">
                                {lawyer.achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>

                        {/* Reviews Section */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">Client Reviews</h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="pb-4 border-b border-border last:border-0">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
                                                    JD
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-foreground">John Doe</p>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} size={14} className="fill-accent text-accent" />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-muted-foreground">2 weeks ago</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Excellent service! Very professional and knowledgeable. Helped me navigate
                                            complex corporate matters with ease.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Credentials */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Credentials</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                                        <GraduationCap size={16} className="text-accent" />
                                        Education
                                    </p>
                                    <p className="text-sm text-muted-foreground">{lawyer.education}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Bar Number</p>
                                    <p className="text-sm text-muted-foreground">{lawyer.barNumber}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Experience</p>
                                    <p className="text-sm text-muted-foreground">{lawyer.experience}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Languages</p>
                                    <p className="text-sm text-muted-foreground">{lawyer.languages.join(', ')}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Availability */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Availability</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Monday</span>
                                    <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Tuesday</span>
                                    <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-border">
                                    <span className="text-muted-foreground">Wednesday</span>
                                    <span className="text-foreground font-medium">9:00 AM - 5:00 PM</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-muted-foreground">Weekend</span>
                                    <span className="text-foreground font-medium">By appointment</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
