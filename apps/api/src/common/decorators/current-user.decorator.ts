import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';

import type { ActiveUserDataType } from '../types/active-user.type';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ActiveUserDataType => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.user as ActiveUserDataType;
  },
);
