import { FC } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	TooltipProps,
	XAxis,
	YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { ProductType } from "@/models/product";
import {
	NameType,
	ValueType,
} from "recharts/types/component/DefaultTooltipContent";

type Metrics = {
	users: number;
	orders: number;
	revenue: number;
};

interface MetricsBarChartProps {
	metrics: Metrics;
}

const COLORS = [
	"#E6194B",
	"#3CB44B",
	"#FFE119",
	"#4363D8",
	"#F58231",
	"#911EB4",
	"#42D4F4",
	"#F032E6",
	"#BFEF45",
	"#FABED4",
];

export default function MetricsBarChart({ metrics }: MetricsBarChartProps) {
	// Prepare data for the chart
	const data = [
		{ name: "Users", value: metrics.users },
		{ name: "Orders", value: metrics.orders },
		{ name: "Revenue", value: metrics.revenue },
	];

	return (
		<div style={{ width: "100%", height: 300 }}>
			<ResponsiveContainer>
				<BarChart data={data}>
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" name="Count">
						{data.map((_entry, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Bar>
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}

export type CategoryData = {
	label: string;
	value: number;
};

interface RevenueByCategoryChartProps {
	data: Array<CategoryData>;
}

function CustomTooltip({
	active,
	payload,
	label,
}: TooltipProps<ValueType, NameType>) {
	if (active && payload && payload.length) {
		const title: undefined | string =
			label != undefined ? label : payload[0].name;
		return (
			<div className="font-lg border border-dashed border-foreground/50 bg-foreground/60 p-4 text-background shadow-xl backdrop-blur-lg ">
				<p className="">{`${title}: $${payload[0].value}`}</p>
			</div>
		);
	}
	return null;
}

/**
 * RevenueByCategoryChart displays a pie chart where each slice represents
 * revenue for a given category.
 */
export function RevenueByCategoryChart({ data }: RevenueByCategoryChartProps) {
	return (
		<div style={{ width: "100%", height: 500 }}>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						dataKey="value"
						nameKey="label"
						label
						outerRadius={80}
					>
						{data.map((_, index) => (
							<Cell
								key={`cell-${index}`}
								fill={COLORS[index % COLORS.length]}
							/>
						))}
					</Pie>
					<Tooltip content={<CustomTooltip />} />
					<Legend />
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
}
export type Product = {
	id: number;
	name: string;
	stock: number;
};

interface InventoryAlertsProps {
	products: ProductType[];
	lowStockThreshold?: number;
}

/**
 * InventoryAlerts displays a table of products whose stock levels are at or below
 * the specified threshold. If no products are low in stock, a friendly message is shown.
 */
export function InventoryAlerts({
	products,
	lowStockThreshold = 5,
}: InventoryAlertsProps) {
	const lowStockProducts = products.filter(
		(product) => product.stock <= lowStockThreshold,
	);

	if (lowStockProducts.length === 0) {
		return <p>No inventory alerts. All products are well-stocked.</p>;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Inventory Alerts</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Stock</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{lowStockProducts.map((product) => (
							<TableRow key={product.id}>
								<TableCell>{product.title}</TableCell>
								<TableCell>{product.stock}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

interface CountryBarChartProps {
	data: Array<{
		country: string;
		count: number;
	}>;
}

export const CountryBarChart: FC<CountryBarChartProps> = ({ data }) => {
	// Optionally sort descending by count
	const sortedData = [...data].sort((a, b) => b.count - a.count);

	return (
		<ResponsiveContainer width="100%" height={500}>
			<BarChart
				data={sortedData}
				margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="country" />
				<YAxis />
				<Legend />
				<Tooltip content={<CustomTooltip />} />
				{/* "count" is the dataKey we want to plot on the bar. */}
				<Bar dataKey="count">
					{sortedData.map((_entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={COLORS[index % COLORS.length]}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
};
