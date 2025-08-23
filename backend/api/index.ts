/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

import { VercelRequest, VercelResponse } from '@vercel/node';

let app: any;

export default async (req: VercelRequest, res: VercelResponse) => {
    if (!app) {
        try {
            app = await NestFactory.create(AppModule, {
                logger: ['error', 'warn'],
                cors: true
            });

            app.enableCors({
                origin: [
                    'http://localhost:4200',
                    'https://oit-e-commerce.vercel.app',
                    'https://e-commerce.overitech.it',
                    process.env.FRONTEND_URL
                ],
                credentials: true,
            });

            app.useGlobalPipes(new ValidationPipe({
                whitelist: true,
                transform: true,
            }));

            await app.init();
        } catch (error) {
            console.error('Error creating NestJS app:', error);
            return res.status(500).json({
                error: 'Internal Server Error',
                details: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    try {
        const httpAdapter = app.getHttpAdapter();
        const instance = httpAdapter.getInstance();
        return instance(req, res);
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};