import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { UpdateUserSettingsDto } from './dto/update.settings.dto';

@Injectable()
export class UserSettingsService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: string) {
    return this.prisma.userSettings.findUnique({
      where: { userId },
    });
  }

  async create(userId: string) {
    return this.prisma.userSettings.create({
      data: { userId },
    });
  }

  async update(userId: string, newSettings: UpdateUserSettingsDto) {
    return this.prisma.userSettings.update({
      where: { userId },
      data: newSettings,
    });
  }
}
