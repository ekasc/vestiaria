import { CartType } from "@/models/cart";

export default function Cart() {
	return <div>Cart</div>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function getCart(): CartType {
	const localCart = localStorage.getItem("cart");
	const cart: CartType = localCart
		? JSON.parse(localCart)
		: { id: "", items: [] };
	return cart;
}
