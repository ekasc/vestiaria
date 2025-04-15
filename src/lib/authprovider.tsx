import { ROLE, User } from "@/models/user";
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
	user: User | null;
	authToken: string | null;
	isAuthenticated: boolean;
	login: (
		email: string,
		password: string,
	) => Promise<{ user: User | null; token: string | null }>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const storedUser = localStorage.getItem("user");
		return storedUser ? JSON.parse(storedUser) : null;
	});

	const [authToken, setAuthToken] = useState<string | null>(() =>
		localStorage.getItem("token"),
	);

	const isAuthenticated = !!authToken;

	const userResponseTest: User = {
		id: 1,
		firstName: "Rahul",
		lastName: "Kumar",
		email: "djnjkdnajs",
		token: "12321:assdjsndkjsandan",
		role: ROLE.Admin,
		password: "",
		createdAt: new Date(),
		updatedAt: new Date(),
		isActive: true,
	};

	useEffect(() => {
		setUser(userResponseTest);
		console.log("in auth provider");
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");
		console.log("storedToken1: ", storedToken);
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setAuthToken(storedToken);
		}
		console.log("storedToken2: ", storedToken);
	}, []);

	async function login(email: string, password: string) {
		//API call to login;

		let userResponse: User = {
			id: 2,
			firstName: "admin",
			lastName: "user",
			email: email,
			token: "xycedjnskdnkjsnd",
			role: ROLE.Admin,
			password,
			isActive: true,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		if (email == "customer") {
			userResponse = {
				id: 1,
				firstName: "Rahul",
				lastName: "Kumar",
				email: email,
				token: "12321:assdjsndkjsandan",
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date(),
				role: ROLE.Customer,
				password,
			};
		}
		// const req = await fetch(
		// 	`${import.meta.env.VITE_API_URL}/api/v1/user/login`,
		// 	{
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		method: "POST",
		// 		body: JSON.stringify(value),
		// 	},
		// );

		// const resp = (await req.json()) as ResponseType;
		// if (!resp.success) {
		// 	console.log(resp.message);
		// 	return;
		// }

		setUser(userResponse);
		setAuthToken(userResponse.token);

		localStorage.setItem("user", JSON.stringify(userResponse));
		localStorage.setItem("token", userResponse.token);

		return { user: userResponse, token: userResponse.token };
	}

	const logout = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("token");
		setUser(null);
		setAuthToken(null);
	};

	const value: AuthContextType = {
		authToken,
		user,
		login,
		logout,
		isAuthenticated,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
