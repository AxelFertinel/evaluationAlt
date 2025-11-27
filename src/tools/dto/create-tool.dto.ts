import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { Department, RequestStatus } from '../../../generated/prisma/enums';
export class CreateToolDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  vendor: string;

  @IsNotEmpty()
  website_url: string;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsNotEmpty()
  @IsNumber()
  monthly_cost: number;

  @IsNotEmpty()
  @IsNumber()
  active_users_count: number;

  @IsNotEmpty()
  @IsEnum(Department)
  owner_department: Department;

  @IsNotEmpty()
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
