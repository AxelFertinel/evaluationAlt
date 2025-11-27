import { CreateUsageLogDto } from '../dto/create-usage_log.dto';

export class UsageLog {
  constructor(CreateUsageLogDto: CreateUsageLogDto) {
    this.user_id = CreateUsageLogDto.user_id;
    this.tool_id = CreateUsageLogDto.tool_id;
    this.session_date = CreateUsageLogDto.session_date;
    this.usage_minutes = CreateUsageLogDto.usage_minutes;
    this.actions_count = CreateUsageLogDto.actions_count;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  user_id: number;

  tool_id: number;

  session_date: Date;

  usage_minutes: number;

  actions_count: number;

  createdAt?: Date;

  updatedAt?: Date;
}
