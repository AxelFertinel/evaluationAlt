import { Test, TestingModule } from '@nestjs/testing';
import { UserToolAccessService } from './user_tool_access.service';

describe('UserToolAccessService', () => {
  let service: UserToolAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToolAccessService],
    }).compile();

    service = module.get<UserToolAccessService>(UserToolAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
