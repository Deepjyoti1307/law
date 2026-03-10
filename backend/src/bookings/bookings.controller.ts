import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto, UpdateBookingStatusDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('bookings')
export class BookingsController {
    constructor(private bookingsService: BookingsService) { }

    // Client only - create a booking
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CLIENT)
    @Post()
    async create(@Request() req, @Body() dto: CreateBookingDto) {
        return this.bookingsService.create(req.user.sub, dto);
    }

    // Authenticated - get own bookings
    @UseGuards(JwtAuthGuard)
    @Get('my')
    async getMyBookings(@Request() req) {
        if (req.user.role === 'LAWYER') {
            return this.bookingsService.findByLawyer(req.user.sub);
        }
        return this.bookingsService.findByClient(req.user.sub);
    }

    // Authenticated - update booking status
    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: string,
        @Request() req,
        @Body() dto: UpdateBookingStatusDto,
    ) {
        return this.bookingsService.updateStatus(id, req.user.sub, req.user.role, dto);
    }

    // Public - get available slots for a lawyer on a specific date
    @Get('available-slots/:lawyerProfileId')
    async getAvailableSlots(
        @Param('lawyerProfileId') lawyerProfileId: string,
        @Query('date') date: string,
    ) {
        return this.bookingsService.getAvailableSlots(lawyerProfileId, date);
    }
}
