import { IsNotEmpty, IsInt, IsEnum, IsOptional } from 'class-validator';
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

  @IsOptional()
  @Type(() => Date)
  revokedAt?: Date;
  
  @IsOptional()
  @IsInt()
  revokedBy?: number;

  @IsNotEmpty()
  @IsEnum(AccessStatus)
  status: AccessStatus;
}
