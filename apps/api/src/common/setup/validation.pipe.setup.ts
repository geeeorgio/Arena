import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

export function setupValidationPipe(
  app: INestApplication,
  disableVerboseMessages: boolean,
): void {
  app.useGlobalPipes(
    new ValidationPipe({
      // Hide validation error details in production
      disableErrorMessages: disableVerboseMessages,

      // Strip any fields not declared in the DTO class
      whitelist: true,

      // Throw 400 instead of silently stripping unknown fields
      forbidNonWhitelisted: true,

      // Auto-convert incoming data to expected types
      transform: true,
    }),
  );
}
