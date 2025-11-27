import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsageLogsService } from './usage_logs.service';
import { CreateUsageLogDto } from './dto/create-usage_log.dto';
import { UpdateUsageLogDto } from './dto/update-usage_log.dto';

@Controller('usage-logs')
export class UsageLogsController {
  constructor(private readonly usageLogsService: UsageLogsService) {}

  @Post()
  create(@Body() createUsageLogDto: CreateUsageLogDto) {
    return this.usageLogsService.create(createUsageLogDto);
  }

  @Get()
  findAll() {
    return this.usageLogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usageLogsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsageLogDto: UpdateUsageLogDto) {
    return this.usageLogsService.update(+id, updateUsageLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usageLogsService.remove(+id);
  }
}
