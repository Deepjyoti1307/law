import { Controller, Get, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
    constructor(private dashboardService: DashboardService) { }

    @UseGuards(RolesGuard)
    @Roles(UserRole.CLIENT)
    @Get('client')
    async getClientDashboard(@Request() req) {
        return this.dashboardService.getClientDashboard(req.user.sub);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get('admin')
    async getAdminDashboard() {
        return this.dashboardService.getAdminDashboard();
    }

    // Admin only - verify a lawyer
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch('admin/verify-lawyer/:profileId')
    async verifyLawyer(@Param('profileId') profileId: string) {
        return this.dashboardService.verifyLawyer(profileId);
    }

    // Admin only - unverify a lawyer
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Patch('admin/unverify-lawyer/:profileId')
    async unverifyLawyer(@Param('profileId') profileId: string) {
        return this.dashboardService.unverifyLawyer(profileId);
    }
}
