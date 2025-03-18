import { ProductType } from "@/models/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Example product for testing purposes
export const testProduct: ProductType = {
	id: "1",
	title: "Test Jacket",
	price: 120.0,
	category: "Clothing",
	description: "A premium jacket crafted from the finest materials.",
	image: "https://example.com/images/jacket.jpg",
	variants: [
		// Red variants
		{ size: "7", color: "red", stock: 10 },
		{ size: "9", color: "red", stock: 0 }, // Out of stock
		{ size: "10", color: "red", stock: 2 },
		{ size: "11", color: "red", stock: 4 },
		// Blue variants
		{ size: "7", color: "blue", stock: 6 },
		{ size: "8", color: "blue", stock: 0 }, // Out of stock
		{ size: "9", color: "blue", stock: 3 },
		{ size: "11", color: "blue", stock: 5 },
		// Black variants
		{ size: "8", color: "black", stock: 2 },
		{ size: "9", color: "black", stock: 4 },
		{ size: "10", color: "black", stock: 0 }, // Out of stock
		{ size: "11", color: "black", stock: 3 },
		// White variants
		{ size: "7", color: "white", stock: 1 },
		{ size: "8", color: "white", stock: 3 },
		{ size: "9", color: "white", stock: 6 },
		{ size: "10", color: "white", stock: 2 },
		{ size: "11", color: "white", stock: 0 }, // Out of stock
	],
};
