import {
    CategoryData,
    CountryBarChart,
    InventoryAlerts,
    RevenueByCategoryChart,
} from "@/components/ui/admin-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductType } from "@/models/product";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function Admin() {
	const [metrics, setMetrics] = useState({
		users: 0,
		orders: 0,
		revenue: 0,
	});

	const testCountryData = [
		{ country: "US", count: 150 },
		{ country: "CA", count: 80 },
		{ country: "GB", count: 120 },
		{ country: "FR", count: 60 },
		{ country: "DE", count: 100 },
		{ country: "BR", count: 30 },
		{ country: "IN", count: 200 },
		{ country: "CN", count: 180 },
		{ country: "AU", count: 50 },
		{ country: "ZA", count: 40 },
	];
	// Sample revenue by category data
	const [categoryData, setCategoryData] = useState<CategoryData[]>([
		{ label: "Electronics", value: 2000 },
		{ label: "Clothing", value: 1000 },
		{ label: "Home", value: 550 },
	]);

	// Sample products data for inventory alerts (using the updated ProductType model)
	const [products, setProducts] = useState<ProductType[]>([
		{
			id: "1",
			name: "Laptop",
			price: 999,
			category: "Electronics",
			description: "A high performance laptop",
			image: "https://via.placeholder.com/150",
			variants: [
				{ size: "15 inch", color: "silver", stock: 3 },
				{ size: "13 inch", color: "black", stock: 2 },
			],
			sku: "LAP-001",
			createdAt: new Date(),
			updatedAt: new Date(),
			isActive: true,
			rating: 4.5,
			discount: 10,
			stock: 5,
		},
		{
			id: "2",
			name: "Keyboard",
			price: 50,
			category: "Accessories",
			description: "Mechanical keyboard with RGB lighting",
			image: "https://via.placeholder.com/150",
			variants: [{ size: "Standard", color: "black", stock: 20 }],
			sku: "KEY-001",
			createdAt: new Date(),
			updatedAt: new Date(),
			isActive: true,
			rating: 4.2,
			discount: 5,
			stock: 20,
		},
		{
			id: "3",
			name: "Mouse",
			price: 25,
			category: "Accessories",
			description: "Ergonomic mouse",
			image: "https://via.placeholder.com/150",
			variants: [{ size: "Standard", color: "black", stock: 0 }],
			sku: "MOU-001",
			createdAt: new Date(),
			updatedAt: new Date(),
			isActive: true,
			rating: 4.0,
			discount: 0,
			stock: 0,
		},
	]);

	useEffect(() => {
		// Simulated API call for metrics.
		const fetchMetrics = async () => {
			const simulatedMetrics = {
				users: 245,
				orders: 102,
				revenue: 3550,
			};
			setMetrics(simulatedMetrics);
		};

		fetchMetrics();
	}, []);

	return (
		<div className="p-6 w-full">
			<h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

			{/* Key Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ">
				<Card>
					<CardHeader>
						<CardTitle>Number of Users</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{metrics.users}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Number of Orders</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">{metrics.orders}</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Total Revenue</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-2xl font-bold">${metrics.revenue}</p>
					</CardContent>
				</Card>
			</div>

			{/* Metrics Charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
				{/* <Card> */}
				{/* 	<CardHeader> */}
				{/* 		<CardTitle>Store Metrics Chart</CardTitle> */}
				{/* 	</CardHeader> */}
				{/* 	<CardContent> */}
				{/* 		<MetricsBarChart metrics={metrics} /> */}
				{/* 	</CardContent> */}
				{/* </Card> */}
				<Card>
					<CardHeader>
						<CardTitle>Revenue by Category</CardTitle>
					</CardHeader>
					<CardContent>
						<RevenueByCategoryChart data={categoryData} />
					</CardContent>
				</Card>

				{/* User Country Distribution */}
				<Card>
					<CardHeader>
						<CardTitle>
							<h1>Country Frequency Chart</h1>
						</CardTitle>
					</CardHeader>
					<CardContent className="h-[500px] w-full">
						<CountryBarChart data={testCountryData} />
					</CardContent>
				</Card>
			</div>

			{/* Inventory Alerts Section */}
			<div className="mb-8">
				<InventoryAlerts products={products} lowStockThreshold={5} />
			</div>

			{/* Quick Links to other Admin pages */}
			<div className="grid grid-cols-2 gap-4">
				<Link to="/admin/products">
					<Card>
						<CardHeader>
							<CardTitle>Manage Products</CardTitle>
						</CardHeader>
						<CardContent>View and manage all products.</CardContent>
					</Card>
				</Link>
				<Link to="/admin/orders">
					<Card>
						<CardHeader>
							<CardTitle>Manage Orders</CardTitle>
						</CardHeader>
						<CardContent>View and process orders.</CardContent>
					</Card>
				</Link>
			</div>
		</div>
	);
}
