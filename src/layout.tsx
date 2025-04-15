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
import Profile  from "./routes/profile";
import Shop from "./routes/shop";
import Cart from "./routes/cart";
import OrdersDashboard from "./routes/admin/orders";
import ProductsDashboard from "./routes/admin/products";
import { CategoryDashboard } from "./routes/admin/category";
import { ROLE } from "./models/user";

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
									<ProtectedRoute requiredRole={ROLE.Admin}>
										<Admin />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/orders"
								element={<OrdersDashboard />}
							/>
							<Route
								path="/admin/category"
								element={
									<ProtectedRoute>
										<CategoryDashboard />
									</ProtectedRoute>
								}
							/>
							<Route
								path="/admin/products"
								element={
									<ProtectedRoute>
										<ProductsDashboard />
									</ProtectedRoute>
								}
							/>
							<Route path="/cart" element={<Cart />} />
						</Routes>
					</SidebarProvider>
				</ThemeProvider>
			</AuthProvider>
		</>
	);
}

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: ROLE;
}

export function ProtectedRoute({
	children,
	requiredRole,
}: ProtectedRouteProps) {
	const { isAuthenticated, user } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace />;
	}

	if (requiredRole && user?.role !== requiredRole) {
		return <Navigate to="/auth/login" replace />;
	}

	return children;
}
