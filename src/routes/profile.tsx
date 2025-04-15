import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ResponseType } from "@/lib/utils";
import { authSchema, FieldInfo, UserInputSchema } from "@/models/schema";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { RefreshCcw } from "lucide-react";
import { createRef, useEffect, useState } from "react";
import { Link } from "react-router";

export default function Profile() {

	useEffect(()=>{
		
	},[])


	return (
		<>
			<SignUp />
		</>
	);
}




function SignUp() {
	// const svgElement = createRef<SVGSVGElement>();
	// const [avatar, setAvatar] = useState<string | undefined>("");
	async function getRandomAvatar() {
		const req = await fetch(
			`https://api.dicebear.com/9.x/pixel-art/svg/seed=${generateRandomSeed()}`,
			{
				method: "GET",
			}
		);
		if (!req.ok) {
			console.error("error occured");
			return;
		}
		const resp = await req.text();
		console.log(resp);
		if (svgElement.current) {
			svgElement.current.innerHTML = resp;
		}
	}

	const signUpForm = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		// validators: {
		// 	onChange: UserInputSchema,
		// },
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				signUpForm.handleSubmit();
			}}
			className="flex h-fit w-full mx-40 my-20 flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
		>
			<h1 className="text-xl">Welcome to John</h1>
			<h3 className="text-sm text-muted-foreground">
				Sign up to get started
			</h3>
			<Separator />
			<div className="mb-4 w-full flex flex-col gap-4 justify-center items-center h-full">
				<Label className="justify-start flex w-full" htmlFor="avatar">
					Profile avatar
				</Label>
				<div className="border relative hover:border-white transition-all">
					<div className="absolute justify-end flex w-full">
						<Button
							className=""
							size="icon"
							onClick={() => getRandomAvatar()}
							type="button"
						>
							<RefreshCcw />
						</Button>
					</div>
					{/* <svg ref={"svgElement"} className="" id="avatar" /> */}
				</div>
			</div>

			<div className="flex w-full gap-4">
				<div className="flex w-full flex-col gap-4 ">
					<signUpForm.Field
						name="firstName"
						children={(field) => (
							<>
								<Label
									htmlFor={field.name}
									className="flex w-full justify-start"
								>
									First Name
								</Label>
								<Input
									placeholder="John"
									type="text"
									id={field.name}
									className="bg-background"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(e.target.value)
									}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
				<div className="flex w-full flex-col gap-4 ">
					<signUpForm.Field
						name="lastName"
						children={(field) => (
							<>
								<Label
									htmlFor={field.name}
									className="flex w-full justify-start"
								>
									Last Name
								</Label>
								<Input
									placeholder="Doe"
									type="text"
									id={field.name}
									className="bg-background"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(e.target.value)
									}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
			</div>
			<div className="flex w-full flex-col gap-4">
				<signUpForm.Field
					name="email"
					children={(field) => (
						<>
							<Label
								htmlFor={field.name}
								className="flex w-full justify-start"
							>
								Email
							</Label>
							<Input
								placeholder="qwerty@example.com"
								type="email"
								id={field.name}
								className="bg-background"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
							/>
							<FieldInfo field={field} />
						</>
					)}
				/>
			</div>
			<div className="flex w-full gap-4">
				<div className="flex w-full flex-col gap-4 ">
					<signUpForm.Field
						name="password"
						children={(field) => (
							<>
								<Label
									htmlFor={field.name}
									className="flex w-full justify-start"
								>
									Password
								</Label>
								<Input
									placeholder="qwerty123"
									type="password"
									id={field.name}
									className="bg-background"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(e.target.value)
									}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
				<div className="flex w-full flex-col gap-4 ">
					<signUpForm.Field
						name="confirmPassword"
						children={(field) => (
							<>
								<Label
									htmlFor={field.name}
									className="flex w-full justify-start"
								>
									Confirm Password
								</Label>
								<Input
									placeholder="qwerty123"
									type="password"
									id={field.name}
									className="bg-background"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) =>
										field.handleChange(e.target.value)
									}
								/>
								<FieldInfo field={field} />
							</>
						)}
					/>
				</div>
			</div>
			<div className="flex w-full">
				<Button className="w-full hover:cursor-pointer">
					Continue
				</Button>
			</div>
			<Separator />
			<h5 className="text-sm">
				Already have an account?{" "}
				<Link to="/auth/login" className="underline underline-offset-4">
					Login!
				</Link>
			</h5>
		</form>
	);
}
