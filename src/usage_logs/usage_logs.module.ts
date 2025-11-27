import { Module } from '@nestjs/common';
import { UsageLogsService } from './usage_logs.service';
import { UsageLogsController } from './usage_logs.controller';

@Module({
  controllers: [UsageLogsController],
  providers: [UsageLogsService],
})
export class UsageLogsModule {}
