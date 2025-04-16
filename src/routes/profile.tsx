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
import { createRef, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/models/user";
import { toast } from "sonner";

// authToken
export default function Profile() {
	const { authToken, logout } = useAuth();
	const [user, setUser] = useState<User | undefined>(undefined);
	const [svgUser, setSVGUser] = useState<string | "">("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUserProfile = async () => {
			try {
				const req = await fetch(
					`${import.meta.env.VITE_API_URL}/api/v1/user/profile`,
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
						method: "GET",
					}
				);
				if (req.status != 200) {
					logout();
				}
				const resp = (await req.json()) as ResponseType;

				setUser(resp.data);
				setSVGUser(resp.data.svgText);
			} catch (err) {
				setError("Failed to load user profile");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (authToken) {
			fetchUserProfile();
		}
	}, [authToken]);

	return <>{user ? <SignUp user={user} svgText={svgUser} /> : <></>}</>;
}

type SignUpProps = {
	user: User | null;
	svgText: string | "";
};

function SignUp({ user, svgText }: SignUpProps) {
	const { logout, authToken } = useAuth();
	const svgRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (svgRef.current) {
			svgRef.current.innerHTML = svgText;
		}
	}, [svgText]);

	console.log("UserSignuPViwe", user, "svggg", svgText);
	const svgElement = createRef<SVGSVGElement>();
	// if (svgElement.current) {
	// 	svgElement.current.innerHTML = svgText;
	// }

	useEffect(() => {
		if (svgElement.current) {
			svgElement.current.innerHTML = svgText;
		}
	}, [svgText]);

	const [avatar, setAvatar] = useState<string | undefined>(svgText);
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
		setAvatar(resp);
		console.log("svgFoind:--  ", resp.toString());
		if (svgElement.current) {
			svgElement.current.innerHTML = resp;
		}
	}

	const signUpForm = useForm({
		defaultValues: {
			firstName: user?.firstName,
			lastName: user?.lastName,
			email: user?.email,
		},
		validators: {
			onChange: UserInputSchema,
		},
		onSubmit: async ({ value }) => {
			console.log("SignupPutttt", value);
			const req = await fetch(
				`${import.meta.env.VITE_API_URL}/api/v1/user/`,
				{
					method: "PUT",
					body: JSON.stringify({ ...value, svgText: avatar }),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authToken}`,
					},
				}
			);
			console.log("SignupPuttttResponsee", req.json);

			if (req.status === 200) {
				toast("Profile updated successfully!");
				// useNavigate('/login');
			}
		},
	});

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				e.stopPropagation();
				await signUpForm.handleSubmit();
			}}
			className="flex h-fit w-full mx-40 my-20 flex-col items-center space-y-4 border bg-sidebar px-7 py-9 backdrop:blur-2xl dark:bg-background"
		>
			<h1 className="text-xl">Welcome, {user?.firstName}</h1>

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
					{/* <div ref={svgRef} /> */}
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
								disabled
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
				<Button className="w-full hover:cursor-pointer">Update</Button>
			</div>
			<Separator />
		</form>
	);
}

function generateRandomSeed(length = 10) {
	return Math.random()
		.toString(36)
		.substring(2, 2 + length);
}
