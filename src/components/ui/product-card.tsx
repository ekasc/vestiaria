import { Button } from "./button";
import { Link } from "react-router";
import clsx from "clsx";
import { ProductType } from "@/models/product";

export default function ProductCardGrid({
	product,
	className,
}: {
	product: ProductType[];
	className?: string;
}) {
	return (
		<>
			<div className={clsx(className, "grid grid-cols-4 gap-9 p-4")}>
				{product.map((item) => {
					return <ProductCard product={item} key={item._id} />;
				})}
			</div>
		</>
	);
}

export function ProductCard({ product }: { product: ProductType }) {
	return (
		<div className="w-full h-full flex flex-col border bg-sidebar justify-between overflow-hidden dark:hover:border-green-500 hover:border-red-500">
			<div className="overflow-hidden h-full w-full">
				<Link to={`/shop/${product._id}`}>
					<img
						src={product.image?.webkitRelativePath}
						className="object-cover h-full w-full object-center hover:scale-[1.03] transition ease-in-out hover:cursor-pointer"
					/>
				</Link>
			</div>
			<div className="pt-4 flex flex-col gap-5">
				<h1 className="px-2 flex justify-start text-sm">
					{product.name}
				</h1>
				<div className="w-full flex justify-between border-t bg-background h-full products-center">
					<span className=" px-2 py-2">
						{product.price.toLocaleString("en-US", {
							style: "currency",
							currency: "CAD",
							currencyDisplay: "symbol",
							currencySign: "standard",
						})}
					</span>
					<Button
						variant="link"
						className="w-fit h-full px-2 dark:text-green-500 text-red-500"
					>
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	);
}
