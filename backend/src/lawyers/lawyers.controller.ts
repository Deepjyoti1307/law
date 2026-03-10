import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { LawyersService } from './lawyers.service';
import { CreateLawyerProfileDto } from './dto/create-lawyer-profile.dto';
import { UpdateLawyerProfileDto } from './dto/update-lawyer-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('lawyers')
export class LawyersController {
    constructor(private lawyersService: LawyersService) { }

    // Public - list lawyers with search/filter
    @Get()
    async findAll(
        @Query('search') search?: string,
        @Query('specialization') specialization?: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.lawyersService.findAll({
            search,
            specialization,
            page: page ? parseInt(page, 10) : 1,
            limit: limit ? parseInt(limit, 10) : 10,
        });
    }

    // Public - get single lawyer profile
    @Get('profile/:id')
    async findOne(@Param('id') id: string) {
        return this.lawyersService.findOne(id);
    }

    // Lawyer only - get own profile
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.LAWYER)
    @Get('my-profile')
    async getMyProfile(@Request() req) {
        return this.lawyersService.getMyProfile(req.user.sub);
    }

    // Lawyer only - create own profile
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.LAWYER)
    @Post('profile')
    async createProfile(@Request() req, @Body() dto: CreateLawyerProfileDto) {
        return this.lawyersService.createProfile(req.user.sub, dto);
    }

    // Lawyer only - update own profile
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.LAWYER)
    @Patch('profile')
    async updateProfile(@Request() req, @Body() dto: UpdateLawyerProfileDto) {
        return this.lawyersService.updateProfile(req.user.sub, dto);
    }

    // Lawyer only - dashboard stats
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.LAWYER)
    @Get('dashboard/stats')
    async getDashboardStats(@Request() req) {
        return this.lawyersService.getDashboardStats(req.user.sub);
    }
}
