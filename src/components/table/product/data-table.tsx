import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	className?: string;
}

export function ProductDataTable<TData, TValue>({
	columns,
	data,
	className,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});

	return (
		<>
			<div className={cn("", className)}>
				<Table>
					<TableHeader className="">
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className="px-4 border-t"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody className="border-b ">
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((r) => (
								<TableRow
									key={r.id}
									data-state={r.getIsSelected() && "selected"}
								>
									{r.getVisibleCells().map((c) => (
										<TableCell key={c.id} className="px-4">
											{flexRender(
												c.column.columnDef.cell,
												c.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex gap-4 justify-end my-5 mx-4">
				<Button
					className=""
					size="sm"
					disabled={!table.getCanPreviousPage()}
					onClick={() => table.previousPage()}
					variant="outline"
				>
					Previous
				</Button>
				<Button
					disabled={!table.getCanNextPage()}
					onClick={() => table.nextPage()}
					size="sm"
					variant="outline"
					className=""
				>
					Next
				</Button>
			</div>
		</>
	);
}
