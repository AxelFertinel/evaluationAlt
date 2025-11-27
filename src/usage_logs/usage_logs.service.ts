import { Injectable } from '@nestjs/common';
import { CreateUsageLogDto } from './dto/create-usage_log.dto';
import { UpdateUsageLogDto } from './dto/update-usage_log.dto';
import { PrismaService } from '../../src/prisma.service';
import { UsageLog } from '../../generated/prisma/client';

@Injectable()
export class UsageLogsService {
  constructor(private prisma: PrismaService) {}

  async create(createUsageLogDto: CreateUsageLogDto): Promise<UsageLog> {
    return await this.prisma.usageLog.create({
      data: createUsageLogDto,
    });
  }

  async findAll() {
    return await this.prisma.usageLog.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.usageLog.findUnique({ where: { id } });
  }

  async update(id: number, updateUsageLogDto: UpdateUsageLogDto) {
    return await this.prisma.usageLog.update({
      where: { id },
      data: updateUsageLogDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.usageLog.delete({ where: { id } });
  }
}
