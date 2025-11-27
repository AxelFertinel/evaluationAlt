import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostTrackingService } from './cost_tracking.service';
import { CreateCostTrackingDto } from './dto/create-cost_tracking.dto';
import { UpdateCostTrackingDto } from './dto/update-cost_tracking.dto';

@Controller('cost-tracking')
export class CostTrackingController {
  constructor(private readonly costTrackingService: CostTrackingService) {}

  @Post()
  create(@Body() createCostTrackingDto: CreateCostTrackingDto) {
    return this.costTrackingService.create(createCostTrackingDto);
  }

  @Get()
  findAll() {
    return this.costTrackingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costTrackingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostTrackingDto: UpdateCostTrackingDto) {
    return this.costTrackingService.update(+id, updateCostTrackingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costTrackingService.remove(+id);
  }
}
