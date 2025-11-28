import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('Analytics')
export class AnalyticsController {
  constructor(private readonly AnalyticsService: AnalyticsService) {}

  @Get('department-costs')
  async getDepartmentCosts(
    @Query('sort_by') sortBy?: string,
    @Query('order') order?: 'desc' | 'asc',
  ) {
    return this.AnalyticsService.getDepartmentCosts(sortBy, order);
  }
}
