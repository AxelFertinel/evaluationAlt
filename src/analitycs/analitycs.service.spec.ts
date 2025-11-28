import { Test, TestingModule } from '@nestjs/testing';
import { AnalitycsService } from './analitycs.service';

describe('AnalitycsService', () => {
  let service: AnalitycsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalitycsService],
    }).compile();

    service = module.get<AnalitycsService>(AnalitycsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
