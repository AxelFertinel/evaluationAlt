import { IsNotEmpty, IsInt, IsEnum } from 'class-validator';
import { AccessStatus } from '../../../generated/prisma/enums';
import { Type } from 'class-transformer';
export class CreateUserToolAccessDto {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  toolId: number;

  @IsNotEmpty()
  @Type(() => Date)
  grantedAt: Date;

  @IsNotEmpty()
  @IsInt()
  grantedBy: number;

  @Type(() => Date)
  revokedAt?: Date;

  @IsInt()
  revokedBy?: number;

  @IsNotEmpty()
  @IsEnum(AccessStatus)
  status: AccessStatus;
}
