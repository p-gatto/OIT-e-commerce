/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    cost: number;

    @IsString()
    @IsOptional()
    image?: string;

    @IsEnum(['wood', 'plastic', 'paper'])
    type: string;
}