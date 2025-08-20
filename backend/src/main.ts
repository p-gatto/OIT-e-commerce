/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  /* const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); */

  const app = await NestFactory.create(AppModule);

  // Abilita CORS per comunicazione con Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // Validazione globale
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3001);
}

bootstrap();