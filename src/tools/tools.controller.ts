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
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { Department, ToolStatus } from '../../generated/prisma/enums';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  async findWithFilter(
    @Query('department') department?: Department,
    @Query('status') status?: ToolStatus,
    @Query('min_cost') minCost?: string,
    @Query('max_cost') maxCost?: string,
    @Query('category') category?: string,
  ) {
    // Convert string query params to numbers
    const minCostNum = minCost ? parseFloat(minCost) : undefined;
    const maxCostNum = maxCost ? parseFloat(maxCost) : undefined;

    return await this.toolsService.findWithFilters(
      department,
      status,
      minCostNum,
      maxCostNum,
      category,
    );
  }

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }
}
