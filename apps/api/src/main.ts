import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);

  const port = configService.get<number>('API_PORT') || 3001;

  await app.listen(port);

  console.warn(`API running on port: ${port}`);
}

bootstrap();
