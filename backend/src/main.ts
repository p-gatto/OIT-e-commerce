/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {

  /* const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); */

  /* console.log('🔧 DEBUG Environment Variables:');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET ✅' : 'NOT SET ❌');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET ✅' : 'NOT SET ❌'); */

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'https://oit-e-commerce.vercel.app'
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const port = process.env.PORT || 3001;
  await app.listen(port);
}

bootstrap();