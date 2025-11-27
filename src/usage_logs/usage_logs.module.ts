import { Module } from '@nestjs/common';
import { UsageLogsService } from './usage_logs.service';
import { UsageLogsController } from './usage_logs.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [UsageLogsController],
  providers: [UsageLogsService, PrismaService],
})
export class UsageLogsModule {}
