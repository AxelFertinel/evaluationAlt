import {
  IsNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Department, ToolStatus } from '../../../generated/prisma/enums';
export class CreateToolDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  vendor?: string;

  @IsString()
  @IsOptional()
  websiteUrl?: string;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;

  @IsNotEmpty()
  @IsInt()
  monthlyCost: number;

  @IsNotEmpty()
  @IsInt()
  activeUsersCount: number;

  @IsNotEmpty()
  @IsEnum(Department)
  ownerDepartment: Department;

  @IsNotEmpty()
  @IsEnum(ToolStatus)
  status: ToolStatus;
}
