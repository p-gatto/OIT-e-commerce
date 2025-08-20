/* eslint-disable prettier/prettier */
import { IsArray, ValidateNested, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderUserDto {
    @IsString()
    email: string;

    @IsString()
    address: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    zip: string;
}

export class CartProductDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    cost: number;

    @IsString()
    image: string;

    @IsString()
    type: string;
}

export class CartItemDto {
    @ValidateNested()
    @Type(() => CartProductDto)
    product: CartProductDto;

    @IsNumber()
    qty: number;
}

export class CreateOrderDto {
    @ValidateNested()
    @Type(() => OrderUserDto)
    user: OrderUserDto;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItemDto)
    cart: CartItemDto[];
}