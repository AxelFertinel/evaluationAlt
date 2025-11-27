import { Injectable } from '@nestjs/common';
import { CreateCostTrackingDto } from './dto/create-cost_tracking.dto';
import { UpdateCostTrackingDto } from './dto/update-cost_tracking.dto';
import { PrismaService } from '../../src/prisma.service';
import { CostTracking } from '../../generated/prisma/client';
@Injectable()
export class CostTrackingService {
  constructor(private prisma: PrismaService) {}

  async create(createCostTrackingDto: CreateCostTrackingDto) {
    return await this.prisma.costTracking.create({
      data: createCostTrackingDto,
    });
  }

  async findAll() {
    return await this.prisma.costTracking.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.costTracking.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateCostTrackingDto: UpdateCostTrackingDto) {
    return this.prisma.costTracking.update({
      where: { id },
      data: updateCostTrackingDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.costTracking.delete({
      where: { id },
    });
  }
}
