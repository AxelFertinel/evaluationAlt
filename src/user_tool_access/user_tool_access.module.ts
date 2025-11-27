import { Module } from '@nestjs/common';
import { UserToolAccessService } from './user_tool_access.service';
import { UserToolAccessController } from './user_tool_access.controller';

@Module({
  controllers: [UserToolAccessController],
  providers: [UserToolAccessService],
})
export class UserToolAccessModule {}
