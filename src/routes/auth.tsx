import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import { ResponseType } from "@/lib/utils";
import { authSchema, UserInputSchema } from "@/models/schema";
import { ROLE } from "@/models/user";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { RefreshCcw } from "lucide-react";
import { createRef, useEffect, useState } from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router";

export default function Auth({ type }: { type: string }) {
	const { setOpen } = useSidebar();
	window.onpopstate = () => setOpen(false);

	useEffect(() => setOpen(false), []);

	return (
		<>
			<Link
				className="flex h-screen w-full items-center justify-center bg-background px-3 py-2 text-center text-3xl font-bold tracking-widest "
				to="/"
				onClick={() => setOpen(true)}
			>
				<AuroraText>Vestiaria</AuroraText>
			</Link>
			<div className="flex w-full items-center justify-center overflow-hidden border-l bg-background  dark:bg-transparent">
				{type === "login" ? <Login /> : <SignUp />}
			</div>
		</>
	);
}

function Login() {
	const { login } = useAuth();
	const loginForm = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: authSchema,
		},
		onSubmit: async ({ value }) => {
		
			const res= await login(value.email,value.password);
			// return redirect("/")
			if(res){
				console.log("LoginResponse",res.user, res.user.role);
			if(res.user.role==ROLE.Admin){
					window.location.href="/admin"
				}else{
					window.location.href="/"
				}
			}
			// return <Navigate to="/" replace/>
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				loginForm.handleSubmit();
			}}
			className="flex h-fit w-[400px] flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
		>
			<h1 className="text-xl">Welcome back</h1>
			<h3 className="text-sm text-muted-foreground">
				Login to your Vestiaria account
			</h3>
			<Separator />
			<div className="flex w-full flex-col gap-4">
				<loginForm.Field
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
								type="email"
								id={field.name}
								className="bg-background"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder="qwerty@example.com"
							/>
							<FieldInfo field={field} />
						</>
					)}
				/>
			</div>
			<div className="flex w-full flex-col gap-4">
				<loginForm.Field
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
								type="password"
								id={field.name}
								className="bg-background"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) =>
									field.handleChange(e.target.value)
								}
								placeholder="qwerty1234"
							/>
							<FieldInfo field={field} />
						</>
					)}
				/>
			</div>
			<div className="flex w-full flex-wrap gap-4">
				<Button className="w-full flex-1">Continue</Button>
				<Button variant="link" className="w-full flex-1" type="button">
					Forgot your Password?
				</Button>
			</div>
			<Separator />
			<h5 className="text-sm">
				Don&apos;t have an account?{" "}
				<Link
					to="/auth/signup"
					className="underline underline-offset-4"
				>
					Sign up!
				</Link>
			</h5>
		</form>
	);
}

function SignUp() {
	const svgElement = createRef<SVGSVGElement>();
	const [avatar, setAvatar] = useState<string | undefined>("");
	async function getRandomAvatar() {
		const req = await fetch(
			`https://api.dicebear.com/9.x/pixel-art/svg/seed=${generateRandomSeed()}`,
			{
				method: "GET",
			},
		);
		if (!req.ok) {
			console.error("error occured");
			return;
		}
		const resp = await req.text();
		setAvatar(resp);
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
		validators: {
			onChange: UserInputSchema,
		},
		onSubmit: async({ value }) => {
			console.log(value);
			//

			const req= await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, {
				method:"POST",
				body:JSON.stringify({...value, svgText:avatar}),
				headers:{
					"Content-Type":"application/json"
				}
			})

			if(req.status===200){
				// useNavigate('/login');
				return redirect('/login');
			}
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				signUpForm.handleSubmit();
			}}
			className="absolute flex h-fit w-[400px] flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
		>
			<h1 className="text-xl">Welcome to Vestiaria</h1>
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
					<svg ref={svgElement} className="" id="avatar" />
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

function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-sm text-destructive">
					{field.state.meta.errors
						.map((err) => err.message)
						.join(",")}
				</em>
			) : null}
			{field.state.meta.isValidating ? "Validating..." : null}
		</>
	);
}

function generateRandomSeed(length = 10) {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
}
