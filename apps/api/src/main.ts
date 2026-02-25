import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { setupSwagger, setupValidationPipe, validateEnv } from './common/setup';

async function bootstrap(): Promise<void> {
  validateEnv(); // crash immediately if env is incomplete

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = Number(configService.get('API_PORT')) || 3001;
  const nodeEnv = configService.get<string>('NODE_ENV');
  const isDevEnv = nodeEnv === 'development';

  // Registers pipes as global pipes
  setupValidationPipe(app, !isDevEnv);

  app.setGlobalPrefix('api');

  // Swagger UI available at /docs => only in development
  if (isDevEnv) {
    setupSwagger(app);
  }

  await app.listen(port);

  console.warn(`API running on port: ${port}`);
}

bootstrap();
