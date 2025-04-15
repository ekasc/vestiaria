import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Button } from "./components/ui/button";
import ProductCardGrid from "./components/ui/product-card";
import "./index.css";
import { ProductType } from "./models/product";

function App() {
	return (
		<>
			<LandingPage />
		</>
	);
}

function LandingPage() {
	const [products, setProduct] = useState<ProductType[]>([]);

	useEffect(() => {
		async function getData() {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const req: AxiosResponse<ProductType[], any> = await axios.get(
				"https://fakestoreapi.com/products?limit=4",
			);
			const resp = req.data;
			setProduct(resp);
			console.log(resp);
		}
		getData();
	}, []);

	return (
		<div className="flex min-h-screen flex-col p-2 pl-0">
			{/* ========== HERO SECTION ========== */}
			<main className="flex-grow">
				<section className="container flex flex-col items-center lg:flex-row">
					{/* Hero Text */}
					<div className="absolute z-[100] mx-4 mb-8 bg-background/85 p-6 backdrop-blur-sm lg:mb-0 lg:w-2/3 lg:pr-12">
						<h1 className="mb-4 text-4xl leading-tight font-bold md:text-5xl">
							Discover{" "}
							<span className="text-primary">
								Fashion & Elegance
							</span>{" "}
							with Vestiaria
						</h1>
						<p className="mb-6 text-muted-foreground">
							Step into a world of refined style and exclusive
							trends. At Vestiaria, we curate high-quality apparel
							and accessories to complement your unique
							personality. Indulge in a shopping experience where
							every piece tells a story of craftsmanship,
							sustainability, and timeless design.
						</p>
						<Link to="/shop">
							<Button className="hover:cursor-pointer">
								Shop Now
							</Button>
						</Link>
					</div>

					<div className="">
						<img
							src="landing-img.jpg"
							alt="Vestiaria fashion"
							className=""
						/>
					</div>
				</section>

				{/* ========== FEATURES SECTION ========== */}
				<section id="features" className="py-12  ">
					<div className="container mx-auto ">
						<h2 className="mb-8 text-center text-2xl font-bold md:text-3xl ">
							Why Shop With Vestiaria
						</h2>
						<div className="grid gap-4 md:grid-cols-3 ">
							<div className="rounded bg-sidebar p-6 shadow transition-shadow hover:shadow-md">
								<h3 className="mb-2 text-xl font-semibold text-[var(--color-foreground)]">
									Curated Collections
								</h3>
								<p className="text-[var(--color-muted-foreground)]">
									Every item in our catalog is handpicked to
									ensure you get only the best in quality and
									style.
								</p>
							</div>
							<div className="rounded bg-sidebar p-6 shadow transition-shadow hover:shadow-md">
								<h3 className="mb-2 text-xl font-semibold text-[var(--color-foreground)]">
									Ethical Sourcing
								</h3>
								<p className="text-[var(--color-muted-foreground)]">
									We partner with responsible manufacturers to
									bring you apparel that’s mindful of the
									environment and the people who make it.
								</p>
							</div>
							<div className="rounded bg-sidebar p-6 shadow transition-shadow hover:shadow-md">
								<h3 className="mb-2 text-xl font-semibold text-[var(--color-foreground)]">
									Exceptional Support
								</h3>
								<p className="text-[var(--color-muted-foreground)]">
									Our dedicated customer support team is here
									to guide you from browsing to checkout and
									beyond.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* ========== PRODUCTS SECTION ========== */}
				<section
					id="products"
					className="bg-sidebar py-12 text-[var(--color-foreground)]"
				>
					<div className="container mx-auto px-4">
						<h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
							Featured Products
						</h2>
						<ProductCardGrid product={products} />
					</div>
				</section>

				{/* ========== TESTIMONIALS ========== */}
				<section id="testimonials" className="py-12">
					<div className="container mx-auto ">
						<h2 className="mb-8 text-center text-2xl font-bold md:text-3xl">
							What Our Customers Say
						</h2>
						<div className="grid gap-8 md:grid-cols-2">
							<div className="rounded border bg-sidebar p-6 shadow ">
								<p className="mb-4 text-muted-foreground italic">
									"My order arrived quickly and the pieces
									were even more gorgeous in person. Vestiaria
									has become my go-to for all things fashion!"
								</p>
								<div className="font-semibold">— Alice</div>
							</div>
							<div className="rounded border bg-sidebar p-6 shadow ">
								<p className="mb-4 text-muted-foreground italic">
									"I love the curated collections at
									Vestiaria. I can always find unique, stylish
									pieces that are hard to come by elsewhere."
								</p>
								<div className="font-semibold">— Bob</div>
							</div>
						</div>
					</div>
				</section>

				{/* ========== CALL-TO-ACTION ========== */}
				<section className="rounded bg-sidebar py-12 shadow">
					<div className="container mx-auto px-4 text-center">
						<h2 className="mb-4 text-2xl font-bold md:text-3xl">
							Ready to Elevate Your Wardrobe?
						</h2>
						<p className="mb-6">
							Become part of the Vestiaria community and discover
							apparel that speaks to your personal style.
						</p>
						<Button className="hover:cursor-pointer" asChild>
							<Link to="/auth/signup">Create an Account</Link>
						</Button>
					</div>
				</section>
			</main>

			{/* ========== FOOTER ========== */}
			<footer className="bg-sidebar py-4 shadow-sm">
				<div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
					<div className="mb-2 text-sm md:mb-0">
						© 2025 Vestiaria. All rights reserved.
					</div>
					<div className="space-x-4 text-sm">
						<a href="#privacy" className="hover:text-primary">
							Privacy Policy
						</a>
						<a href="#terms" className="hover:text-primary">
							Terms of Service
						</a>
						<a href="#contact" className="hover:text-primary">
							Contact Us
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default App;
