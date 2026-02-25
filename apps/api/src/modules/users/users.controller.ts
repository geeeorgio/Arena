import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth/guards/jwt.guard';

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
}
