/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, enum: ['wood', 'plastic', 'paper'] })
    type: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
