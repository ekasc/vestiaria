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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategorySchema } from "@/models/schema";
import { CategoryUpdateDialog } from "@/routes/admin/category";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Ellipsis, PencilIcon, Trash2 } from "lucide-react";
import { z } from "zod";

export const columns: ColumnDef<z.infer<typeof CategorySchema>>[] = [
	{
		accessorKey: "id",
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

export type Category = z.infer<typeof CategorySchema>;

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
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div>
					<Button
						variant="ghost"
						className="flex h-8 w-8 p-0 data-[state=open]:bg-muted border hover:border-black"
					>
						<Ellipsis className="h-4 w-4" />
						<span className="sr-only">Open menu</span>
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[160px]">
				<Dialog>
					<DialogTrigger asChild>
						<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
							Edit
							<PencilIcon className="ml-auto h-4 w-4" />
						</DropdownMenuItem>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle> Edit client </DialogTitle>
							<DialogDescription>
								Make changes to the client here. Click save when
								you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<CategoryUpdateDialog row={row} />
					</DialogContent>
				</Dialog>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							variant="destructive"
							onSelect={(e) => e.preventDefault()}
						>
							Delete
							<Trash2 className="ml-auto h-4 w-4" />
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								Are you absolutely sure?
							</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will
								permanently delete the selected item from the
								database.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
