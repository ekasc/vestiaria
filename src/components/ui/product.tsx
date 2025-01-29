import { ProductType } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function Product() {
	const { productId } = useParams();
	const [product, setProduct] = useState<ProductType | undefined>();
	// const [uImg, setUImg] = useState<PhotoResponse>();
	const [randomProducts, setRandomProducts] = useState<ProductType[]>([]);
	useEffect(() => {
		async function getData() {
			const req = await axios.get(
				`https://fakestoreapi.com/products/${productId}`,
			);
			const resp = (await req.data) as ProductType;
			const allProducts = await axios
				.get<
					ProductType[]
				>(`https://fakestoreapi.com/products/category/${resp.category}?limit=9`)
				.then((i) => {
					return i.data;
				});
			// const uReq = await axios.get("https://api.unsplash.com/photos/random", {
			// 	headers: {
			// 		Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
			// 	},
			// });
			// const uResp = (await uReq.data) as PhotoResponse;
			// setUImg(uResp)
			setProduct(resp);
			const random: ProductType[] = [];
			const count = new Set<number>();
			while (random.length < 3) {
				if (count.size >= allProducts.length) {
					break;
				}
				const x = Math.floor(Math.random() * allProducts.length);
				if (allProducts[x].id == x.toString()) {
					break;
				}
				if (!count.has(x)) {
					count.add(x);
					random.push(allProducts[x]);
				}
			}
			setRandomProducts(random);
		}
		getData();
	}, [productId]);

	return (
		<div>
			{product == undefined ? (
				<h1>Loading...</h1>
			) : (
				<div className="p- h-full">
					<div className=" w-full flex h-full">
						<div className=" w-2/3 flex m-2  flex-col gap-2">
							<div className="h">
								<img src={product.image} />
							</div>
							<div className="border px-3 py-2 bg-sidebar flex flex-col">
								<h1 className="text-xl leading-9">
									You might also like
								</h1>
							</div>
							<div className="grid grid-cols-3 w-full gap-3">
								{randomProducts.map((item) => {
									return (
										<Link
											to={`/shop/${item.id}`}
											key={item.id}
										>
											<img
												src={item.image}
												alt={item.title}
											/>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="border w-full flex m-2 bg-sidebar flex-col gap-4 ">
							<h1 className="text-2xl border-b p-2">
								{product.title}
							</h1>
							<p className="p-2 leading-7">
								{product.description}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
