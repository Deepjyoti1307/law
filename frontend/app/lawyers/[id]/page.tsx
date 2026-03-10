'use client';

import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Star, MapPin, Briefcase, GraduationCap, Award, Calendar, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import { useLawyer } from '@/hooks/use-lawyers';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LawyerProfilePage() {
    const params = useParams();
    const id = params.id as string;
    const { data: lawyer, isLoading, error } = useLawyer(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-accent" size={32} />
                <span className="ml-3 text-muted-foreground">Loading profile...</span>
            </div>
        );
    }

    if (error || !lawyer) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="p-8 text-center">
                    <p className="text-red-400 mb-2">Lawyer profile not found</p>
                    <p className="text-sm text-muted-foreground">The profile may have been removed or the server is unavailable.</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-200px)] px-4 py-12">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <Card className="p-8 mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center text-5xl font-bold text-accent flex-shrink-0 overflow-hidden">
                            {lawyer.avatar ? (
                                <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                            ) : (
                                lawyer.name.charAt(0)
                            )}
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
                                    {lawyer.location && (
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <MapPin size={16} />
                                            {lawyer.location}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Star size={20} className="fill-accent text-accent" />
                                        <span className="text-2xl font-bold text-foreground">{lawyer.rating.toFixed(1)}</span>
                                        <span className="text-muted-foreground">({lawyer.reviewCount} reviews)</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-foreground">${lawyer.hourlyRate}</span>
                                        <span className="text-muted-foreground">/hour</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <Link href={`/lawyers/${id}/book`}>
                                    <Button variant="gradient" size="lg" icon={<Calendar size={20} />}>
                                        Book Consultation
                                    </Button>
                                </Link>
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
                        {lawyer.bio && (
                            <Card className="p-6">
                                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {lawyer.bio}
                                </p>
                            </Card>
                        )}

                        {/* Reviews Section */}
                        <Card className="p-6">
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                Client Reviews ({lawyer.reviewCount})
                            </h2>
                            {lawyer.reviews.length > 0 ? (
                                <div className="space-y-4">
                                    {lawyer.reviews.map((review) => (
                                        <div key={review.id} className="pb-4 border-b border-border last:border-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary overflow-hidden">
                                                        {review.clientAvatar ? (
                                                            <img src={review.clientAvatar} alt={review.clientName} className="w-full h-full object-cover" />
                                                        ) : (
                                                            review.clientName.split(' ').map(n => n[0]).join('').slice(0, 2)
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-foreground">{review.clientName}</p>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    className={i < review.rating ? 'fill-accent text-accent' : 'text-muted-foreground'}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No reviews yet.</p>
                            )}
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Credentials */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-foreground mb-4">Credentials</h3>
                            <div className="space-y-4">
                                {lawyer.education && (
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                                            <GraduationCap size={16} className="text-accent" />
                                            Education
                                        </p>
                                        <p className="text-sm text-muted-foreground">{lawyer.education}</p>
                                    </div>
                                )}
                                {lawyer.barNumber && (
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-1">Bar Number</p>
                                        <p className="text-sm text-muted-foreground">{lawyer.barNumber}</p>
                                    </div>
                                )}
                                {lawyer.experience && (
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-1">Experience</p>
                                        <p className="text-sm text-muted-foreground">{lawyer.experience}</p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Languages</p>
                                    <p className="text-sm text-muted-foreground">{lawyer.languages.join(', ')}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground mb-1">Verification</p>
                                    <p className={`text-sm flex items-center gap-1 ${lawyer.verified ? 'text-green-400' : 'text-amber-400'}`}>
                                        <CheckCircle size={14} />
                                        {lawyer.verified ? 'Verified' : 'Pending verification'}
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Availability */}
                        {lawyer.availability && (
                            <Card className="p-6">
                                <h3 className="text-xl font-bold text-foreground mb-4">Availability</h3>
                                <div className="space-y-2 text-sm">
                                    {Object.entries(lawyer.availability).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between py-2 border-b border-border last:border-0">
                                            <span className="text-muted-foreground capitalize">{day}</span>
                                            <span className="text-foreground font-medium">{String(hours)}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
