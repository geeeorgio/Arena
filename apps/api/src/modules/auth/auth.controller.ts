import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @Post('join')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
