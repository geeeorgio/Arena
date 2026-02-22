import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

@Module({
  // Register PrismaService so NestJS knows how to instantiate it
  providers: [PrismaService],

  // Export so other modules can inject PrismaService into their own services
  // Without exports — PrismaService is private to this module only
  exports: [PrismaService],
})
export class PrismaModule {}
