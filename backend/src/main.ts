/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';

import express from 'express';

import { AppModule } from './app.module';

// Create Express server
const server = express();

// Create Nest application
export default async (req: any, res: any) => {
  if (!server.locals.nestApp) {
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
      { logger: false }
    );

    // Enable CORS
    app.enableCors({
      origin: [
        'http://localhost:4200',
        'https://your-frontend-domain.vercel.app' // Sostituisci con il dominio del tuo frontend
      ],
      credentials: true,
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transform: true,
    }));

    // Set global prefix for API routes
    app.setGlobalPrefix('api');

    await app.init();
    server.locals.nestApp = app;
  }

  return server(req, res);
};





async function bootstrap() {
  /* const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000); */

  /* console.log('🔧 DEBUG Environment Variables:');
  console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET ✅' : 'NOT SET ❌');
  console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET ✅' : 'NOT SET ❌'); */

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

/* bootstrap(); */

// Run locally if not in production
if (process.env.NODE_ENV !== 'production') {
  bootstrap();
}