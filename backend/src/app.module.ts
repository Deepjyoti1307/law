import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LawyersModule } from './lawyers/lawyers.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReviewsModule } from './reviews/reviews.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [AuthModule, LawyersModule, DashboardModule, ReviewsModule, BookingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
