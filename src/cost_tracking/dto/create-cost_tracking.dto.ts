import { Type } from 'class-transformer';
import { IsNotEmpty, IsDecimal, IsInt } from 'class-validator';

export class CreateCostTrackingDto {
  @IsNotEmpty()
  @IsInt()
  toolId: number;

  @IsNotEmpty()
  @Type(() => Date)
  monthYear: Date;

  @IsNotEmpty()
  @IsDecimal()
  totalMonthlyCost: number;

  @IsNotEmpty()
  @IsInt()
  activeUsersCount: number;
}
