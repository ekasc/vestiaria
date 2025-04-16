import { ResponseType } from "@/lib/utils";
import { ProductResponseType, ProductVariant } from "@/models/product";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { Button } from "./button";

export default function Product() {
	const { productId } = useParams();
	const [searchParams, setSearchParams] = useSearchParams();
	const [product, setProduct] = useState<ProductResponseType | undefined>();
	const [randomProducts, setRandomProducts] = useState<ProductResponseType[]>(
		[],
	);

	useEffect(() => {
		async function getData() {
			const req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/products/${productId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "true",
					},
				},
			);
			const resp = (await req.json()) as ResponseType;

			const allProductsReq = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/products`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"ngrok-skip-browser-warning": "true",
					},
				},
			);

			const allProductsResp =
				(await allProductsReq.json()) as ResponseType;

			if (!resp.success) {
				console.log(resp.message);
				return;
			}
			if (!allProductsResp.success) {
				console.log(allProductsResp.message);
				return;
			}

			const allProducts = allProductsResp.data as ProductResponseType[];

			setProduct(resp.data as ProductResponseType);

			console.log(product);
			const random: ProductResponseType[] = [];
			const count = new Set<number>();
			while (random.length < 3) {
				if (count.size >= allProducts.length) {
					break;
				}
				const x = Math.floor(Math.random() * allProducts.length);
				if (allProducts[x]._id == x.toString()) {
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

	function handleURLParams(key: string, value: string) {
		const newParams = new URLSearchParams();
		newParams.set(key, value);
		setSearchParams(
			(prev) => {
				prev.set(key, value);
				return prev;
			},
			{
				preventScrollReset: true,
			},
		);
	}

	return (
		<div>
			{product == undefined ? (
				<h1>Loading...</h1>
			) : (
				<div className="p- h-full">
					<div className=" flex h-full w-full">
						<div className=" m-2 flex w-2/3  flex-col gap-2">
							<div className="border">
								<img src={product.image} />
							</div>
							<div className="flex flex-col border bg-sidebar px-3 py-2">
								<h1 className="text-sm leading-9">
									You might also like
								</h1>
							</div>
							<div className="grid w-full grid-cols-3 gap-3">
								{randomProducts.map((item) => {
									return (
										<Link
											className="border"
											to={`/shop/${item._id}`}
											key={item._id}
										>
											<img
												src={item.image}
												alt={item.name}
											/>
										</Link>
									);
								})}
							</div>
						</div>
						<div className="m-2 flex w-full flex-col gap-4 border bg-sidebar ">
							<h1 className="border-b p-4 text-lg">
								{product.name}
							</h1>
							<span className="px-4 text-muted-foreground text-md m-0">
								Description
							</span>
							<p className="px-4 pb-4 leading-7 border-b text-sm m-0">
								{product.description}
							</p>
							<VariantSelector
								variants={product.variants}
								searchParams={searchParams}
								handleURLParams={handleURLParams}
							/>

							<div className="flex items-center justify-between border-y p-4">
								<span className="font-bold ">
									{product.price.toLocaleString("en-US", {
										style: "currency",
										currency: "CAD",
										currencyDisplay: "symbol",
										currencySign: "standard",
									})}
								</span>

								<div className="flex items-center justify-between gap-4 ">
									<Button
										className=""
										variant="outline"
										size="lg"
										onClick={() => {
											for (const v of searchParams) {
												console.log(v);
											}
										}}
									>
										Add to cart
									</Button>
									<Button
										className="bg-green-600 hover:bg-green-700 hover:cursor-pointer"
										variant="default"
										size="lg"
									>
										Checkout
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

interface ProductSizesProps {
	variants: ProductVariant[];
	searchParams: URLSearchParams;
	handleURLParams: (key: string, value: string) => void;
}

function VariantSelector({
	variants,
	searchParams,
	handleURLParams,
}: ProductSizesProps) {
	const availableSizes = Array.from(
		new Set(variants.map((v) => v.size.toLowerCase())),
	);

	const availableColors = Array.from(
		new Set(variants.map((v) => v.color.toLowerCase())),
	);

	const selectedSize = searchParams.get("size");
	const selectedColor = searchParams.get("color");

	const isSizeAvailable = (color: string, size: string) => {
		return variants.some(
			(v) =>
				v.color.toLowerCase() === color &&
				v.size.toLowerCase() === size &&
				v.stock > 0,
		);
	};

	const isColorAvailable = (size: string, color: string) => {
		return variants.some(
			(v) =>
				v.size.toLowerCase() === size &&
				v.color.toLowerCase() === color &&
				v.stock > 0,
		);
	};

	return (
		<>
			<span className="px-4 text-muted-foreground ">Color</span>
			<div className="flex gap-2 px-4">
				{availableColors.map((color) => {
					const isDisabled = selectedSize
						? !isColorAvailable(selectedSize, color)
						: false;
					const isActive = selectedColor === color;
					return (
						<Button
							disabled={isDisabled}
							key={color}
							style={{ borderColor: isActive ? color : "" }}
							className="crossed"
							variant="outline"
							size="lg"
							onClick={() => {
								handleURLParams("color", color);
							}}
						>
							{color.toUpperCase()}
						</Button>
					);
				})}
			</div>
			<span className="px-4 text-muted-foreground">Size</span>
			<div className="flex gap-2 px-4">
				{availableSizes.map((size) => {
					const isDisabled = selectedColor
						? !isSizeAvailable(selectedColor, size)
						: false;

					const isActive = selectedSize === size;

					return (
						<Button
							disabled={isDisabled}
							key={size}
							className={
								isActive ? "border-muted-foreground" : "crossed"
							}
							variant="outline"
							size="lg"
							onClick={() => {
								handleURLParams("size", size);
							}}
						>
							{size.toUpperCase()}
						</Button>
					);
				})}
			</div>
		</>
	);
}
