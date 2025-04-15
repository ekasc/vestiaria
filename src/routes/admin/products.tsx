import { columns } from "@/components/table/product/columns";
import { ProductDataTable } from "@/components/table/product/data-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProductAddDialog } from "@/components/ui/product-dialogs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryResponseType, ResponseType, testProduct } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

async function onSubmit(value: string) {
	const req = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/category`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ data: value }),
	});

	if (req.status != 200) {
		console.log(req.statusText);
		return;
	}

	const resp = (await req.json()) as ResponseType;
	console.log(resp.data);
}

export default function ProductDashboard() {
	const [categories, setCategories] = useState<
		CategoryResponseType[] | undefined
	>([]);
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
				return;
			}

			const resp = (await req.json()) as ResponseType;
			console.log(resp.data);
			setCategories(resp.data as CategoryResponseType[]);
		}
		fetchData();
	}, []);

	return (
		<div className="my-2 mr-2 flex w-full flex-col border bg-sidebar overflow-hidden">
			<div className="mb-4 border-b p-4">
				<h1 className="text-3xl font-bold">Products</h1>
			</div>
			<div className="flex items-center justify-end px-4">
				{/* <Sheet> */}
				{/* 	<SheetTrigger asChild> */}
				{/* 		<Button className="flex items-center justify-center border border-blue-600 bg-blue-500 hover:bg-blue-600"> */}
				{/* 			<PlusIcon /> */}
				{/* 			Add */}
				{/* 		</Button> */}
				{/* 	</SheetTrigger> */}
				{/* 	<SheetContent className=""> */}
				{/* 		<ScrollArea className="h-full"> */}
				{/* 			<SheetHeader className="pb-2"> */}
				{/* 				<SheetTitle>Add a product</SheetTitle> */}
				{/* 			</SheetHeader> */}
				{/* 			<ProductAddDialog */}
				{/* 				onSubmit={onSubmit} */}
				{/* 				categories={categories} */}
				{/* 			/> */}
				{/* 		</ScrollArea> */}
				{/* 	</SheetContent> */}
				{/* </Sheet> */}
				<Dialog>
					<DialogTrigger asChild>
						<Button className="flex items-center justify-center border border-blue-600 bg-blue-500 hover:bg-blue-600">
							<PlusIcon />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent className="w-full">
						<DialogHeader>
							<DialogTitle>Add Product</DialogTitle>
						</DialogHeader>
						<ProductAddDialog
							onSubmit={onSubmit}
							categories={categories}
						/>
					</DialogContent>
				</Dialog>
			</div>
			<div className="container mx-auto py-5">
				<ProductDataTable data={testProduct} columns={columns} />
			</div>
		</div>
	);
}
