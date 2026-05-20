/** @format */
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";

function App() {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";
	return (
		<>
			{!isLoginPage && <Navbar />}

			<main>
				<AppRoutes />
			</main>

			{!isLoginPage && <Footer />}
		</>
	);
}

export default App;
