import { Test, TestingModule } from '@nestjs/testing';
import { AccessRequestsController } from './access_requests.controller';
import { AccessRequestsService } from './access_requests.service';

describe('AccessRequestsController', () => {
  let controller: AccessRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessRequestsController],
      providers: [AccessRequestsService],
    }).compile();

    controller = module.get<AccessRequestsController>(AccessRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
