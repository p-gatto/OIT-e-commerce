/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeedService } from './seed.service';

import { Product, ProductSchema } from '../../features/products/schemas/product.schema';
import { User, UserSchema } from '../auth/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: User.name, schema: UserSchema }
        ]),
    ],
    providers: [SeedService],
    controllers: [],
    exports: [SeedService]
})
export class SeedModule { }