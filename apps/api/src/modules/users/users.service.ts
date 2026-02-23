import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { PublicUserDto } from './dto/public-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Returns all users without password field
  async findAll(): Promise<PublicUserDto[]> {
    return this.prisma.user.findMany({
      omit: { password: true, email: true, updatedAt: true },
    });
  }
}
