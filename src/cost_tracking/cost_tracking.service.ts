import { Injectable } from '@nestjs/common';
import { CreateCostTrackingDto } from './dto/create-cost_tracking.dto';
import { UpdateCostTrackingDto } from './dto/update-cost_tracking.dto';

@Injectable()
export class CostTrackingService {
  create(createCostTrackingDto: CreateCostTrackingDto) {
    return 'This action adds a new costTracking';
  }

  findAll() {
    return `This action returns all costTracking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} costTracking`;
  }

  update(id: number, updateCostTrackingDto: UpdateCostTrackingDto) {
    return `This action updates a #${id} costTracking`;
  }

  remove(id: number) {
    return `This action removes a #${id} costTracking`;
  }
}
