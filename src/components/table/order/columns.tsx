import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ProductUpdateDialog } from "@/components/ui/product-dialogs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductType } from "@/models/product";
import { ProductSchema } from "@/models/schema";
import { ColumnDef, Row } from "@tanstack/react-table";
import { PencilIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const columns: ColumnDef<ProductType>[] = [
	{
		accessorKey: "_id",
		header: () => null,
		cell: (info) => Number(info.row.id) + 1,
	},
	{
		accessorKey: "name",
		header: () => <div className="font-bold">Name</div>,
		cell: ({ row }) => (
			<>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<div className="font-medium">
								{row.getValue("name")}
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<a
								target="_blank"
								href={row.original.image?.webkitRelativePath}
							>
								<img
									src={row.original.image?.webkitRelativePath}
									alt={row.original.name}
								/>
							</a>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</>
		),
	},
	{
		accessorKey: "price",
		header: () => <div className="font-bold">Price</div>,
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("price"));
			const formatted = new Intl.NumberFormat("en-US", {
				style: "currency",
				currency: "CAD",
			}).format(amount);
			return <div className="text-right font-medium">{formatted}</div>;
		},
	},
	{
		accessorKey: "category",
		header: () => <div className="font-bold">Category</div>,
		cell: ({ row }) => {
			console.log(row);
			return (
				<div className="flex items-center">
					<div className="font-medium">
						{row.getValue("category")}
					</div>
				</div>
			);
		},
	},
	{
		accessorKey: "description",
		header: () => <div className="font-bold">Description</div>,
	},
	{
		accessorKey: "variants",
		header: () => <div className="font-bold">Variants</div>,
		cell: ({ row }) => {
			return <>{row.original.variants.length} variants</>;
		},
	},
	{
		accessorKey: "sku",
		header: () => <div className="font-bold">SKU</div>,
	},
	{
		accessorKey: "createdAt",
		header: () => <div className="font-bold">Created At</div>,
		cell: ({ row }) => {
			if (row.getValue("createdAt") == null)
				return <div>Not Available</div>;
			const time: Date = new Date(row.getValue("createdAt"));
			const formatted = new Intl.DateTimeFormat("en-IN", {
				hour: "2-digit",
				minute: "2-digit",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}).format(time);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "updatedAt",
		header: () => <div className="font-bold">Updated At</div>,
		cell: ({ row }) => {
			if (row.getValue("updatedAt") == null)
				return <div>Not Available</div>;
			const time: Date = new Date(row.getValue("updatedAt"));
			const formatted = new Intl.DateTimeFormat("en-IN", {
				hour: "2-digit",
				minute: "2-digit",
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}).format(time);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "isActive",
		header: () => <div className="font-bold">Active</div>,
	},
	{
		accessorKey: "rating",
		header: () => <div className="font-bold">Rating</div>,
	},
	{
		accessorKey: "discount",
		header: () => <div className="font-bold">Discount</div>,
	},
	{
		accessorKey: "stock",
		header: () => <div className="font-bold">Stock</div>,
	},
	{
		id: "actions",
		cell: ({ row }) => {
			return <RowActions row={row} />;
		},
	},
];

export type Product = z.infer<typeof ProductSchema>;

function RowActions({ row }: { row: Row<ProductType> }) {
	async function deleteProduct() {
		const req = await fetch(
			`${import.meta.env.VITE_API_URL}/api/v1/products/${row.getValue("_id")}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const res = await req.json();
		if (res.status == 200) {
			toast("Product deleted successfully");
		} else {
			toast("Failed to delete product");
		}
	}

	return (
		<div className="flex items-center space-x-2">
			<Dialog>
				<DialogTrigger asChild>
					<Button>
						<PencilIcon className="ml-auto h-4 w-4" />
					</Button>
				</DialogTrigger>
				<DialogContent className="">
					<DialogHeader>
						<DialogTitle> Edit category </DialogTitle>
						<DialogDescription>
							Make changes to the category here. Click save when
							you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<ProductUpdateDialog row={row} />
				</DialogContent>
			</Dialog>
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button variant="destructive">
						<Trash2 className="ml-auto h-4 w-4" />
					</Button>
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete the selected item from the database.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction onClick={() => {}}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
