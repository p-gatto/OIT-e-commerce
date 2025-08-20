/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { SeedModule } from 'src/core/seed/seed.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]), SeedModule
    ],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule { }
