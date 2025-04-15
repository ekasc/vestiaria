// Variant model: defines a single combination of size and color, along with stock information.
export type ProductVariant = {
	size: string;
	color: string;
	stock: number; // Available stock for this variant
};

// Main product model: now includes an array of variants.
export interface ProductType {
	id: string;
	name: string;
	price: number;
	category: string;
	description: string;
	image: string;
	variants: ProductVariant[];
	sku: string;
	createdAt: Date;
	updatedAt: Date;
	isActive: boolean;
	rating?: number;
	discount: number;
	stock: number;
}
