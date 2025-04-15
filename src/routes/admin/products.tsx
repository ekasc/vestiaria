import { columns } from "@/components/table/product/columns";
import { ProductDataTable } from "@/components/table/product/data-table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ProductAddDialog } from "@/components/ui/product-dialogs";
import {
    CategoryResponseType,
    ProductResponseType,
    ResponseType,
} from "@/lib/utils";
import { ProductType } from "@/models/product";
import { ProductSchemaType } from "@/models/schema";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";

async function onSubmit(value: ProductSchemaType) {
	const formData = new FormData();

	formData.append("name", value.name);
	formData.append("image", value.image as Blob);
	formData.append("sku", value.sku);
	formData.append("isActive", String(value.isActive));
	formData.append("discount", value.discount.toString());
	formData.append("price", value.price.toString());
	formData.append("category", value.category);

	formData.append("variants", JSON.stringify(value.variants));

	const req = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
		method: "POST",
		body: formData,
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

	const [products, setProducts] = useState<ProductType[]>([]);

	useEffect(() => {
		async function fetchData() {
			const productReq = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/products`,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "true",
					},
					method: "GET",
				},
			);

			if (productReq.status != 200) {
				console.log(productReq.statusText);
				return;
			}

			const productResp = (await productReq.json()) as ResponseType;
			console.log("products: ", productResp.data);
			setProducts(productResp.data as ProductResponseType[]);

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
				<ProductDataTable data={products} columns={columns} />
			</div>
		</div>
	);
}
