// Variant model: defines a single combination of size and color, along with stock information.
export type ProductVariant = {
	size: string;
	color: string;
	stock: number; // Available stock for this variant
};

// Main product model: now includes an array of variants.
export type ProductType = {
	id: string;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
	variants: ProductVariant[];
};
