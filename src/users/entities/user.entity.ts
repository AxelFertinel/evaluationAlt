import { CreateUserDto } from '../dto/create-user.dto';
import { Department, Role } from '../../../generated/prisma/enums';

export class User {
  constructor(createUserDto: CreateUserDto) {
    this.email = createUserDto.email;
    this.departement = createUserDto.departement;
    this.role = createUserDto.role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id: number;

  email: string;

  password: string;

  departement: Department;

  role: Role;

  createdAt: Date;

  updatedAt: Date;
}
