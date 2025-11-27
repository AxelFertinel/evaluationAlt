import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateUsageLogDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  toolId: number;

  @IsNotEmpty()
  @IsDate()
  sessionDate: Date;

  @IsNotEmpty()
  @IsNumber()
  usageMinutes: number;

  @IsNotEmpty()
  @IsNumber()
  actionsCount: number;
}
