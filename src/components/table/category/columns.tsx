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
import { CategorySchema } from "@/models/schema";
import { CategoryUpdateDialog } from "@/routes/admin/category";
import { ColumnDef, Row } from "@tanstack/react-table";
import { PencilIcon, Trash2 } from "lucide-react";
import { z } from "zod";

export type Category = {
	_id: string;
	name: string;
	createdAt: Date;
	updatedAt: Date;
};

export const columns: ColumnDef<Category>[] = [
	{
		accessorKey: "_id",
		header: () => null,
		cell: (info) => Number(info.row.id) + 1,
	},
	{
		accessorKey: "name",
		header: () => <div className="font-bold">Name</div>,
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
		id: "actions",
		cell: ({ row }) => {
			return <RowActions row={row} />;
		},
	},
];

export type CategorySchema = z.infer<typeof CategorySchema>;

export const categories: Category[] = [
	{
		name: "Electronics",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Clothing", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Home", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Books", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Toys", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Sports", createdAt: new Date(), updatedAt: new Date() },
	{ name: "Beauty", createdAt: new Date(), updatedAt: new Date() },
];

function RowActions({ row }: { row: Row<Category> }) {
	function handleEdit() {
		const id = row.getValue("_id");
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
					<CategoryUpdateDialog row={row} />
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
