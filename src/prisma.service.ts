import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // La varialbe d'environement ne fonctionne pas
    //const databaseUrl = process.env.DATABASE_URL;
    const databaseUrl = 'mysql://dev:dev123@localhost:3306/internal_tools';
    if (!databaseUrl) {
      throw new Error('Environment variable DATABASE_URL must be set');
    }
    const adapter = new PrismaMariaDb(databaseUrl);
    super({ adapter });
  }
}
