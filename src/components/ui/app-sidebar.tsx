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
import {
	Gem,
	Shirt,
	ShoppingBag,
	ShoppingCart,
	SmartphoneCharging,
	User,
} from "lucide-react";
import { AuroraText } from "./aurora-text";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Link } from "react-router";

export function AppSidebar() {
	const { toggleSidebar } = useSidebar();

	const menuItems: {
		title: string;
		url: string;
		icon: typeof ShoppingBag;
	}[] = [
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
	return (
		<Sidebar variant="floating">
			<SidebarContent className="">
				<a
					href="/"
					className="text-3xl w-full font-bold tracking-widest px-3 py-2 border-b  "
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
					<Popover>
						<PopoverTrigger>
							<User className="w-6 h-6" />
						</PopoverTrigger>
						<PopoverContent
							side="left"
							className="flex z-[1000]  items-center justify-center flex-col gap-4 p-9 w-fit"
						>
							<h2>You are not logged in</h2>
							<Button
								className="w-fit z-[10000] hover:cursor-pointer pointer-events-auto"
							>
								<Link to="/auth">Login/Sign up</Link>
							</Button>
						</PopoverContent>
					</Popover>
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
