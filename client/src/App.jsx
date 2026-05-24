/** @format */
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";

function App() {
	const location = useLocation();
	const isLoginPage = location.pathname === "/login";
	const isAdminPage = location.pathname.startsWith("/admin");
	const hideLayout = isLoginPage || isAdminPage;

	return (
		<>
			{!hideLayout && <Navbar />}

			<main>
				<AppRoutes />
			</main>

			{!hideLayout && <Footer />}
		</>
	);
}

export default App;
