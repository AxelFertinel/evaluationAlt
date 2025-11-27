import { Injectable } from '@nestjs/common';
import { CreateAccessRequestDto } from './dto/create-access_request.dto';
import { UpdateAccessRequestDto } from './dto/update-access_request.dto';
import { PrismaService } from '../../src/prisma.service';
import { AccessRequest } from '../../generated/prisma/client';
@Injectable()
export class AccessRequestsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createAccessRequestDto: CreateAccessRequestDto,
  ): Promise<AccessRequest> {
    return await this.prisma.accessRequest.create({
      data: createAccessRequestDto,
      include: {
        user: true,
        tool: true,
        processedByUser: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.accessRequest.findMany({
      include: {
        user: true,
        tool: true,
        processedByUser: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.accessRequest.findUnique({
      where: { id },
      include: {
        user: true,
        tool: true,
        processedByUser: true,
      },
    });
  }

  async update(id: number, updateAccessRequestDto: UpdateAccessRequestDto) {
    return await this.prisma.accessRequest.update({
      where: { id },
      data: updateAccessRequestDto,
      include: {
        user: true,
        tool: true,
        processedByUser: true,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.accessRequest.delete({
      where: { id },
    });
  }
}
