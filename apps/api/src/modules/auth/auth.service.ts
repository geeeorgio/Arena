import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // Check mistakes in password
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    // Check if user already exists
    const isUser = await this.usersService.findOneByEmail(data.email);

    if (isUser) {
      throw new ConflictException('User with this email already exists');
    }

    // If it's new user - hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Save user with hashed password
    const newUser = await this.usersService.create({
      email: data.email,
      username: data.username,
      password: hashedPassword,
    });

    // Return token for automatic login
    return await this.generateJwt(newUser.id, newUser.email);
  }

  async signIn(data: LoginDto) {
    // Find user by email
    const user = await this.usersService.findOneByEmail(data.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if input password matches one in database
    const isPassword = await bcrypt.compare(data.password, user.password);

    if (!isPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Return access token
    return await this.generateJwt(user.id, user.email);
  }

  // Private: only used internally by register() and signIn()
  private async generateJwt(userId: string, email: string) {
    // Payload is the data stored inside the token
    // sub (subject) = standard JWT field for user identifier
    const payload = { sub: userId, email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
