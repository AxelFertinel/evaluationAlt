import { Injectable } from '@nestjs/common';
import { CreateUserToolAccessDto } from './dto/create-user_tool_access.dto';
import { UpdateUserToolAccessDto } from './dto/update-user_tool_access.dto';
import { PrismaService } from '../../src/prisma.service';
import { UserToolAccess } from '../../generated/prisma/client';

@Injectable()
export class UserToolAccessService {
  constructor(private prisma: PrismaService) {}

  async create(
    createUserToolAccessDto: CreateUserToolAccessDto,
  ): Promise<UserToolAccess> {
    return await this.prisma.userToolAccess.create({
      data: createUserToolAccessDto,
    });
  }

  findAll() {
    return this.prisma.userToolAccess.findMany();
  }

  findOne(id: number) {
    return this.prisma.userToolAccess.findUnique({ where: { id } });
  }

  update(id: number, updateUserToolAccessDto: UpdateUserToolAccessDto) {
    return this.prisma.userToolAccess.update({
      where: { id },
      data: updateUserToolAccessDto,
    });
  }

  remove(id: number) {
    return this.prisma.userToolAccess.delete({ where: { id } });
  }
}
