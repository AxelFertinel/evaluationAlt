import { Module } from '@nestjs/common';
import { AccessRequestsService } from './access_requests.service';
import { AccessRequestsController } from './access_requests.controller';
import { PrismaService } from '../../src/prisma.service';

@Module({
  controllers: [AccessRequestsController],
  providers: [AccessRequestsService, PrismaService],
})
export class AccessRequestsModule {}
