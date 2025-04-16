import ProductCardGrid from "@/components/ui/product-card";
import { ProductResponseType } from "@/models/product";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Shop() {
	const [product, setProduct] = useState<ProductResponseType[]>([]);
	const { categoryId } = useParams();

	useEffect(() => {
		async function getData() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let req: Response;
			if (categoryId) {
				req = await fetch(
					`${import.meta.env.VITE_API_URL}/api/v1/products/category/${categoryId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"ngrok-skip-browser-warning": "true",
						},
					},
				);

				const resp = await req.json();
				console.log(resp);
				setProduct(resp.data);
				return;
			}
			req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/products`,
				{
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "true",
					},
					method: "GET",
				},
			);
			const resp = await req.json();
			setProduct(resp.data);
			console.log(resp);
		}
		getData();
	}, []);

	return (
		<>
			<div className="h-full w-full px-1 py-2">
				<div className=" w-full mb-2 flex gap-2">
					<div className="px-3 py-2 leading-9 border w-1/3 whitespace-nowrap bg-sidebar text-sidebar-foreground">
						Shop / All
					</div>
					<div className="px-3 py-2 leading-9 border w-full bg-sidebar text-sidebar-foreground">
						//TODO promotions carousel
					</div>
				</div>

				{product && product.length < 1 ? (
					<div className="">
						<h1 className="text-2xl flex items-center gap-2 text-muted-foreground">
							Loading...
						</h1>
					</div>
				) : (
					<div className=" w-full border h-full">
						<ProductCardGrid product={product} />
					</div>
				)}
			</div>
		</>
	);
}
