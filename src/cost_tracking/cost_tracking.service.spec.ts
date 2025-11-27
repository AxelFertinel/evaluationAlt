import { Test, TestingModule } from '@nestjs/testing';
import { CostTrackingService } from './cost_tracking.service';

describe('CostTrackingService', () => {
  let service: CostTrackingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CostTrackingService],
    }).compile();

    service = module.get<CostTrackingService>(CostTrackingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
