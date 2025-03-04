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
	const [user, setUser] = useState<User | null>(null);
	const [authToken, setAuthToken] = useState<string | null>(null);

	const isAuthenticated = !!authToken;

	const userResponseTest: User = {
		id: 1,
		firstName: "Rahul",
		lastName: "Kumar",
		email: "djnjkdnajs",
		token: "12321:assdjsndkjsandan",
		role: ROLE.Admin,
	};

	useEffect(() => {
		setUser(userResponseTest);
		console.log("in auth provider");
		const storedUser = localStorage.getItem("user");
		const storedToken = localStorage.getItem("token");
		if (storedUser && storedToken) {
			setUser(JSON.parse(storedUser));
			setAuthToken(storedToken);
		}
		console.log(user);
	}, []);

	async function login(email: string, password: string) {
		//API call to login;

		const userResponse: User = {
			id: 1,
			firstName: "Rahul",
			lastName: "Kumar",
			email: email,
			token: "12321:assdjsndkjsandan",
			role: ROLE.Admin,
		};

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
