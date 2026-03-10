import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLawyerProfileDto } from './dto/create-lawyer-profile.dto';
import { UpdateLawyerProfileDto } from './dto/update-lawyer-profile.dto';

@Injectable()
export class LawyersService {
    constructor(private prisma: PrismaService) { }

    async findAll(query: {
        search?: string;
        specialization?: string;
        page?: number;
        limit?: number;
    }) {
        const { search, specialization, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const where: any = {
            verified: true,
        };

        if (search) {
            where.OR = [
                { user: { name: { contains: search, mode: 'insensitive' } } },
                { specialization: { contains: search, mode: 'insensitive' } },
                { location: { contains: search, mode: 'insensitive' } },
                { bio: { contains: search, mode: 'insensitive' } },
            ];
        }

        if (specialization) {
            where.specialization = { contains: specialization, mode: 'insensitive' };
        }

        const [lawyers, total] = await Promise.all([
            this.prisma.lawyerProfile.findMany({
                where,
                skip,
                take: limit,
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            avatar: true,
                        },
                    },
                },
                orderBy: { rating: 'desc' },
            }),
            this.prisma.lawyerProfile.count({ where }),
        ]);

        return {
            lawyers: lawyers.map((profile) => ({
                id: profile.id,
                userId: profile.userId,
                name: profile.user.name,
                avatar: profile.user.avatar,
                specialization: profile.specialization,
                location: profile.location,
                rating: profile.rating,
                reviewCount: profile.reviewCount,
                hourlyRate: profile.hourlyRate,
                experience: profile.experience,
                verified: profile.verified,
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                },
                reviews: {
                    include: {
                        client: {
                            select: {
                                id: true,
                                name: true,
                                avatar: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 10,
                },
            },
        });

        if (!profile) {
            throw new NotFoundException('Lawyer profile not found');
        }

        return {
            id: profile.id,
            userId: profile.userId,
            name: profile.user.name,
            email: profile.user.email,
            avatar: profile.user.avatar,
            specialization: profile.specialization,
            barNumber: profile.barNumber,
            hourlyRate: profile.hourlyRate,
            experience: profile.experience,
            education: profile.education,
            bio: profile.bio,
            languages: profile.languages,
            availability: profile.availability,
            location: profile.location,
            verified: profile.verified,
            rating: profile.rating,
            reviewCount: profile.reviewCount,
            reviews: profile.reviews.map((r) => ({
                id: r.id,
                rating: r.rating,
                comment: r.comment,
                clientName: r.client.name,
                clientAvatar: r.client.avatar,
                createdAt: r.createdAt,
            })),
            createdAt: profile.createdAt,
        };
    }

    async createProfile(userId: string, dto: CreateLawyerProfileDto) {
        // Check if user already has a profile
        const existing = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
        });

        if (existing) {
            throw new ConflictException('Lawyer profile already exists. Use PATCH to update.');
        }

        const profile = await this.prisma.lawyerProfile.create({
            data: {
                userId,
                specialization: dto.specialization,
                barNumber: dto.barNumber,
                hourlyRate: dto.hourlyRate || 0,
                experience: dto.experience,
                education: dto.education,
                bio: dto.bio,
                languages: dto.languages || ['English'],
                availability: dto.availability ?? undefined,
                location: dto.location,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });

        return profile;
    }

    async updateProfile(userId: string, dto: UpdateLawyerProfileDto) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
        });

        if (!profile) {
            throw new NotFoundException('Lawyer profile not found. Create one first.');
        }

        const updated = await this.prisma.lawyerProfile.update({
            where: { userId },
            data: dto,
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });

        return updated;
    }

    async getMyProfile(userId: string) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
                reviews: {
                    include: {
                        client: {
                            select: { id: true, name: true, avatar: true },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                    take: 5,
                },
            },
        });

        if (!profile) {
            return null;
        }

        return profile;
    }

    async getDashboardStats(userId: string) {
        const profile = await this.prisma.lawyerProfile.findUnique({
            where: { userId },
            include: {
                _count: {
                    select: { reviews: true },
                },
            },
        });

        if (!profile) {
            return {
                hasProfile: false,
                totalReviews: 0,
                rating: 0,
                verified: false,
            };
        }

        return {
            hasProfile: true,
            totalReviews: profile._count.reviews,
            rating: profile.rating,
            hourlyRate: profile.hourlyRate,
            verified: profile.verified,
            specialization: profile.specialization,
            location: profile.location,
        };
    }
}
