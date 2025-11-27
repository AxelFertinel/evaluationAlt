import { CreateCostTrackingDto } from '../dto/create-cost_tracking.dto';

export class CostTracking {
  constructor(CreateCostTrackingDto: CreateCostTrackingDto) {
    this.toolId = CreateCostTrackingDto.toolId;
    this.monthYear = CreateCostTrackingDto.monthYear;
    this.totalMonthlycost = CreateCostTrackingDto.totalMonthlyCost;
    this.activeUsersCount = CreateCostTrackingDto.activeUsersCount;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  toolId: number;

  monthYear: Date;

  totalMonthlycost: number;

  activeUsersCount: number;

  createdAt?: Date;

  updatedAt?: Date;
}
