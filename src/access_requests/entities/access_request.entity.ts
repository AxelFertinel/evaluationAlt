import { CreateAccessRequestDto } from '../dto/create-access_request.dto';
import { RequestStatus } from '../../../generated/prisma/enums';

export class AccessRequest {
  constructor(CreateAccessRequestDto: CreateAccessRequestDto) {
    this.user_id = CreateAccessRequestDto.user_id;
    this.tool_id = CreateAccessRequestDto.tool_id;
    this.business_justification = CreateAccessRequestDto.business_justification;
    this.status = CreateAccessRequestDto.status;
    this.requested_at = CreateAccessRequestDto.requested_at;
    this.processed_at = CreateAccessRequestDto.processed_at;
    this.processed_by = CreateAccessRequestDto.processed_by;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  user_id: number;

  tool_id: number;

  business_justification: string;

  status: RequestStatus;

  requested_at: Date;

  processed_at: Date;

  processed_by: number;

  createdAt: Date;

  updatedAt: Date;
}
