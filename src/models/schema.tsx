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


export const ProfileUserInputSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
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
	})
	.required();

export const VariantSchema = z
	.object({
		size: z.string().min(1, "Size is required"),
		color: z.string().min(1, "Color is required"),
		stock: z.number().min(1, "Stock is required"),
	})
	.required();

export const ImageSchema = z
	.instanceof(File, { message: "Please provide an image file." })
	.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
	.refine(
		(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
		"Only .jpg, .jpeg, .png and .webp formats are supported.",
	)
	.optional();

export const ProductSchema = z.object({
	name: z.string().min(1, "Product name is required"),
	price: z.number().min(1, "Price is required"),
	category: z.string().min(1, "Category is required"),
	description: z.string(),
	image: ImageSchema,
	variants: z.array(VariantSchema),
	sku: z.string().min(1, "SKU is required"),
	isActive: z.boolean(),
	discount: z.number().min(1, "Discount is required"),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;

export function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-sm text-destructive dark:text-red-500">
					{field.state.meta.errors
						.map((err) => err.message)
						.join(", ")}
				</em>
			) : (
				<div className="text-transparent text-sm h-fit">
					errors here
				</div>
			)}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}
