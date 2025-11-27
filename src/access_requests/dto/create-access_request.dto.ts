import { IsNotEmpty, IsEnum, IsDate } from 'class-validator';
import { RequestStatus } from '../../../generated/prisma/enums';

export class CreateAccessRequestDto {
  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  tool_id: number;

  @IsNotEmpty()
  business_justification: string;

  @IsNotEmpty()
  @IsEnum(RequestStatus)
  status: RequestStatus;

  @IsDate()
  @IsNotEmpty()
  requested_at: Date;

  @IsDate()
  @IsNotEmpty()
  processed_at: Date;

  @IsNotEmpty()
  processed_by: number;

  @IsNotEmpty()
  processing_notes: string;
}
