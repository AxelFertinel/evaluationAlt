import { Module } from '@nestjs/common';
import { CostTrackingService } from './cost_tracking.service';
import { CostTrackingController } from './cost_tracking.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CostTrackingController],
  providers: [CostTrackingService, PrismaService],
})
export class CostTrackingModule {}
