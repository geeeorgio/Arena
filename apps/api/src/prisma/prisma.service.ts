import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';

// Import from generated path — not from @prisma/client
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
// Extends PrismaClient so this service IS a Prisma Client
// — callers can do prismaService.user.findMany()
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    // Сonnection string from ConfigService (reads from .env)
    // Safe: validated at startup in validateEnv()
    const connectionString = configService.get<string>('DATABASE_URL')!;

    // PrismaPg is node-postgres driver adapter: bridges Prisma ↔ pg library
    // Must receive an object with connectionString field, not a raw string
    const adapter = new PrismaPg({ connectionString });

    // Pass adapter to PrismaClient base constructor
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
