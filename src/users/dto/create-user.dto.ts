import { IsNotEmpty, IsEmail, IsEnum, IsDate } from 'class-validator';
import { Role, Department, Status } from '../../../generated/prisma/enums';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Department)
  department: Department;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  status: Status;

  @IsNotEmpty()
  @IsDate()
  hire_date: Date;
}
