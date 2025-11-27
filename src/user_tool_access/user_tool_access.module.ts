import { Module } from '@nestjs/common';
import { UserToolAccessService } from './user_tool_access.service';
import { UserToolAccessController } from './user_tool_access.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UserToolAccessController],
  providers: [UserToolAccessService, PrismaService],
})
export class UserToolAccessModule {}
