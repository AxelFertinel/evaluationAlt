import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from '../../src/prisma.service';
import { Department, Tool, ToolStatus } from '../../generated/prisma/client';
import { max, retry } from 'rxjs';
@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  create(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({
      data: createToolDto,
    });
  }

  findAll() {
    return this.prisma.tool.findMany();
  }

  async findWithFilters(
    department?: Department,
    status?: ToolStatus,
    minCost?: number,
    maxCost?: number,
    category?: string,
  ) {
    const where: any = {};

    // si department est défini
    if (department) {
      where.ownerDepartment = department;
    }
    // si department est status défini
    if (status) {
      where.status = status;
    }
    // si minCost et MaxCost sont défini
    if (minCost !== undefined || maxCost !== undefined) {
      where.monthlyCost = {};
      if (minCost !== undefined) {
        where.monthlyCost.gte = minCost;
      }
      if (maxCost !== undefined) {
        where.monthlyCost.lte = maxCost;
      }
    }
    // si category est défini
    if (category) {
      const cat = await this.prisma.category.findUnique({
        where: { name: category },
      });

      if (cat) {
        where.categoryId = cat.id;
      }
    }

    const tools = await this.prisma.tool.findMany({
      where,
    });

    const total = await this.prisma.tool.count();

    const filtersApplied: any = {};
    if (department) filtersApplied.department = department;
    if (status) filtersApplied.status = status;
    if (minCost !== undefined) filtersApplied.min_cost = minCost;
    if (maxCost !== undefined) filtersApplied.max_cost = maxCost;
    if (category) filtersApplied.category = category;

    let message = '';
    if (tools.length === 0) {
      message = 'Aucun résultat';
    }

    return {
      data: tools,
      message,
      total,
      filtered: tools.length,
      filters_applied: filtersApplied,
    };
  }

  findOne(id: number) {
    return this.prisma.tool.findUnique({
      where: { id },
    });
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return this.prisma.tool.update({
      where: { id },
      data: updateToolDto,
    });
  }

  remove(id: number) {
    return this.prisma.tool.delete({
      where: { id },
    });
  }
}
