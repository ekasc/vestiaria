import { AnyFieldApi } from "@tanstack/react-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];

export const LoginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(1, "Password is required"),
});

export const RoleEnum = z.enum(["Admin", "Customer"]);

export const UserInputSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters"),
	confirmPassword: z
		.string()
		.min(8, "Password must be at least 8 characters"),
	token: z.string().optional(),
	isActive: z.boolean().optional(),
});

export const authSchema = z
	.object({
		email: z.string().email("Email is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	})
	.required();

export const CategorySchema = z
	.object({
		name: z.string().min(1, "Category name is required"),
		createdAt: z.date(),
		updatedAt: z.date(),
	})
	.required();

export const VariantSchema = z
	.object({
		size: z.string().min(1, "Size is required"),
		color: z.string().min(1, "Color is required"),
		stock: z.number().min(1, "Stock is required"),
	})
	.required();

export const ProductSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	price: z.number().min(1, "Price is required"),
	category: z.string().min(1, "Category is required"),
	description: z.string().min(1, "Description is required"),
	image: z.string().min(1, "Image is required"),
	variants: z.array(VariantSchema).min(1, "At least one variant is required"),
	sku: z.string().min(1, "SKU is required"),
	createdAt: z.date(),
	updatedAt: z.date(),
	isActive: z.boolean(),
	rating: z.number().optional(),
	discount: z.number().min(1, "Discount is required"),
	stock: z.number().min(1, "Stock is required"),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;

export function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-sm text-destructive">
					{field.state.meta.errors
						.map((err) => err.message)
						.join(",")}
				</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}
