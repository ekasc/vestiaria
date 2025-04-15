export type ProductVariant = {
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
