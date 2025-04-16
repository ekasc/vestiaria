// localCart.ts
import { CartItem } from "@/models/cart";
import { ProductResponseType } from "@/models/product";

export function addToCart(
	product: ProductResponseType,
	variantId?: string,
	quantity: number = 1,
): void {
	let cart: CartItem[] = [];
	const storedCart = localStorage.getItem("cart");
	if (storedCart) {
		try {
			cart = JSON.parse(storedCart);
		} catch (error) {
			cart = [];
		}
	}

	const index = cart.findIndex(
		(item) =>
			item.product._id === product._id && item.variantId === variantId,
	);

	if (index !== -1) {
		cart[index].quantity += quantity;
	} else {
		cart.push({ product, quantity, variantId });
	}

	localStorage.setItem("cart", JSON.stringify(cart));
}
