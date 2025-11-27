import { CreateToolDto } from '../dto/create-tool.dto';
import { Department, RequestStatus } from '../../../generated/prisma/enums';

export class Tool {
  constructor(CreateToolDto: CreateToolDto) {
    this.name = CreateToolDto.name;
    this.description = CreateToolDto.description;
    this.vendor = CreateToolDto.vendor;
    this.website_url = CreateToolDto.website_url;
    this.category_id = CreateToolDto.category_id;
    this.monthly_cost = CreateToolDto.monthly_cost;
    this.active_users_count = CreateToolDto.active_users_count;
    this.owner_department = CreateToolDto.owner_department;
    this.status = CreateToolDto.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  name: string;

  description: string;

  vendor: string;

  website_url: string;

  category_id: number;

  monthly_cost: number;

  active_users_count: number;

  owner_department: Department;

  status: RequestStatus;

  createdAt?: Date;

  updatedAt?: Date;
}
