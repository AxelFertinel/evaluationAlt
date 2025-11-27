import { CreateUsageLogDto } from '../dto/create-usage_log.dto';

export class UsageLog {
  constructor(CreateUsageLogDto: CreateUsageLogDto) {
    this.userId = CreateUsageLogDto.userId;
    this.toolId = CreateUsageLogDto.toolId;
    this.sessionDate = CreateUsageLogDto.sessionDate;
    this.usageMinutes = CreateUsageLogDto.usageMinutes;
    this.actionsCount = CreateUsageLogDto.actionsCount;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  userId: number;

  toolId: number;

  sessionDate: Date;

  usageMinutes: number;

  actionsCount: number;

  createdAt?: Date;

  updatedAt?: Date;
}
