import { CreateCostTrackingDto } from '../dto/create-cost_tracking.dto';

export class CostTracking {
  constructor(CreateCostTrackingDto: CreateCostTrackingDto) {
    this.tool_id = CreateCostTrackingDto.tool_id;
    this.month_year = CreateCostTrackingDto.month_year;
    this.total_monthlycost = CreateCostTrackingDto.total_monthlycost;
    this.active_users_count = CreateCostTrackingDto.active_users_count;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  tool_id: number;

  month_year: Date;

  total_monthlycost: number;

  active_users_count: number;

  createdAt?: Date;

  updatedAt?: Date;
}
