import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { StringValue } from 'ms';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      // Makes JwtService available without importing JwtModule elsewhere
      global: true,

      // Tell NestJS to inject ConfigService into the factory function below
      inject: [ConfigService],

      // Factory runs after ConfigService is ready — env variables are guaranteed to be loaded
      useFactory: (config: ConfigService) => {
        // Safe: env variables validated at startup in validateEnv()
        const secret = config.get<string>('JWT_SECRET')!;
        const expiresIn = (config.get<string>('JWT_EXPIRES_IN') ||
          '15m') as StringValue;

        return {
          secret: secret,
          signOptions: {
            expiresIn: expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
