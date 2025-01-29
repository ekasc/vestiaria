import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import Layout from "./layout.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Layout />
	</BrowserRouter>,
);
