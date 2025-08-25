/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ _id: false })
export class OrderUser {

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    zip: string;
}

@Schema({ _id: false })
export class CartProduct {

    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    cost: number;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    type: string;
}

@Schema({ _id: false })
export class CartItem {

    @Prop({ type: CartProduct, required: true })
    product: CartProduct;

    @Prop({ required: true })
    qty: number;
}

@Schema({ timestamps: true })
export class Order {

    @Prop({ type: OrderUser, required: true })
    user: OrderUser;

    @Prop({ type: [CartItem], required: true })
    cart: CartItem[];

    @Prop({ default: 'pending' })
    status: string;

    @Prop()
    totalAmount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);