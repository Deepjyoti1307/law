'use client';

import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { Search, Star, MapPin, Briefcase, Loader2 } from 'lucide-react';
import { useLawyers } from '@/hooks/use-lawyers';
import { useState } from 'react';

export default function LawyersPage() {
    const [search, setSearch] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [page, setPage] = useState(1);
    const [searchInput, setSearchInput] = useState('');

    const { data, isLoading, error } = useLawyers({
        search: search || undefined,
        specialization: specialization || undefined,
        page,
        limit: 10,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setPage(1);
    };

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
                    <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder="Search by name, specialization, or location..."
                                    className="w-full pl-10 pr-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                                />
                            </div>
                        </div>
                        <select
                            value={specialization}
                            onChange={(e) => {
                                setSpecialization(e.target.value);
                                setPage(1);
                            }}
                            className="px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
                        >
                            <option value="">All Practice Areas</option>
                            <option value="Corporate Law">Corporate Law</option>
                            <option value="Criminal Defense">Criminal Defense</option>
                            <option value="Family Law">Family Law</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Intellectual Property">Intellectual Property</option>
                        </select>
                    </form>
                </Card>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-accent" size={32} />
                        <span className="ml-3 text-muted-foreground">Loading lawyers...</span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <Card className="p-8 text-center">
                        <p className="text-red-400 mb-2">Failed to load lawyers</p>
                        <p className="text-sm text-muted-foreground">Make sure the backend server is running.</p>
                    </Card>
                )}

                {/* Empty State */}
                {data && data.lawyers.length === 0 && (
                    <Card className="p-8 text-center">
                        <p className="text-muted-foreground">No lawyers found matching your criteria.</p>
                    </Card>
                )}

                {/* Lawyers Grid */}
                {data && data.lawyers.length > 0 && (
                    <>
                        <div className="grid md:grid-cols-2 gap-6">
                            {data.lawyers.map((lawyer) => (
                                <Card key={lawyer.id} className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-2xl font-bold text-accent overflow-hidden">
                                            {lawyer.avatar ? (
                                                <img src={lawyer.avatar} alt={lawyer.name} className="w-full h-full object-cover" />
                                            ) : (
                                                lawyer.name.charAt(0)
                                            )}
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
                                                    <span className="font-semibold text-foreground">{lawyer.rating.toFixed(1)}</span>
                                                    <span className="text-muted-foreground">({lawyer.reviewCount})</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                {lawyer.location && (
                                                    <>
                                                        <span className="flex items-center gap-1">
                                                            <MapPin size={14} />
                                                            {lawyer.location}
                                                        </span>
                                                        <span>•</span>
                                                    </>
                                                )}
                                                {lawyer.experience && (
                                                    <span>{lawyer.experience} experience</span>
                                                )}
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

                        {/* Pagination */}
                        {data.pagination.totalPages > 1 && (
                            <div className="flex justify-center gap-2 mt-8">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 border border-border rounded-md hover:bg-muted transition disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-muted-foreground">
                                    Page {data.pagination.page} of {data.pagination.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                                    disabled={page === data.pagination.totalPages}
                                    className="px-4 py-2 border border-border rounded-md hover:bg-muted transition disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
