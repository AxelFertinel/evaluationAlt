import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateUsageLogDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  toolId: number;

  @IsNotEmpty()
  @Type(() => Date)
  sessionDate: Date;

  @IsNotEmpty()
  @IsInt()
  usageMinutes: number;

  @IsNotEmpty()
  @IsInt()
  actionsCount: number;
}
