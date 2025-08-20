/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';



@Injectable()
export class OrdersService {

    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) { }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        // Calcola il totale dell'ordine
        const totalAmount = createOrderDto.cart.reduce(
            (total, item) => total + (item.product.cost * item.qty),
            0
        );

        const createdOrder = new this.orderModel({
            ...createOrderDto,
            totalAmount,
        });

        return createdOrder.save();
    }

    async findAll(): Promise<Order[]> {
        return this.orderModel.find().exec();
    }

    async findOne(id: string): Promise<Order | null> {
        return await this.orderModel.findById(id);
    }

}