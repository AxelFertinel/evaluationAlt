import { IsNotEmpty, IsDate, IsDecimal } from 'class-validator';

export class CreateCostTrackingDto {
  @IsNotEmpty()
  tool_id: number;

  @IsNotEmpty()
  @IsDate()
  month_year: Date;

  @IsNotEmpty()
  @IsDecimal()
  total_monthlycost: number;

  @IsNotEmpty()
  active_users_count: number;
}
