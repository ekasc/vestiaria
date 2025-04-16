import { ResponseType } from "@/lib/utils";
import { ProductResponseType, ProductVariant } from "@/models/product";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { useAuth } from "@/hooks/use-auth";

export default function Product() {
	const { productId } = useParams();
	const { user } = useAuth();
	const [searchParams, setSearchParams] = useSearchParams();
	const [product, setProduct] = useState<ProductResponseType | undefined>();
	const [randomProducts, setRandomProducts] = useState<ProductResponseType[]>(
		[],
	);
	const [isVisible, setIsVisible] = useState(true);

	const [shippingAddress1, setShippingAddress1] = useState("123 Street Name");
	const [city, setCity] = useState("Vancouver");
	const [zip, setZip] = useState("V5K0A1");
	const [country, setCountry] = useState("Canada");
	const [phone, setPhone] = useState("1234567890");
	const [status, setStatus] = useState("Pending");
	const [userObj, setUserObj] = useState(user.id);

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

	async function handleSubmit() {
		const variant = searchParams.get("variant");
		const req = await fetch(
			`${import.meta.env.VITE_API_URL}/api/v1/orders`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"ngrok-skip-browser-warning": "true",
				},
				body: JSON.stringify({
					orderItems: [
						{
							productId: productId,
							variantId: variant,
							quantity: 1,
						},
					],
					userId: user,
					shippingAddress1,
					city,
					zip,
					country,
					phone,
					status,
				}),
			},
		);
		const resp = await req.json();
		console.log(resp);
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
										onClick={() => {
											setIsVisible(!isVisible);
										}}
										className="bg-green-600 hover:bg-green-700 hover:cursor-pointer text-foreground"
										variant="default"
										size="lg"
									>
										Checkout
									</Button>
								</div>
							</div>

							<div
								className="flex items-center justify-between border-b p-4"
								hidden={isVisible}
							>
								<form
									className="space-y-4 p-4"
									onSubmit={(e) => {
											e.preventDefault();
											handleSubmit()
										}}
								>
									{/* shippingAddress1 */}
									<div className="flex w-full flex-col gap-2">
										<Label className="text-sm font-bold">
											Shipping Address 1
										</Label>
										<Input
											value={shippingAddress1}
											onChange={(e) =>
												setShippingAddress1(
													e.target.value,
												)
											}
											placeholder="Enter shipping address line 1"
										/>
									</div>

									{/* City */}
									<div className="flex w-full flex-col gap-2">
										<Label className="text-sm font-bold">
											City
										</Label>
										<Input
											value={city}
											onChange={(e) =>
												setCity(e.target.value)
											}
											placeholder="Vancouver"
										/>
									</div>

									{/* ZIP/Postal Code */}
									<div className="flex w-full flex-col gap-2">
										<Label className="text-sm font-bold">
											Zip/Postal Code
										</Label>
										<Input
											value={zip}
											onChange={(e) =>
												setZip(e.target.value)
											}
											placeholder="V5K0A1"
										/>
									</div>

									{/* Country */}
									<div className="flex w-full flex-col gap-2">
										<Label className="text-sm font-bold">
											Country
										</Label>
										<Input
											value={country}
											onChange={(e) =>
												setCountry(e.target.value)
											}
											placeholder="Canada"
										/>
									</div>

									{/* Phone */}
									<div className="flex w-full flex-col gap-2">
										<Label className="text-sm font-bold">
											Phone
										</Label>
										<Input
											value={phone}
											onChange={(e) =>
												setPhone(e.target.value)
											}
											placeholder="1234567890"
										/>
									</div>
									<Button type="submit">Submit</Button>
								</form>
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

	function findVariantId(color?: string, size?: string): string | null {
		if (!color || !size) return null; // can't match if either is missing

		const found = variants.find(
			(v) =>
				v.color.toLowerCase() === color.toLowerCase() &&
				v.size.toLowerCase() === size.toLowerCase() &&
				v.stock > 0,
		);
		console.log("found", found);
		return found ? found._id : null;
	}

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
								if (selectedSize) {
									const variantId = findVariantId(
										color,
										selectedSize,
									);
									if (variantId) {
										handleURLParams("variant", variantId);
									} else {
										// Clear out the variant param if no valid match
										handleURLParams("variant", "");
									}
								}
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
								if (selectedColor) {
									const variantId = findVariantId(
										selectedColor,
										size,
									);
									console.log("variantId", variantId);
									if (variantId) {
										handleURLParams("variant", variantId);
									} else {
										handleURLParams("variant", "");
									}
								}
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
