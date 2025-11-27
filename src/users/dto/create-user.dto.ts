import { IsNotEmpty, IsEmail, IsEnum, IsDate } from 'class-validator';
import { Role, Department } from '../../../generated/prisma/enums';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(Department)
  departement: Department;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;

  @IsNotEmpty()
  status: boolean;

  @IsNotEmpty()
  @IsDate()
  hire_date: Date;
}
