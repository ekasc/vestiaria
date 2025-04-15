import {
	categories,
	Category,
	columns,
} from "@/components/table/category/columns";
import { CategoryDataTable } from "@/components/table/category/data-table";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, ResponseType } from "@/lib/utils";
import { CategorySchema, FieldInfo } from "@/models/schema";
import { useForm } from "@tanstack/react-form";
import { Row } from "@tanstack/react-table";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";

async function onSubmit(value: string) {
	const req = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/category`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ data: value }),
	});

	if (req.status != 200) {
		console.log(req.statusText);
		return;
	}

	const resp = (await req.json()) as ResponseType;
	console.log(resp.data);
}

export function CategoryDashboard() {
	useEffect(() => {
		async function fetchData() {
			const req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/category`,
				{
					headers: {
						"Content-Type": "application/json",
					},
					method: "GET",
				},
			);

			if (req.status != 200) {
				console.log(req.statusText);
				return;
			}

			const resp = (await req.json()) as ResponseType;
			console.log(resp.data);
		}
		fetchData();
	}, []);

	return (
		<div className="my-2 mr-2 flex w-full flex-col border bg-sidebar">
			<div className="mb-4 border-b p-4">
				<h1 className="text-3xl font-bold">Category</h1>
			</div>
			<div className="flex items-center justify-end px-4 ">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="flex items-center justify-center border border-blue-600 bg-blue-500 hover:bg-blue-600">
							<PlusIcon />
							Add
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add category</DialogTitle>
						</DialogHeader>
						<CategoryAddDialog onSubmit={onSubmit} />
					</DialogContent>
				</Dialog>
			</div>
			<div className="container mx-auto py-5 ">
				<CategoryDataTable data={categories} columns={columns} />
			</div>
		</div>
	);
}

export function CategoryAddDialog({
	className,
	onSubmit,
}: {
	className?: string;
	onSubmit: (name: string) => Promise<void>;
}) {
	const categoryForm = useForm({
		defaultValues: {
			name: "",
		},
		validators: { onChange: CategorySchema },
		onSubmit: (values) => onSubmit(values.value.name),
	});
	return (
		<>
			<form
				className={cn("flex flex-col gap-4", className)}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					categoryForm.handleSubmit();
				}}
			>
				<div className="flex flex-col gap-2">
					<categoryForm.Field
						name="name"
						children={(field) => (
							<>
								<Label htmlFor={field.name}>Name</Label>
								<Input
									id={field.name}
									onChange={(e) =>
										field.handleChange(e.target.value)
									}
									onBlur={field.handleBlur}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>

				<div className="flex w-full justify-end">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</>
	);
}

export function CategoryUpdateDialog({ row }: { row?: Row<Category> }) {
	const categoryForm = useForm({
		defaultValues: {
			name: row?.original.name,
		},
		validators: { onChange: CategorySchema },
		onSubmit: (val) => console.log(val),
	});

	return (
		<>
			<form
				onSubmit={(e) => {
					e.stopPropagation();
					e.preventDefault();
					categoryForm.handleSubmit();
				}}
			>
				<div className="p-4">
					<div className="flex flex-col gap-4">
						<categoryForm.Field
							name="name"
							children={(field) => (
								<>
									<Label htmlFor={field.name}>Name</Label>
									<Input
										id={field.name}
										onChange={(e) =>
											field.handleChange(e.target.value)
										}
										onBlur={field.handleBlur}
										value={field.state.value}
									/>
									<FieldInfo field={field} />
								</>
							)}
						/>
					</div>
				</div>
				<div className="flex w-full justify-end px-4">
					<Button>Update</Button>
				</div>
			</form>
		</>
	);
}
