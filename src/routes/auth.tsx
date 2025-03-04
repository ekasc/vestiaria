import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { authSchema } from "@/models/schema";
import { type AnyFieldApi, useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import { Link } from "react-router";

export default function Auth({ type }: { type: string }) {
	const { setOpen } = useSidebar();

	useEffect(() => setOpen(false), []);

	return (
		<>
			<AuroraText className="flex h-screen w-full items-center justify-center bg-background px-3 py-2 text-center text-3xl font-bold tracking-widest ">
				<Link to="/" onClick={() => setOpen(true)}>
					Vestiaria
				</Link>
			</AuroraText>
			<div className="flex w-full items-center justify-center overflow-hidden border-l bg-background  dark:bg-transparent">
				{type === "login" ? <Login /> : <SignUp />}
			</div>
		</>
	);
}

function Login() {
	const loginForm = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: authSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				loginForm.handleSubmit();
			}}
			className="absolute flex h-fit w-[400px] flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
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
			<div className="flex w-full">
				<Button className="w-full hover:cursor-pointer">
					Continue
				</Button>
				<Button variant="link" className="w-full hover:cursor-pointer">
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
	const signUpForm = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		validators: {
			onChange: authSchema,
		},
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
			className="absolute flex h-fit w-[400px] flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
		>
			<h1 className="text-xl">Welcome to Vestiaria</h1>
			<h3 className="text-sm text-muted-foreground">
				Sign up to get started
			</h3>
			<Separator />
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
			<div className="flex w-full flex-col gap-4">
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
								placeholder="qwerty1234"
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
