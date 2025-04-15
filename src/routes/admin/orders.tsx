import { ProductAddDialog } from "@/components/ui/product-dialogs";

export default function OrdersDashboard() {
	return (
		<>
			<div className="flex h-screen justify-center items-center w-full">
				{/* <div>admin/order</div> */}
				<ProductAddDialog
					onSubmit={function (name: string): Promise<void> {
						throw new Error("Function not implemented.");
					}}
				/>
			</div>
		</>
	);
}
