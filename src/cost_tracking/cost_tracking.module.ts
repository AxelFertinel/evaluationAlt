import { Module } from '@nestjs/common';
import { CostTrackingService } from './cost_tracking.service';
import { CostTrackingController } from './cost_tracking.controller';

@Module({
  controllers: [CostTrackingController],
  providers: [CostTrackingService],
})
export class CostTrackingModule {}
