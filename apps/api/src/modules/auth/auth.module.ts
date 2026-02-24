import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { StringValue } from 'ms';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      // Makes JwtService available without importing JwtModule elsewhere
      global: true,

      // Tell NestJS to inject ConfigService into the factory function below
      inject: [ConfigService],

      // Factory runs after ConfigService is ready — env variables are guaranteed to be loaded
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET');
        const expiresIn = (config.get<string>('JWT_EXPIRES_IN') ||
          '15m') as StringValue;

        // Fail fast: crash on startup if secret is missing
        // Better to fail now than to run the API without token protection
        if (!secret) {
          throw new Error('.env variable JWT_SECRET is missing!');
        }

        return {
          secret: secret,
          signOptions: {
            // How long the access token is valid
            expiresIn: expiresIn,
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
