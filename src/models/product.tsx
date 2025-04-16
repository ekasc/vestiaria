export type ProductVariant = {
	_id: string;
	size: string;
	color: string;
	stock: number;
};

export interface ProductType {
	_id: string;
	name: string;
	price: number;
	category: {
		_id: string;
		name: string;
	};
	description: string;
	image?: File;
	variants: ProductVariant[];
	sku: string;
	isActive: boolean;
	discount: number;
	stock: number;
}

export interface ProductResponseType {
	_id: string;
	name: string;
	price: number;
	category: {
		_id: string;
		name: string;
	};
	description: string;
	image?: string;
	variants: ProductVariant[];
	sku: string;
	isActive: boolean;
	discount: number;
	stock: number;
}
