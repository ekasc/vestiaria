import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";

export default function Header() {
	return (
		<header className="flex border-b p-4 gap-5 items-center px-6">
			<div className="w-full">
				<Sheet>
					<SheetTrigger asChild>
						<Button variant="link" className="">
							Menu
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="p-9">
						<SheetHeader className="text-muted-foreground">
							Collections
						</SheetHeader>
						<ul className="flex flex-col space-y-1 my-2">
							<li>
								<a
									className="text-primary underline-offset-4 hover:underline"
									href="/shop"
								>
									All
								</a>
							</li>
							<li>
								<a
									className="text-primary underline-offset-4 hover:underline"
									href="/shop/clothing"
								>
									Clothing
								</a>
							</li>
							<li>
								<a
									className="text-primary underline-offset-4 hover:underline"
									href="shop/footwear"
								>
									Footwear
								</a>
							</li>
							<li>
								<a
									className="text-primary underline-offset-4 hover:underline"
									href="/shop/accessories"
								>
									Accessories
								</a>
							</li>
							<li>
								<a
									className="text-primary underline-offset-4 hover:underline"
									href="/shop/electronics"
								>
									Electronics
								</a>
							</li>
						</ul>
					</SheetContent>
				</Sheet>
			</div>
			<h1 className="text-3xl w-full text-center font-bold tracking-widest">
				VESTIARIA
			</h1>
			<div className="flex gap-4 w-full justify-end">
				<a className="">
					<Button variant="link" className="w-fit">
						Search
					</Button>
				</a>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="link" className="w-fit">
							Account
						</Button>
					</PopoverTrigger>
					<PopoverContent className="flex items-center justify-center flex-col gap-4 p-9 w-fit">
						<h2>You are not logged in</h2>
						<a href="/auth">
							<Button className="w-fit">Login/Sign up</Button>
						</a>
					</PopoverContent>
				</Popover>
				<a className="">
					<Button variant="link" className="w-fit">
						Cart
					</Button>
				</a>
			</div>
		</header>
	);
}
