import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
    ChartColumnStacked,
    Gem,
    PiggyBank,
    Settings,
    Shirt,
    ShoppingBag,
    ShoppingCart,
    User,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuroraText } from "./aurora-text";
import { Button } from "./button";
import { ROLE } from "@/models/user";

interface MenuItem {
	title: string;
	url: string;
	icon: typeof ShoppingBag;
}

export function AppSidebar() {
	const { isAuthenticated, user, login, logout } = useAuth();
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const location = useLocation();
	const { setOpen } = useSidebar();

	useEffect(() => {
		if (
			location.pathname === "/auth/login" ||
			location.pathname === "/auth/signup"
		) {
			setOpen(false);
		} else {
			setOpen(true);
		}
		console.log("isAuthenticated: ", isAuthenticated);
		if (isAuthenticated && user?.role == ROLE.Admin) {
			const a = [
				{
					title: "Admin Home",
					url: "/admin",
					icon: Settings,
				},
				{
					title: "Category",
					url: "/admin/category",
					icon: ChartColumnStacked,
				},
				{
					title: "Products",
					url: "/admin/products",
					icon: Shirt,
				},
				{
					title: "Orders",
					url: "/admin/orders",
					icon: PiggyBank,
				},
				{
					title: "Users",
					url: "/admin/users",
					icon: Users,
				},
			];
			setMenuItems(a);
		} else {
			const a = [
				{
					title: "All",
					url: "/shop",
					icon: ShoppingBag,
				},
				{
					title: "Men",
					url: "/shop/category/men's clothing",
					icon: Shirt,
				},
				{
					title: "Women",
					url: "/shop/category/women's clothing",
					icon: Shirt,
				},
				{
					title: "Accessories",
					url: "/shop/category/jewelery",
					icon: Gem,
				},
			];
			setMenuItems(a);
		}
	}, [isAuthenticated, location.pathname, setOpen, user]);

	return (
		<Sidebar variant="floating">
			<SidebarContent className="">
				<Link
					to="/"
					className="text-3xl w-full font-bold tracking-widest px-3 py-2 border-b bg-background flex items-center text-center"
				>
					<AuroraText>Vestiaria</AuroraText>
				</Link>
				<SidebarGroupLabel>Collections</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{menuItems.map((item) => {
							return (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											{item.title}
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							);
						})}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarContent>
			<SidebarFooter className="border-t">
				{/* -------------test auth-------------- */}
				<div className=" z-[10000] gap-4 flex flex-col m-4">
					<Button onClick={() => login("admin", "testpass")}>
						test login admin
					</Button>
					<Button onClick={() => login("customer", "testpass")}>
						test login customer
					</Button>
					<Button onClick={() => logout()}>test logout</Button>
					<span
						className={
							isAuthenticated
								? "text-green-600 font-black"
								: "text-destructive font-black"
						}
					>
						{isAuthenticated ? "Logged in" : "Logged out"}
					</span>
				</div>
				{/* ----------------test auth end-------------- */}
				<div className="flex justify-between w-full px-3 py-2">
					<Link to="/profile">
						<User className="w-6 h-6" />
					</Link>
					<ShoppingCart />
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}

export function CustomTrigger() {
	const { toggleSidebar } = useSidebar();
	return (
		<Button
			variant="link"
			className="max-md:block hidden"
			onClick={toggleSidebar}
		>
			Menu
		</Button>
	);
}
