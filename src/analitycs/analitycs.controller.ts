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
import { AnalitycsService } from './analitycs.service';

@Controller('analitycs')
export class AnalitycsController {
  constructor(private readonly analitycsService: AnalitycsService) {}

  @Get('department-costs')
  async findAll(
    @Query('sort_by') sort_by?: string,
    @Query('order') order?: 'desc' | 'asc',
  ) {
    return await this.analitycsService.findAll(sort_by, order);
  }
}
