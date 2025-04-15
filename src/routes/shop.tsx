import ProductCardGrid from "@/components/ui/product-card";
import { ProductType } from "@/models/product";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Shop() {
	const { category } = useParams();
	useEffect(() => {
		async function getData() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			let req: AxiosResponse<ProductType[], any>;
			if (category) {
				req = await axios.get(
					`${import.meta.env.VITE_API_URL}/${category}`,
				);
				const resp = req.data;
				setProduct(resp);
				return;
			}
			req = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/products`, {
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
			});
			const resp = req.data;
			setProduct(resp);
			console.log(resp);
		}
		getData();
	}, []);

	const [product, setProduct] = useState<ProductType[]>([]);
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

				{product.length < 1 ? (
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
