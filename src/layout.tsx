import { ThemeProvider } from "next-themes";
import { Route, Routes } from "react-router";
import App from "./App";
import { AppSidebar, CustomTrigger } from "./components/ui/app-sidebar";
import Product from "./components/ui/product";
import { SidebarProvider } from "./components/ui/sidebar";
import Auth from "./routes/auth";
import Shop from "./routes/shop";

export default function Layout() {
	return (
		<>
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
						<Route path="/auth" element={<Auth />} />
						<Route path="/shop" element={<Shop />} />
						<Route path="/shop/:productId" element={<Product />} />
						<Route
							path="/shop/category/:category"
							element={<Shop />}
						/>
					</Routes>
				</SidebarProvider>
			</ThemeProvider>
		</>
	);
}
