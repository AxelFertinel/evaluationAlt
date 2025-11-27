import { IsNotEmpty, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Department, ToolStatus } from '../../../generated/prisma/enums';
export class CreateToolDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  vendor: string;

  @IsOptional()
  websiteUrl: string;

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
