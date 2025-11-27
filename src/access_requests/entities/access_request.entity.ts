import { CreateAccessRequestDto } from '../dto/create-access_request.dto';
import { RequestStatus } from '../../../generated/prisma/enums';

export class AccessRequest {
  constructor(CreateAccessRequestDto: CreateAccessRequestDto) {
    this.userId = CreateAccessRequestDto.userId;
    this.toolId = CreateAccessRequestDto.toolId;
    this.businessJustification = CreateAccessRequestDto.businessJustification;
    this.status = CreateAccessRequestDto.status;
    this.requestedAt = CreateAccessRequestDto.requestedAt;
    this.processedAt = CreateAccessRequestDto.processedAt;
    this.processedBy = CreateAccessRequestDto.processedBy;
  }

  id?: number;

  userId: number;

  toolId: number;

  businessJustification: string;

  status?: RequestStatus;

  requestedAt?: Date;

  processedAt?: Date;

  processedBy?: number;

  createdAt?: Date;

  updatedAt?: Date;
}
