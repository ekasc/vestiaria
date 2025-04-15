import { ProductType } from "@/models/product";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export interface ResponseType {
	success: boolean;
	message: string;
	data: any;
}

export type ProductResponseType = ProductType;

export type CategoryResponseType = {
	image: string;
	name: string;
	__v: number;
	_id: string;
};

// Example product for testing purposes
export const testProduct: ProductType[] = [
	{
		id: "2a009155-57a5-4e5c-ada5-a8018a2ea7bf",
		name: "Classic White T-Shirt",
		price: 156.76,
		category: "Electronics",
		description: "Perfect for everyday use.",
		image: new File(
			["dummy data for Classic White T-Shirt"],
			"Classic White T-Shirt.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "350ml", color: "White", stock: 23 },
			{ size: "350ml", color: "Blue", stock: 33 },
			{ size: "Standard", color: "Green", stock: 30 },
		],
		sku: "SKU-0001",
		createdAt: new Date("2024-12-28"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 4.6,
		discount: 15,
		stock: 86,
	},
	{
		id: "821144b8-90ab-4fb7-99fd-e14dfa845828",
		name: "Wireless Headphones",
		price: 146.26,
		category: "Stationery",
		description: "Perfect for everyday use.",
		image: new File(
			["dummy data for Wireless Headphones"],
			"Wireless Headphones.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "Standard", color: "White", stock: 10 },
			{ size: "XL", color: "Pink", stock: 41 },
		],
		sku: "SKU-0002",
		createdAt: new Date("2024-05-30"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.5,
		discount: 5,
		stock: 51,
	},
	{
		id: "d6f7093d-b062-44cc-b377-700358bbe183",
		name: "Ceramic Coffee Mug",
		price: 157.71,
		category: "Stationery",
		description: "Top rated by users.",
		image: new File(
			["dummy data for Ceramic Coffee Mug"],
			"Ceramic Coffee Mug.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "M", color: "Red", stock: 28 },
			{ size: "Standard", color: "Blue", stock: 15 },
		],
		sku: "SKU-0003",
		createdAt: new Date("2024-08-12"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 4.0,
		discount: 15,
		stock: 43,
	},
	{
		id: "c47d2150-d314-4e4b-9e8c-7e722e2734c2",
		name: "Bluetooth Speaker",
		price: 119.94,
		category: "Travel Accessories",
		description: "Best in class performance.",
		image: new File(
			["dummy data for Bluetooth Speaker"],
			"Bluetooth Speaker.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "350ml", color: "Black", stock: 38 },
			{ size: "Standard", color: "Red", stock: 26 },
		],
		sku: "SKU-0004",
		createdAt: new Date("2024-06-15"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 3.8,
		discount: 15,
		stock: 64,
	},
	{
		id: "32ace5f4-0cd8-48be-b099-1c292a2a6135",
		name: "Gaming Mouse",
		price: 21.48,
		category: "Fitness",
		description: "Eco-friendly and stylish.",
		image: new File(["dummy data for Gaming Mouse"], "Gaming Mouse.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "S", color: "Pink", stock: 9 },
			{ size: "M", color: "Blue", stock: 28 },
			{ size: "L", color: "White", stock: 29 },
		],
		sku: "SKU-0005",
		createdAt: new Date("2024-05-06"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 5.0,
		discount: 20,
		stock: 66,
	},
	{
		id: "2cc4b964-c170-42cf-b155-0f2e21a6715b",
		name: "Laptop Stand",
		price: 64.99,
		category: "Electronics",
		description: "High quality and durable.",
		image: new File(["dummy data for Laptop Stand"], "Laptop Stand.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Black", stock: 20 },
			{ size: "Standard", color: "Gray", stock: 18 },
		],
		sku: "SKU-0006",
		createdAt: new Date("2024-03-21"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.3,
		discount: 10,
		stock: 38,
	},
	{
		id: "7fddf9d1-1387-41c2-877a-c04f607a9282",
		name: "Water Bottle",
		price: 18.75,
		category: "Fitness",
		description: "Eco-friendly and stylish.",
		image: new File(["dummy data for Water Bottle"], "Water Bottle.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "500ml", color: "Blue", stock: 22 },
			{ size: "500ml", color: "Green", stock: 25 },
		],
		sku: "SKU-0007",
		createdAt: new Date("2024-01-10"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.7,
		discount: 5,
		stock: 47,
	},
	{
		id: "f63b4260-9f75-49d4-bf6d-c0f6f2a05877",
		name: "LED Desk Lamp",
		price: 39.99,
		category: "Home & Kitchen",
		description: "Perfect for everyday use.",
		image: new File(["dummy data for LED Desk Lamp"], "LED Desk Lamp.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "White", stock: 12 },
			{ size: "Standard", color: "Black", stock: 10 },
		],
		sku: "SKU-0008",
		createdAt: new Date("2024-07-05"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.4,
		discount: 0,
		stock: 22,
	},
	{
		id: "935f49e4-3f49-4e5b-beb6-947deaa9c460",
		name: "Notebook Set",
		price: 14.25,
		category: "Stationery",
		description: "Top rated by users.",
		image: new File(["dummy data for Notebook Set"], "Notebook Set.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Red", stock: 30 },
			{ size: "Standard", color: "Blue", stock: 25 },
		],
		sku: "SKU-0009",
		createdAt: new Date("2024-02-14"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 3.9,
		discount: 10,
		stock: 55,
	},
	{
		id: "3cc18b98-dc5a-4e6f-bfa9-bf0c28bb306a",
		name: "Portable Charger",
		price: 29.95,
		category: "Electronics",
		description: "Best in class performance.",
		image: new File(
			["dummy data for Portable Charger"],
			"Portable Charger.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "Standard", color: "Black", stock: 20 },
			{ size: "Standard", color: "White", stock: 15 },
		],
		sku: "SKU-0010",
		createdAt: new Date("2024-04-18"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.6,
		discount: 5,
		stock: 35,
	},
	{
		id: "4fcd99fa-f1d4-40cf-a60b-5d15f2cb99c9",
		name: "Backpack",
		price: 49.99,
		category: "Travel Accessories",
		description: "Durable and functional.",
		image: new File(["dummy data for Backpack"], "Backpack.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Black", stock: 10 },
			{ size: "Standard", color: "Gray", stock: 12 },
		],
		sku: "SKU-0011",
		createdAt: new Date("2024-08-01"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.8,
		discount: 10,
		stock: 22,
	},
	{
		id: "bc7e2b62-d1c2-4231-91b3-843b2f6a3177",
		name: "Scented Candle",
		price: 15.0,
		category: "Home & Kitchen",
		description: "Creates a relaxing ambiance.",
		image: new File(
			["dummy data for Scented Candle"],
			"Scented Candle.png",
			{ type: "image/png" },
		),
		variants: [
			{ size: "350ml", color: "White", stock: 8 },
			{ size: "350ml", color: "Pink", stock: 14 },
		],
		sku: "SKU-0012",
		createdAt: new Date("2024-11-12"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 3.7,
		discount: 0,
		stock: 22,
	},
	{
		id: "f89fc9d2-6f24-4c3a-89e7-f0e0b087e4d6",
		name: "Phone Case",
		price: 9.99,
		category: "Electronics",
		description: "Slim and protective design.",
		image: new File(["dummy data for Phone Case"], "Phone Case.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Black", stock: 40 },
			{ size: "Standard", color: "Blue", stock: 35 },
		],
		sku: "SKU-0013",
		createdAt: new Date("2024-06-03"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.2,
		discount: 20,
		stock: 75,
	},
	{
		id: "d35799b2-d4ef-4a88-a755-49bb85fbc753",
		name: "Socks Pack",
		price: 12.99,
		category: "Apparel",
		description: "Comfortable everyday wear.",
		image: new File(["dummy data for Socks Pack"], "Socks Pack.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "M", color: "White", stock: 30 },
			{ size: "L", color: "Black", stock: 20 },
		],
		sku: "SKU-0014",
		createdAt: new Date("2024-09-11"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.1,
		discount: 10,
		stock: 50,
	},
	{
		id: "34b2e6e9-c179-49d9-a0b7-5a3fa19ce1d7",
		name: "Travel Pillow",
		price: 22.49,
		category: "Travel Accessories",
		description: "Perfect for long flights.",
		image: new File(["dummy data for Travel Pillow"], "Travel Pillow.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Blue", stock: 18 },
			{ size: "Standard", color: "Gray", stock: 15 },
		],
		sku: "SKU-0015",
		createdAt: new Date("2024-10-02"),
		updatedAt: new Date("2025-04-09"),
		isActive: false,
		rating: 3.6,
		discount: 5,
		stock: 33,
	},
	{
		id: "2e4f9dcb-d2f7-42fa-8530-60fa75eced6e",
		name: "Yoga Mat",
		price: 34.99,
		category: "Fitness",
		description: "High grip and lightweight.",
		image: new File(["dummy data for Yoga Mat"], "Yoga Mat.png", {
			type: "image/png",
		}),
		variants: [
			{ size: "Standard", color: "Green", stock: 25 },
			{ size: "Standard", color: "Black", stock: 20 },
		],
		sku: "SKU-0016",
		createdAt: new Date("2024-07-20"),
		updatedAt: new Date("2025-04-09"),
		isActive: true,
		rating: 4.9,
		discount: 15,
		stock: 45,
	},
];
interface Exif {
	make: string;
	model: string;
	exposure_time: string;
	aperture: string;
	focal_length: string;
	iso: number;
}

interface Position {
	latitude: number;
	longitude: number;
}

interface Location {
	name: string;
	city: string;
	country: string;
	position: Position;
}

interface Collection {
	id: number;
	title: string;
	published_at: string;
	last_collected_at: string;
	updated_at: string;
	cover_photo: null | any; // Replace `any` with a specific type if known
	user: null | any; // Replace `any` with a specific type if known
}

interface Urls {
	raw: string;
	full: string;
	regular: string;
	small: string;
	thumb: string;
}

interface Links {
	self: string;
	html: string;
	download: string;
	download_location: string;
}

interface UserLinks {
	self: string;
	html: string;
	photos: string;
	likes: string;
	portfolio: string;
}

interface User {
	id: string;
	updated_at: string;
	username: string;
	name: string;
	portfolio_url: string;
	bio: string;
	location: string;
	total_likes: number;
	total_photos: number;
	total_collections: number;
	instagram_username: string;
	twitter_username: string;
	links: UserLinks;
}

export interface PhotoResponse {
	id: string;
	created_at: string;
	updated_at: string;
	width: number;
	height: number;
	color: string;
	blur_hash: string;
	downloads: number;
	likes: number;
	liked_by_user: boolean;
	description: string;
	exif: Exif;
	location: Location;
	current_user_collections: Collection[];
	urls: Urls;
	links: Links;
	user: User;
}
