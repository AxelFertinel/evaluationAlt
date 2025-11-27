import { CreateUserDto } from '../dto/create-user.dto';
import {
  Department,
  UserRole,
  UserStatus,
} from '../../../generated/prisma/enums';

export class User {
  constructor(createUserDto: CreateUserDto) {
    this.email = createUserDto.email;
    this.department = createUserDto.department;
    this.role = createUserDto.role;
    this.status = createUserDto.status;
    this.hireDate = createUserDto.hireDate;
  }

  id?: number;

  email: string;

  department: Department;

  role: UserRole;

  status: UserStatus;

  hireDate?: Date;

  createdAt?: Date;

  updatedAt?: Date;
}
