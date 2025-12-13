import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { Search, Star, MapPin, Briefcase } from 'lucide-react';

export default function LawyersPage() {
    // Mock lawyer data
    const lawyers = [
        {
            id: '1',
            name: 'Sarah Mitchell',
            specialization: 'Corporate Law',
            location: 'New York, NY',
            rating: 4.9,
            reviews: 127,
            hourlyRate: 350,
            experience: '15 years',
        },
        {
            id: '2',
            name: 'James Rodriguez',
            specialization: 'Criminal Defense',
            location: 'Los Angeles, CA',
            rating: 4.8,
            reviews: 95,
            hourlyRate: 400,
            experience: '12 years',
        },
        {
            id: '3',
            name: 'Emily Chen',
            specialization: 'Family Law',
            location: 'Chicago, IL',
            rating: 4.9,
            reviews: 156,
            hourlyRate: 300,
            experience: '10 years',
        },
        {
            id: '4',
            name: 'Michael Brown',
            specialization: 'Real Estate',
            location: 'Miami, FL',
            rating: 4.7,
            reviews: 83,
            hourlyRate: 325,
            experience: '8 years',
        },
    ];

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Find Your Lawyer
                    </h1>
                    <p className="text-muted-foreground">
                        Browse our network of verified legal professionals
                    </p>
                </div>

                {/* Search and Filters */}
                <Card className="p-6 mb-8">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, specialization, or location..."
                                    className="w-full pl-10 pr-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                                />
                            </div>
                        </div>
                        <select className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground">
                            <option value="">All Practice Areas</option>
                            <option value="corporate">Corporate Law</option>
                            <option value="criminal">Criminal Defense</option>
                            <option value="family">Family Law</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="ip">Intellectual Property</option>
                        </select>
                    </div>
                </Card>

                {/* Lawyers Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {lawyers.map((lawyer) => (
                        <Card key={lawyer.id} className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-accent">
                                    {lawyer.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-foreground">
                                                {lawyer.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                                <Briefcase size={14} />
                                                {lawyer.specialization}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            <Star size={16} className="fill-accent text-accent" />
                                            <span className="font-semibold text-foreground">{lawyer.rating}</span>
                                            <span className="text-muted-foreground">({lawyer.reviews})</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {lawyer.location}
                                        </span>
                                        <span>•</span>
                                        <span>{lawyer.experience} experience</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-2xl font-bold text-foreground">
                                                ${lawyer.hourlyRate}
                                            </span>
                                            <span className="text-sm text-muted-foreground">/hour</span>
                                        </div>
                                        <Link href={`/lawyers/${lawyer.id}`}>
                                            <Button variant="gradient" size="md">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
