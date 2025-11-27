import {
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import {
  UserRole,
  Department,
  UserStatus,
} from '../../../generated/prisma/enums';
import { Type } from 'class-transformer';

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
  @IsEnum(UserRole)
  role: UserRole;

  @IsNotEmpty()
  status: UserStatus;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  hireDate?: Date;
}
