import { IsNotEmpty, IsNumber, IsDate, IsEnum } from 'class-validator';
import { Status } from '../../../generated/prisma/enums';
export class CreateUserToolAccessDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  tool_id: number;

  @IsNotEmpty()
  granted_at: Date;

  @IsNotEmpty()
  @IsNumber()
  granted_by: number;

  @IsNotEmpty()
  @IsNumber()
  @IsDate()
  revoked_at: Date;

  @IsNotEmpty()
  @IsNumber()
  revoked_by: number;

  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;
}
