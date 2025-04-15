import {
	CategorySchema,
	ProductSchema,
	ProductSchemaType,
	VariantSchema,
} from "@/models/schema";
import { useForm } from "@tanstack/react-form";
import { Row } from "@tanstack/react-table";
import { Product } from "../table/product/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CategoryResponseType, cn } from "@/lib/utils";
import { FieldInfo } from "@/models/schema";
import { Switch } from "./switch";
import { Variants } from "motion/react";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

export function ProductAddDialog({
	className,
	onSubmit,
	categories,
}: {
	className?: string;
	onSubmit: (name: string) => Promise<void>;
	categories?: CategoryResponseType[];
}) {
	const [variants, setVariants] = useState<Variants[] | undefined>([]);

	const variantForm = useForm({
		defaultValues: {
			color: "",
			size: "",
			stock: 0,
		},
		validators: { onChange: VariantSchema },
		onSubmit: (values) => console.log(values),
	});

	const productForm = useForm({
		defaultValues: {
			name: "",
			price: 0,
			category: "",
			description: "",
			sku: "",
			isActive: true,
			image: "",
		} as ProductSchemaType,
		validators: { onChange: ProductSchema },
		onSubmit: (values) => onSubmit(values.value.name),
	});

	return (
		<>
			<form
				className={cn("flex gap-4 flex-col ", className)}
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					productForm.handleSubmit();
				}}
			>
				<div className="flex flex-col gap-4">
					<div>
						<h1>
							<Label htmlFor="image">Image</Label>
						</h1>
					</div>
					<div className="flex gap-2">
						<div className="flex flex-col gap-2 w-full">
							<productForm.Field
								name="name"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>Name</Label>
										<Input
											id={field.name}
											type="text"
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											// onBlur={(e) => fetchImages(e)}
										/>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<productForm.Field
								name="price"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Price
										</Label>
										<Input
											id={field.name}
											type="number"
											onChange={(e) =>
												field.handleChange(
													Number(e.target.value),
												)
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex flex-col gap-2 w-full">
							<productForm.Field
								name="sku"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>SKU</Label>
										<Input
											id={field.name}
											onChange={(e) =>
												field.handleChange(
													e.target.value,
												)
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2 w-full">
							<productForm.Field
								name="category"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Category
										</Label>
										<Select
											onValueChange={field.handleChange}
										>
											<SelectTrigger className="w-full">
												<SelectValue
													className="w-full"
													placeholder="Select a category"
												/>
											</SelectTrigger>
											<SelectContent
												onBlur={field.handleBlur}
											>
												<SelectGroup id={field.name}>
													{categories ? (
														categories.map(
															(item) => {
																return (
																	<SelectItem
																		value={item.name.toLowerCase()}
																		key={
																			item._id
																		}
																	>
																		{
																			item.name
																		}
																	</SelectItem>
																);
															},
														)
													) : (
														<div>
															No categories
															available
														</div>
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
					</div>

					<div className="flex gap-2">
						<div className="flex flex-col gap-2 w-full">
							<productForm.Field
								name="discount"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Discount
										</Label>
										<Input
											id={field.name}
											type="number"
											placeholder="%"
											onChange={(e) =>
												field.handleChange(
													Number(e.target.value),
												)
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
						<div className="flex flex-col gap-2 justify-center w-1/4">
							<productForm.Field
								name="isActive"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Active
										</Label>
										<Switch
											className=""
											id={field.name}
											checked={field.state.value}
											onCheckedChange={(e) =>
												field.handleChange(e)
											}
											onBlur={field.handleBlur}
										/>
										<FieldInfo field={field} />
									</>
								)}
							/>
						</div>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Variants</Label>
						<div className="bg-sidebar p-3 border flex gap-2 items-end">
							<div className="flex flex-col gap-2 w-full">
								<variantForm.Field
									name="color"
									children={(field) => (
										<>
											<Label>Color</Label>
											<Input
												className="bg-background"
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														e.target.value,
													)
												}
											/>
											<FieldInfo field={field} />
										</>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2 w-full">
								<variantForm.Field
									name="size"
									children={(field) => (
										<>
											<Label>Size</Label>
											<Input
												className="bg-background"
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														e.target.value,
													)
												}
											/>
											<FieldInfo field={field} />
										</>
									)}
								/>
							</div>
							<div className="flex flex-col gap-2 w-full">
								<variantForm.Field
									name="stock"
									children={(field) => (
										<>
											<Label>Stock</Label>
											<Input
												className="bg-background"
												id={field.name}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														Number(e.target.value),
													)
												}
											/>
											<FieldInfo field={field} />
										</>
									)}
								/>
							</div>
							<div className="h-full flex items-center">
								<Button
									className=""
									type="button"
								>
									<PlusIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="flex w-full justify-end">
					<productForm.Subscribe
						selector={(state) => [
							state.canSubmit,
							state.isSubmitting,
						]}
						children={([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "..." : "Submit"}
							</Button>
						)}
					/>
				</div>
			</form>
		</>
	);
}

export function ProductUpdateDialog({ row }: { row?: Row<Product> }) {
	const productForm = useForm({
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
					productForm.handleSubmit();
				}}
			>
				<div className="p-4">
					<div className="flex flex-col gap-4">
						<productForm.Field
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
