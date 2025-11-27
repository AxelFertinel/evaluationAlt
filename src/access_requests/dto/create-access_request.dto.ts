import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsString,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RequestStatus } from '../../../generated/prisma/enums';

export class CreateAccessRequestDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  toolId: number;

  @IsString()
  @IsNotEmpty()
  businessJustification: string;

  @IsEnum(RequestStatus)
  @IsOptional()
  status?: RequestStatus;

  @IsOptional()
  @Type(() => Date)
  requestedAt?: Date;

  @IsOptional()
  @Type(() => Date)
  processedAt?: Date;

  @IsInt()
  @IsOptional()
  processedBy?: number;

  @IsString()
  @IsOptional()
  processingNotes?: string;
}
