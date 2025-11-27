import { CreateToolDto } from '../dto/create-tool.dto';
import { Department, ToolStatus } from '../../../generated/prisma/enums';

export class Tool {
  constructor(CreateToolDto: CreateToolDto) {
    this.name = CreateToolDto.name;
    this.description = CreateToolDto.description;
    this.vendor = CreateToolDto.vendor;
    this.websiteUrl = CreateToolDto.websiteUrl;
    this.categoryId = CreateToolDto.categoryId;
    this.monthlyCost = CreateToolDto.monthlyCost;
    this.activeUsersCount = CreateToolDto.activeUsersCount;
    this.ownerDepartment = CreateToolDto.ownerDepartment;
    this.status = CreateToolDto.status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  id?: number;

  name: string;

  description?: string;

  vendor?: string;

  websiteUrl?: string;

  categoryId: number;

  monthlyCost: number;

  activeUsersCount: number;

  ownerDepartment: Department;

  status: ToolStatus;

  createdAt?: Date;

  updatedAt?: Date;
}
