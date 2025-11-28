import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';

@Injectable()
export class AnalitycsService {
  constructor(private prisma: PrismaService) {}

  async findAll(sort_by?: string, order?: 'desc' | 'asc') {
    return `This action returns all analitycs`;
  }
}
