import { CreateUserToolAccessDto } from '../dto/create-user_tool_access.dto';
import { AccessStatus } from '../../../generated/prisma/enums';
export class UserToolAccess {
  constructor(CreateUserToolAccessDto: CreateUserToolAccessDto) {
    this.userId = CreateUserToolAccessDto.userId;
    this.toolId = CreateUserToolAccessDto.toolId;
    this.grantedAt = CreateUserToolAccessDto.grantedAt;
    this.grantedBy = CreateUserToolAccessDto.grantedBy;
    this.revokedAt = CreateUserToolAccessDto.revokedAt;
    this.revokedBy = CreateUserToolAccessDto.revokedBy;
    this.status = CreateUserToolAccessDto.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  userId: number;

  toolId: number;

  grantedAt: Date;

  grantedBy: number;

  revokedAt?: Date;

  revokedBy?: number;

  status: AccessStatus;

  createdAt?: Date;

  updatedAt?: Date;
}
