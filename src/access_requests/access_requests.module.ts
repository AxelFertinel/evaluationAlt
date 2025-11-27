import { Module } from '@nestjs/common';
import { AccessRequestsService } from './access_requests.service';
import { AccessRequestsController } from './access_requests.controller';

@Module({
  controllers: [AccessRequestsController],
  providers: [AccessRequestsService],
})
export class AccessRequestsModule {}
