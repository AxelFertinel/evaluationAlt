import { CreateUserDto } from '../dto/create-user.dto';
import { Department, Role } from '../../../generated/prisma/enums';

export class User {
  constructor(createUserDto: CreateUserDto) {
    this.email = createUserDto.email;
    this.department = createUserDto.department;
    this.role = createUserDto.role;
  }

  id?: number;

  email: string;

  password: string;

  department: Department;

  role: Role;

  createdAt?: Date;

  updatedAt?: Date;
}
