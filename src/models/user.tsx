export interface User {
	id: number;
	firstName: string;
	lastName: string;
	token: string;
	email: string;
	role: ROLE;
	password: string;

	// Add any additional user fields here
}

export enum ROLE {
	Admin,
	Customer,
}
