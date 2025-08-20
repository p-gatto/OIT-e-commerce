/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { Product, ProductDocument } from '../../features/products/schemas/product.schema';

import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class SeedService {
    private readonly logger = new Logger(SeedService.name);

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async seedProducts() {

        // Controlla se ci sono già prodotti nel database
        const existingProductsCount = await this.productModel.countDocuments();

        if (existingProductsCount > 0) {
            this.logger.log(`Database already has ${existingProductsCount} products. Skipping seed.`);
            return { message: 'Products already exist', count: existingProductsCount };
        }

        const products: Product[] = [
            {
                name: "Quaderno A4 Righe",
                cost: 3.50,
                image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "paper"
            },
            {
                name: "Penna Blu Bic Cristal",
                cost: 1.20,
                image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "plastic"
            },
            {
                name: "Matita HB Staedtler",
                cost: 0.80,
                image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "wood"
            },
            {
                name: "Evidenziatore Giallo Stabilo",
                cost: 2.10,
                image: "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=1000",
                type: "plastic"
            },
            {
                name: "Blocchetti Post-it Colorati",
                cost: 4.50,
                image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "paper"
            },
            {
                name: "Righello 30cm Trasparente",
                cost: 1.50,
                image: "https://images.pexels.com/photos/6191/creative-desk-pens-school.jpg?auto=compress&cs=tinysrgb&w=1000",
                type: "plastic"
            },
            {
                name: "Gomma Bianca Pelikan",
                cost: 1.00,
                image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "plastic"
            },
            {
                name: "Quaderno A5 Quadretti",
                cost: 2.80,
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "paper"
            },
            {
                name: "Temperamatite Doppio Foro",
                cost: 1.80,
                image: "https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&w=1000",
                type: "plastic"
            },
            {
                name: "Astuccio Portapenne",
                cost: 6.50,
                image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
                type: "plastic"
            }
        ];

        try {
            const insertedProducts = await this.productModel.insertMany(products);
            this.logger.log(`Successfully seeded ${insertedProducts.length} products`);
            return {
                message: 'Products seeded successfully',
                count: insertedProducts.length,
                products: insertedProducts
            };
        } catch (error) {
            this.logger.error('Error seeding products:', error);
            throw error;
        }
    }

    async seedUsers() {

        // Controlla se ci sono già utenti nel database
        const existingUsersCount = await this.userModel.countDocuments();

        if (existingUsersCount > 0) {
            this.logger.log(`Database already has ${existingUsersCount} users. Skipping seed.`);
            return { message: 'Users already exist', count: existingUsersCount };
        }

        try {
            const hashedAdminPassword = await bcrypt.hash('adminPG', 10);
            const hashedDemoPassword = await bcrypt.hash('demo', 10);

            const users = [
                {
                    username: 'admin',
                    password: hashedAdminPassword,
                    displayName: 'Paolo Gatto',
                    role: 'admin'
                },
                {
                    username: 'demo',
                    password: hashedDemoPassword,
                    displayName: 'Demo User',
                    role: 'user'
                }
            ];

            await this.userModel.insertMany(users);
            this.logger.log('Users created successfully: admin/adminPG <==> demo/demo !!!');
            return {
                message: 'Users created successfully!!!',
                count: 2,
                users: ['admin', 'demo'],
                displayNames: ['Paolo Gatto', 'Demo User']
            };
        } catch (error) {
            this.logger.error('Error creating users !!!:', error);
            throw error;
        }

    }
}