/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { Product, ProductDocument } from '../../features/products/schemas/product.schema';

import { User, UserDocument } from '../auth/schemas/user.schema';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async seedProducts() {
        const products = [
            {
                name: "GitHub #1",
                cost: 3,
                image: "https://res.cloudinary.com/my-notes-demo/image/upload/v1712149831/tutorial-content/video-corsi/ngrx/image-keychains/github-2.jpg",
                type: "wood"
            },
            {
                name: "Angular #1",
                cost: 3,
                image: "https://res.cloudinary.com/my-notes-demo/image/upload/v1712149827/tutorial-content/video-corsi/ngrx/image-keychains/angular-1.jpg",
                type: "wood"
            },
            // ... altri prodotti dal tuo db.json
        ];

        await this.productModel.deleteMany({});
        await this.productModel.insertMany(products);
        console.log('Products seeded successfully');
    }

    async seedUsers() {
        const hashedPassword = await bcrypt.hash('admin', 10);
        const admin = {
            username: 'admin',
            password: hashedPassword,
            displayName: 'Fabio Biondi',
            role: 'admin'
        };

        await this.userModel.deleteMany({});
        await this.userModel.create(admin);
        console.log('Admin user created: admin/admin');
    }
}