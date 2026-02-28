import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { ActiveUserDataType } from '../../common/types/active-user.type';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { UpdateUserSettingsDto } from './dto/update.settings.dto';
import { UserSettingsService } from './user-settings.service';

@ApiTags('settings')
@Controller('settings')
export class UserSettingsController {
  constructor(private readonly userSettingsService: UserSettingsService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getSettings(@CurrentUser() user: ActiveUserDataType) {
    return this.userSettingsService.findOne(user.id);
  }

  @UseGuards(JwtGuard)
  @Patch()
  async updateSettings(
    @CurrentUser() user: ActiveUserDataType,
    @Body() newSettings: UpdateUserSettingsDto,
  ) {
    return this.userSettingsService.update(user.id, newSettings);
  }
}
