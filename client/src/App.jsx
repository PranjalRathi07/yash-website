/** @format */
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/Approutes";
import { Toaster } from "react-hot-toast";

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

			<Toaster
				position="top-center"
				toastOptions={{
					duration: 4000,
					style: {
						background: 'var(--color-surface-container-lowest)',
						color: 'var(--color-primary)',
						border: '1px solid var(--color-tertiary)',
						fontFamily: 'var(--font-sans)',
						fontWeight: '600',
					},
					success: {
						iconTheme: {
							primary: 'var(--color-tertiary)',
							secondary: 'var(--color-surface)',
						},
					},
				}}
			/>
		</>
	);
}

export default App;
