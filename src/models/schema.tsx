import { z } from "zod";

export const authSchema = z
	.object({
		email: z.string().email("Email is required"),
		password: z.string().min(6, "Password must be at least 6 characters"),
	})
	.required();
