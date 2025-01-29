import { DotPattern } from "@/components/ui/dot-pattern";
import { GridPatternDashed } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default function Auth() {
	return (
		<>
			<div className="flex justify-center items-center w-full border m-2 bg dark:bg-transparent overflow-hidden">
				<div className="relative h-full w-full">
					<DotPattern
						width={20}
						height={20}
						cx={1}
						cy={1}
						cr={1}
						className={cn(
							"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)] dark:fill-muted-foreground hidden dark:block",
						)}
					/>
				</div>
				<div className="border h-[450px] w-[400px] absolute bg-sidebar dark:bg-sidebar/10 backdrop-blur-[3px] flex items-center flex-col p-4 ">
					<h1 className="text-2xl">Login</h1>
					// TODO Form
				</div>
			</div>
		</>
	);
}
