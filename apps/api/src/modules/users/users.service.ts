import { Injectable } from '@nestjs/common';

import { Gender, UserRole } from '../../generated/prisma/enums';
import { PrismaService } from '../../prisma/prisma.service';
import { UserSettingsService } from '../user-settings/user-settings.service';

import { OnboardingDto } from './dto/onboarding.dto';
import { PublicUserDto } from './dto/public-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private settingsService: UserSettingsService,
  ) {}

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

  async completeOnboarding(userId: string, data: OnboardingDto) {
    const dateOfBirth = new Date(data.birthDate);

    // Calculate age by year
    const age = new Date().getFullYear() - dateOfBirth.getFullYear();

    // Under 18 → TEEN regardless of gender;
    // ADULT for single woman
    const role =
      age < 18
        ? UserRole.TEEN
        : data.isParent
          ? UserRole.PARENT
          : UserRole.ADULT;

    // Persist birthDate, gender and computed role
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { birthDate: dateOfBirth, role, gender: data.gender },
      omit: { password: true },
    });

    // Settings are only needed for cycle tracking:
    // — TEEN always tracks cycles
    // — ADULT male (partner/parent) does not need cycle settings
    const needsSettings =
      role === UserRole.TEEN ||
      (role === UserRole.ADULT && data.gender === Gender.FEMALE);

    if (needsSettings) {
      await this.settingsService.create(user.id);
    }

    return user;
  }
}
