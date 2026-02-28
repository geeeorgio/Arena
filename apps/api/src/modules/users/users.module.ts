import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { UserSettingsModule } from '../user-settings/user-settings.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, UserSettingsModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
