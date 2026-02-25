import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET');

    super({
      // Take token from Authorization: Bearer <token> header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Reject expired tokens
      ignoreExpiration: false,

      // Same secret used to sign tokens in JwtModule
      secretOrKey: secret!,
    });
  }

  // Called automatically after Passport verifies the token
  // payload = decoded token contents: { sub: userId, email }
  async validate(payload: { sub: string; email: string }) {
    // This return value becomes request.user in controllers
    return { id: payload.sub, email: payload.email };
  }
}
