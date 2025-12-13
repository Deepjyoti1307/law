import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { RegisterDto, LoginDto, GoogleAuthDto, UserRole } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
    private googleClient: OAuth2Client;

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    }

    async register(registerDto: RegisterDto) {
        const { name, email, password, role, phone } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role,
                phone,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                avatar: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.role);

        return {
            user,
            ...tokens,
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.role);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                createdAt: user.createdAt,
            },
            ...tokens,
        };
    }

    async googleAuth(googleAuthDto: GoogleAuthDto) {
        const { token } = googleAuthDto;

        try {
            // Verify Google access token by fetching user info
            const response = await fetch(
                `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
            );

            if (!response.ok) {
                throw new UnauthorizedException('Invalid Google token');
            }

            const googleUser = await response.json();

            if (!googleUser.email) {
                throw new UnauthorizedException('Unable to get email from Google');
            }

            const { sub: googleId, email, name, picture } = googleUser;

            // Check if user exists
            let user = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email }, { googleId }],
                },
            });

            if (!user) {
                // Create new user
                user = await this.prisma.user.create({
                    data: {
                        email: email!,
                        name: name || email.split('@')[0], // Fallback to email username
                        googleId,
                        avatar: picture,
                        role: UserRole.CLIENT, // Default role for Google signup
                    },
                });
            } else if (!user.googleId) {
                // Link Google account to existing user
                user = await this.prisma.user.update({
                    where: { id: user.id },
                    data: { googleId, avatar: picture || user.avatar },
                });
            }

            // Generate tokens
            const tokens = await this.generateTokens(user.id, user.email, user.role);

            return {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                },
                ...tokens,
            };
        } catch (error) {
            console.error('Google auth error:', error);
            throw new UnauthorizedException('Invalid Google token');
        }
    }

    async getMe(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                phone: true,
                avatar: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return { user };
    }

    async refreshTokens(refreshToken: string) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            // Verify refresh token exists in database
            const storedToken = await this.prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true },
            });

            if (!storedToken || storedToken.expiresAt < new Date()) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Generate new tokens
            const tokens = await this.generateTokens(
                storedToken.user.id,
                storedToken.user.email,
                storedToken.user.role,
            );

            // Delete old refresh token
            await this.prisma.refreshToken.delete({
                where: { id: storedToken.id },
            });

            return tokens;
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    private async generateTokens(userId: string, email: string, role: UserRole) {
        const payload = { sub: userId, email, role: role as string };

        // Sign access token
        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
        });

        // Sign refresh token
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
        });

        // Store refresh token in database
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        await this.prisma.refreshToken.create({
            data: {
                token: refreshToken,
                userId,
                expiresAt,
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
