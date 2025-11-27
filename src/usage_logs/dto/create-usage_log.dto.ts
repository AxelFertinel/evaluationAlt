import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class CreateUsageLogDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  tool_id: number;

  @IsNotEmpty()
  @IsDate()
  session_date: Date;

  @IsNotEmpty()
  @IsNumber()
  usage_minutes: number;

  @IsNotEmpty()
  @IsNumber()
  actions_count: number;
}
