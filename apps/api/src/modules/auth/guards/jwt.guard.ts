import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Runs JwtStrategy automatically — no logic needed here
@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
