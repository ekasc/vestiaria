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
import { ROLE } from "@/models/user";
import {
	Gem,
	Shirt,
	ShoppingBag,
	ShoppingCart,
	SmartphoneCharging,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { AuroraText } from "./aurora-text";
import { Button } from "./button";

interface MenuItem {
	title: string;
	url: string;
	icon: typeof ShoppingBag;
}

export function AppSidebar() {
	const { isAuthenticated, user } = useAuth();
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		console.log(isAuthenticated, user);
		if (isAuthenticated && user?.role == ROLE.Customer) {
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
				{
					title: "Electronics",
					url: "/shop/category/electronics",
					icon: SmartphoneCharging,
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
			];
			setMenuItems(a);
		}
	}, [isAuthenticated, user]);

	return (
		<Sidebar variant="floating">
			<SidebarContent className="">
				<a
					href="/"
					className="text-3xl w-full font-bold tracking-widest px-3 py-2 border-b"
				>
					<AuroraText>Vestiaria</AuroraText>
				</a>
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
