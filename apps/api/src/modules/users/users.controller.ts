import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { ActiveUserDataType } from '../../common/types/active-user.type';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { OnboardingDto } from './dto/onboarding.dto';
import { PublicUserDto } from './dto/public-user.dto';
import { UsersService } from './users.service';

// Groups all /users endpoints under "users" tag in Swagger UI
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // Tells Swagger what shape this endpoint returns
  @ApiOkResponse({ type: PublicUserDto, isArray: true })
  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  // Completes onboarding: sets birthDate, gender, role
  // Creates UserSettings if user needs cycle tracking
  @UseGuards(JwtGuard)
  @Patch('onboarding')
  async completeOnboarding(
    @CurrentUser() user: ActiveUserDataType,
    @Body() data: OnboardingDto,
  ) {
    return this.userService.completeOnboarding(user.id, data);
  }
}
