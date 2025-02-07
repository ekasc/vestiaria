import { useAuth } from "./hooks/use-auth";
import "./index.css";

function App() {
	const{isAuthenticated,user}=useAuth()
	return (
		<>
			<div>{user?"test":"helloo"}</div>
		</>
	);
}

export default App;
