import { Injectable } from '@nestjs/common';
import { CreateUsageLogDto } from './dto/create-usage_log.dto';
import { UpdateUsageLogDto } from './dto/update-usage_log.dto';

@Injectable()
export class UsageLogsService {
  create(createUsageLogDto: CreateUsageLogDto) {
    return 'This action adds a new usageLog';
  }

  findAll() {
    return `This action returns all usageLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usageLog`;
  }

  update(id: number, updateUsageLogDto: UpdateUsageLogDto) {
    return `This action updates a #${id} usageLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} usageLog`;
  }
}
