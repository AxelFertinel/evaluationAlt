import { Test, TestingModule } from '@nestjs/testing';
import { CostTrackingController } from './cost_tracking.controller';
import { CostTrackingService } from './cost_tracking.service';

describe('CostTrackingController', () => {
  let controller: CostTrackingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CostTrackingController],
      providers: [CostTrackingService],
    }).compile();

    controller = module.get<CostTrackingController>(CostTrackingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
