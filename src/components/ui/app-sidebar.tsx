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
import { ResponseType } from "@/lib/utils";
import { ROLE } from "@/models/user";
import {
	Asterisk,
	ChartColumnStacked,
	LogOut,
	Settings,
	Shirt,
	ShoppingBag,
	ShoppingCart,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { toast } from "sonner";
import { Category } from "../table/category/columns";
import { AuroraText } from "./aurora-text";
import { Button } from "./button";

interface MenuItem {
	title: string;
	url: string;
	icon: typeof ShoppingBag;
}

export function AppSidebar() {
	const { isAuthenticated, user, logout, authToken } = useAuth();
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
	const location = useLocation();
	const { setOpen } = useSidebar();
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		async function fetchData() {
			const req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/category`,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "true",
					},
					method: "GET",
				},
			);

			if (req.status != 200) {
				console.log(req.statusText);
				toast(`Something went wrong: ${req.statusText}`, {
					duration: 3000,
				});
				return;
			}

			const resp = (await req.json()) as ResponseType;
			if (!resp.success) {
				toast("Something went wrong", { duration: 3000 });
				return;
			}
			const data = resp.data as Category[];
			setCategories(data);
		}
		fetchData();

		if (
			location.pathname === "/auth/login" ||
			location.pathname === "/auth/signup"
		) {
			setOpen(false);
		} else {
			setOpen(true);
		}

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
			];
			setMenuItems(a);
		} else {
			let a: MenuItem[] = [];
			categories.forEach((category) => {
				a.push({
					title: category.name,
					url: `/shop/category/${category._id}`,
					icon: Asterisk,
				});
			});
			setMenuItems(a);
		}
	}, [isAuthenticated, location.pathname, setOpen, user, categories.length]);

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
				{/* <div className=" z-[10000] gap-4 flex flex-col m-4">
					<Button onClick={() => login("admin", "testpass")}>
						test login admin
					</Button>
					<Button onClick={() => login("customer", "testpass")}>
						test login customer
					</Button>
					
				</div> */}
				{/* ----------------test auth end-------------- */}

				<div className="flex justify-between w-full px-3 py-2">
					<Link to="/profile">
						<User className="w-6 h-6" />
					</Link>
					<ShoppingCart />
				</div>

				{authToken ? (
					<Button onClick={() => logout()}>
						<LogOut />
					</Button>
				) : (
					<></>
				)}
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
