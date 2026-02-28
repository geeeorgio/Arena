import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { PublicUserDto } from './dto/public-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Returns all users...
  async findAll(): Promise<PublicUserDto[]> {
    return this.prisma.user.findMany({
      //...without selected fields
      omit: {
        password: true,
        email: true,
        updatedAt: true,
        birthDate: true,
      },
    });
  }

  // Should return logged user if exists
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // Create user
  async create(data: { email: string; username: string; password: string }) {
    return this.prisma.user.create({
      data,
    });
  }
}
