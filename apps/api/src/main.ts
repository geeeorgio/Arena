import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = Number(configService.get('API_PORT')) || 3001;
  const nodeEnv = configService.get<string>('NODE_ENV');

  app.useGlobalPipes(
    new ValidationPipe({
      // Hide validation error details in production
      disableErrorMessages: nodeEnv === 'production',

      // Strip any fields not declared in the DTO class
      whitelist: true,

      // Throw 400 instead of silently stripping unknown fields
      forbidNonWhitelisted: true,

      // Auto-convert incoming data to expected types
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  // Swagger available only in development
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder().setTitle('Arena API').setVersion('1.0').build();

    const document = SwaggerModule.createDocument(app, config);

    // See swagger UI at /docs
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);

  console.warn(`API running on port: ${port}`);
}

bootstrap();
