import { ThemeProvider } from "next-themes";
import { Navigate, Route, Routes } from "react-router";
import App from "./App";
import { AppSidebar, CustomTrigger } from "./components/ui/app-sidebar";
import Product from "./components/ui/product";
import { SidebarProvider } from "./components/ui/sidebar";
import { useAuth } from "./hooks/use-auth";
import { AuthProvider } from "./lib/authprovider";
import { Admin } from "./routes/admin/landing";
import Auth from "./routes/auth";
import { Profile } from "./routes/profile";
import Shop from "./routes/shop";

export default function Layout() {
	return (
		<>
			<AuthProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<SidebarProvider>
						<AppSidebar />
						{/* <SidebarTrigger className="max-md:block hidden" /> */}
						<CustomTrigger />
						{/* <GridPatternDashed /> */}
						<Routes>
							<Route path="/" element={<App />} />
							<Route
								path="/auth/signup"
								element={<Auth type="signup" />}
							/>
							<Route
								path="/auth/login"
								element={<Auth type="login" />}
							/>
							<Route path="/shop" element={<Shop />} />
							<Route
								path="/shop/:productId"
								element={<Product />}
							/>

							<Route
								path="/shop/category/:category"
								element={<Shop />}
							/>
							<Route
								path="/profile"
								element={
									<ProtectedRoute>
										<Profile />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin"
								element={
									<ProtectedRoute>
										<Admin />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</SidebarProvider>
				</ThemeProvider>
			</AuthProvider>
		</>
	);
}

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	return children;
}
