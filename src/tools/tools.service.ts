import { Injectable } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from '../../src/prisma.service';
import { Tool } from '../../generated/prisma/client';
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
