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
import { toast } from "sonner";
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

function RowActions({ row }: { row: Row<Category> }) {
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
			{/* <AlertDialog>
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
						<AlertDialogAction
							onClick={async () => {
								const req = await fetch(
									`${
										import.meta.env.VITE_API_URL
									}/api/v1/category/${row.getValue("_id")}`,
									{
										method: "DELETE",
										headers: {
											"Content-Type": "application/json",
										},
									}
								);
								const res = await req.json();
								if (res.status == 200) {
									toast("Category deleted successfully");
								} else {
									toast("Failed to delete category");
								}
							}}
						>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog> */}
		</div>
	);
}
