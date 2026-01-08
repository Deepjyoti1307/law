import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { RegisterDto, LoginDto, GoogleAuthDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private googleClient;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            phone: string | null;
            id: string;
            avatar: string | null;
            createdAt: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            phone: string | null;
            avatar: string | null;
            createdAt: Date;
        };
    }>;
    googleAuth(googleAuthDto: GoogleAuthDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            phone: string | null;
            avatar: string | null;
            createdAt: Date;
        };
    }>;
    getMe(userId: string): Promise<{
        user: {
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            phone: string | null;
            id: string;
            avatar: string | null;
            createdAt: Date;
        };
    }>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    private generateTokens;
}
