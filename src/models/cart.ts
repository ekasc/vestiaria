import { ProductType } from "./product";

export interface CartType {
	id: string;
	items: CartItem[];
}

export interface CartItem {
	product: ProductType;
	quantity: number;
}
