import { ProductResponseType } from "./product";

export interface CartItem {
	product: ProductResponseType;
	quantity: number;
	variantId?: string;
}

