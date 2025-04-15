import { z } from "zod";
import { UserInputSchema } from "./schema";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	token: string;
	email: string;
	role: ROLE;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	image: string;
	isActive: boolean;
}

export interface UserHashed extends User {
	passwordHash: string;
}

export enum ROLE {
	Admin = "Admin",
	Customer = "Customer",
}

export type UserInput = z.infer<typeof UserInputSchema>;
