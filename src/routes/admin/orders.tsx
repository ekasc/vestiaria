import { useState } from "react";

export default function OrdersDashboard() {
	const [orders, setOrders] = useState<Order[]>([]);
	useEffect(() => {
		async function fetchData() {
			const req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/orders`,
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
			const data = resp.data as Order[];
			console.log(data);
			setOrders(data);
		}
		fetchData();
	}, []);

	return (
		<div className="my-2 mr-2 flex w-full flex-col border bg-sidebar">
			<div className="mb-4 border-b p-4">
				<h1 className="text-3xl font-bold">Category</h1>
			</div>
			<div className="container mx-auto py-5 ">
				<OrdersDataTable data={orders} columns={columns} />
			</div>
		</div>
	);
}
