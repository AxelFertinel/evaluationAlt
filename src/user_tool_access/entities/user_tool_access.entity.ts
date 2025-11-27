import { CreateUserToolAccessDto } from '../dto/create-user_tool_access.dto';
import { AccessStatus } from '../../../generated/prisma/enums';
export class UserToolAccess {
  constructor(CreateUserToolAccessDto: CreateUserToolAccessDto) {
    this.user_id = CreateUserToolAccessDto.user_id;
    this.tool_id = CreateUserToolAccessDto.tool_id;
    this.granted_at = CreateUserToolAccessDto.granted_at;
    this.granted_by = CreateUserToolAccessDto.granted_by;
    this.revoked_at = CreateUserToolAccessDto.revoked_at;
    this.revoked_by = CreateUserToolAccessDto.revoked_by;
    this.status = CreateUserToolAccessDto.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  user_id: number;

  tool_id: number;

  granted_at: Date;

  granted_by: number;

  revoked_at: Date;

  revoked_by: number;

  status: AccessStatus;

  createdAt?: Date;

  updatedAt?: Date;
}
