import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';

@Module({
  imports: [PrismaModule],
  providers: [UserSettingsService],
  controllers: [UserSettingsController],
  exports: [UserSettingsService],
})
export class UserSettingsModule {}
