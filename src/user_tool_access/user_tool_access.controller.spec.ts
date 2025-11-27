import { Test, TestingModule } from '@nestjs/testing';
import { UserToolAccessController } from './user_tool_access.controller';
import { UserToolAccessService } from './user_tool_access.service';

describe('UserToolAccessController', () => {
  let controller: UserToolAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToolAccessController],
      providers: [UserToolAccessService],
    }).compile();

    controller = module.get<UserToolAccessController>(UserToolAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
