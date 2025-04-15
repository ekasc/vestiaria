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
import { ProductVariant } from "@/models/product";
import { FieldInfo } from "@/models/schema";
import { ChevronsUpDown, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "./collapsible";
import { ScrollArea } from "./scroll-area";
import { Switch } from "./switch";

export function ProductAddDialog({
	className,
	onSubmit,
	categories,
}: {
	className?: string;
	onSubmit: ({
		name,
		price,
		category,
		description,
		sku,
		image,
	}: ProductSchemaType) => Promise<void>;
	categories?: CategoryResponseType[];
}) {
	const [variants, setVariants] = useState<ProductVariant[] | undefined>([]);

	const variantForm = useForm({
		defaultValues: {
			color: "",
			size: "",
			stock: 0,
		} as ProductVariant,
		validators: { onChange: VariantSchema },
		onSubmit: ({ value }) => addVariant(value),
	});

	const productForm = useForm({
		defaultValues: {
			name: "ok",
			price: 20,
			category: "",
			description: "",
			image: undefined,
			sku: "SKU",
			isActive: true,
			discount: 10,
			variants: variants,
		} as ProductSchemaType,
		validators: { onChange: ProductSchema },
		onSubmit: ({ value }) => {
			console.log("variants: ", variants);
			console.log(value);
			if (variants) {
				onSubmit({ ...value, variants: variants });
			}
		},
	});

	function addVariant(newVariant: ProductVariant) {
		console.log("Adding variant:", newVariant); // Debug logging
		setVariants((prev) => {
			if (!prev) return [newVariant];
			const existingIndex = prev.findIndex(
				(v) =>
					v.size === newVariant.size && v.color === newVariant.color,
			);
			if (existingIndex !== -1) {
				const updated = [...prev];
				updated[existingIndex].stock += newVariant.stock;
				return updated;
			}
			return [...prev, newVariant];
		});
	}

	function removeVariant(value: ProductVariant) {
		setVariants((prev) => {
			if (!prev) return prev;
			return prev.filter(
				(v) => !(v.size === value.size && v.color === value.color),
			);
		});
	}

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
					<div className="flex w-full flex-col gap-2">
						<productForm.Field
							name="image"
							children={(field) => (
								<>
									<Label htmlFor={field.name}>Image</Label>
									<Input
										className="bg-sidebar"
										id={field.name}
										type="file"
										onChange={(e) =>
											field.handleChange(
												e.target.files![0],
											)
										}
									/>
									<FieldInfo field={field} />
								</>
							)}
						/>
					</div>
					<div className="flex gap-2">
						<div className="flex w-full flex-col gap-2">
							<productForm.Field
								name="name"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>Name</Label>
										<Input
											className="bg-sidebar"
											id={field.name}
											type="text"
											value={field.state.value}
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
						<div className="flex w-full flex-col gap-2">
							<productForm.Field
								name="price"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Price
										</Label>
										<Input
											value={field.state.value}
											className="bg-sidebar"
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
						<div className="flex w-full flex-col gap-2">
							<productForm.Field
								name="sku"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>SKU</Label>
										<Input
											className="bg-sidebar"
											value={field.state.value}
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
						<div className="flex w-full flex-col gap-2">
							<productForm.Field
								name="category"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Category
										</Label>
										<Select
											value={field.state.value}
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
													{categories &&
													categories.length > 0 ? (
														categories.map(
															(item) => {
																return (
																	<SelectItem
																		value={
																			item._id
																		}
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
						<div className="flex w-full flex-col gap-2">
							<productForm.Field
								name="discount"
								children={(field) => (
									<>
										<Label htmlFor={field.name}>
											Discount
										</Label>
										<Input
											value={field.state.value}
											className="bg-sidebar"
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
						<div className="flex w-1/4 flex-col justify-center gap-2">
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
						<div className="flex flex-col gap-2 border bg-sidebar p-3">
							<div className=" flex items-end gap-2">
								<div className="flex w-full flex-col gap-2">
									<variantForm.Field
										name="color"
										children={(field) => (
											<>
												<Label>Color</Label>
												<Input
													className="bg-background"
													id={field.name}
													value={field.state.value}
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
								<div className="flex w-full flex-col gap-2">
									<variantForm.Field
										name="size"
										children={(field) => (
											<>
												<Label>Size</Label>
												<Input
													className="bg-background"
													id={field.name}
													onBlur={field.handleBlur}
													value={field.state.value}
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
								<div className="flex w-full flex-col gap-2">
									<variantForm.Field
										name="stock"
										children={(field) => (
											<>
												<Label>Stock</Label>
												<Input
													className="bg-background"
													id={field.name}
													onBlur={field.handleBlur}
													value={field.state.value}
													onChange={(e) =>
														field.handleChange(
															Number(
																e.target.value,
															),
														)
													}
												/>
												<FieldInfo field={field} />
											</>
										)}
									/>
								</div>
							</div>
							<Collapsible>
								<div className="flex w-full items-center space-x-4">
									<h4 className="font-semibold whitespace-nowrap">
										Variant List{" "}
										<span>({variants?.length})</span>
									</h4>
									<div className="w-full">
										<CollapsibleTrigger asChild>
											<Button
												variant="ghost"
												size="sm"
												className="w-9 p-0"
											>
												<ChevronsUpDown className="h-4 w-4" />
												<span className="sr-only">
													Toggle
												</span>
											</Button>
										</CollapsibleTrigger>
									</div>
									<div className=" flex w-full  justify-end">
										<Button
											className=""
											type="button"
											size="icon"
											onClick={() => {
												variantForm.handleSubmit();
											}}
										>
											<PlusIcon />
										</Button>
									</div>
								</div>
								<CollapsibleContent className="h-full">
									<ScrollArea className="h-[200px] my-4 ">
										<div className="flex h-full w-full flex-col gap-3 ">
											{variants ? (
												<>
													{variants.map((i, k) => {
														return (
															<div
																key={k}
																style={{
																	borderColor:
																		i.color,
																}}
																className="flex h-full w-full gap-2 border bg-background p-4 transition-all ease-in-out hover:border-foreground"
															>
																<div>
																	Color:
																	<span>
																		{
																			i.color
																		}
																	</span>
																</div>
																<div>
																	Size:
																	<span>
																		{i.size}
																	</span>
																</div>
																<div>
																	Stock:
																	<span>
																		{
																			i.stock
																		}
																	</span>
																</div>
																<div className="w-full flex justify-end">
																	<Button
																		className=""
																		variant="destructive"
																		size="icon"
																		type="button"
																		onClick={() =>
																			removeVariant(
																				i,
																			)
																		}
																	>
																		<Trash2 />
																	</Button>
																</div>
															</div>
														);
													})}
												</>
											) : null}
										</div>
									</ScrollArea>
								</CollapsibleContent>
							</Collapsible>
						</div>
					</div>
				</div>

				<div className="flex w-full justify-end">
					<productForm.Subscribe
						selector={(state) => [
							state.canSubmit,
							state.isSubmitting,
						]}
						children={([_, isSubmitting]) => {
							console.log(productForm.getAllErrors());
							return (
								<Button type="submit">
									{isSubmitting ? "..." : "Submit"}
								</Button>
							);
						}}
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
										className="bg-sidebar"
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
