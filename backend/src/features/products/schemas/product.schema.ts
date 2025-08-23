/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
    timestamps: true,
    toJSON: {
        transform: function (doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
})
export class Product {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true, enum: ['wood', 'plastic', 'paper', 'fruit', 'vegetable', 'herbs'] })
    type: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
