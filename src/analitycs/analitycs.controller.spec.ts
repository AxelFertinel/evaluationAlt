import { Test, TestingModule } from '@nestjs/testing';
import { AnalitycsController } from './analitycs.controller';
import { AnalitycsService } from './analitycs.service';

describe('AnalitycsController', () => {
  let controller: AnalitycsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnalitycsController],
      providers: [AnalitycsService],
    }).compile();

    controller = module.get<AnalitycsController>(AnalitycsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
