import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

class CreateReviewDto {
    @IsString()
    lawyerProfileId: string;

    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsOptional()
    @IsString()
    comment?: string;
}

@Controller('reviews')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) { }

    // Client only - create a review
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.CLIENT)
    @Post()
    async create(@Request() req, @Body() dto: CreateReviewDto) {
        return this.reviewsService.create(req.user.sub, dto);
    }

    // Public - get reviews for a lawyer
    @Get('lawyer/:lawyerProfileId')
    async findByLawyer(
        @Param('lawyerProfileId') lawyerProfileId: string,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
    ) {
        return this.reviewsService.findByLawyer(
            lawyerProfileId,
            page ? parseInt(page, 10) : 1,
            limit ? parseInt(limit, 10) : 10,
        );
    }
}
