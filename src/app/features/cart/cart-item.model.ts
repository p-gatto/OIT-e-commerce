import { Product } from "../../core/products/product.model";

export type CartItem = {
    product: Product;
    qty: number;
}