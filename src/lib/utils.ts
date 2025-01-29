import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type ProductType = {
	id: string;
	title: string;
	price: number;
	// category: Clothing | Footwear | Accessories | Electronics;
	category: string;
	description: string;
	image: string;
};

type Clothing = {
	size: string;
	color: string;
	gender: string;
};

type Footwear = Clothing;

type Accessories = {
	size: string;
	color: string;
	type: string;
};

type Electronics = {
	type: string;
	color: string;
};

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
