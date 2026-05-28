import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export default function UserProfile() {
	const navigate = useNavigate();
	const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

	const logoutMutation = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.auth.signOut();
			if (error) throw error;
		},
		onSuccess: () => {
			localStorage.removeItem("supabaseToken");
			localStorage.removeItem("currentUser");
			window.location.href = "/login";
		},
		onError: (err) => {
			console.error("Logout failed:", err);
			localStorage.removeItem("supabaseToken");
			localStorage.removeItem("currentUser");
			window.location.href = "/login";
		}
	});

	const navLinkClass = ({ isActive }) =>
		isActive
			? "flex items-center gap-3 px-4 py-3 rounded-md bg-linear-to-r from-tertiary/80 via-tertiary/90 to-tertiary/80 text-primary font-medium transition-all"
			: "flex items-center gap-3 px-4 py-3 rounded-md text-on-surface-variant font-medium hover:bg-surface-container-high transition-all";
	return (
		<div className='bg-surface font-sans text-on-surface min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow pt-20 pb-20 w-full px-8 md:px-16 lg:px-24'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
					{/* Sidebar Navigation */}
					<aside className='lg:col-span-3 space-y-6 sticky top-28 self-start'>
						<div className='bg-surface-container-low rounded-md p-6 border-[0.5px] border-tertiary/20'>
							<nav className='space-y-2'>
								<NavLink to='/profile' end className={navLinkClass}>
									<span
										className='material-symbols-outlined'
										data-icon='dashboard'>
										dashboard
									</span>
									<span className='font-sans text-sm uppercase tracking-widest font-semibold'>
										Dashboard
									</span>
								</NavLink>

								{[
									{
										icon: "shopping_cart",
										label: "My Orders",
										path: "/profile/my-orders",
									},
									{
										icon: "auto_awesome",
										label: "Divine Wishlist",
										path: "/profile/wishlist",
									},
									{
										icon: "location_on",
										label: "Saved Addresses",
										path: "/profile/addresses",
									},
									{
										icon: "logout",
										label: "Logout",
										path: "/login",
										isLogout: true,
									},
								].map((item) => (
									<NavLink
										key={item.label}
										to={item.isLogout ? "#" : item.path}
										onClick={(e) => {
											if (item.isLogout) {
												e.preventDefault();
												setShowLogoutConfirm(true);
											}
										}}
										className={
											item.isLogout
												? "flex items-center gap-3 px-4 py-3 rounded-md text-red-500 font-medium hover:bg-red-50 transition-all cursor-pointer"
												: navLinkClass
										}>
										<span
											className={`material-symbols-outlined${item.isLogout ? " text-red-500" : ""}`}>
											{item.icon}
										</span>
										<span
											className={`font-sans text-sm uppercase tracking-widest font-semibold${item.isLogout ? " text-red-500" : ""}`}>
											{item.label}
										</span>
									</NavLink>
								))}
							</nav>
						</div>

						{/* Support Card */}
						<div className='bg-primary text-surface rounded-md p-6 text-center space-y-4 shadow-[0_20px_40px_rgba(31,31,31,0.04)]'>
							<span className='material-symbols-outlined text-[40px] text-tertiary'>
								support_agent
							</span>
							<h3 className='font-serif text-2xl'>Need Divine Guidance?</h3>
							<p className='font-sans text-sm text-surface/80 leading-relaxed'>
								Our curators are here to assist your spiritual journey.
							</p>
							<button
								onClick={() => navigate("/contact")}
								className='w-full py-3 bg-transparent border border-tertiary text-surface font-sans text-xs uppercase tracking-widest font-semibold hover:bg-linear-to-r  hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all rounded-md mt-4'>
								Contact Support
							</button>
						</div>
					</aside>

					{/* Main Content Area */}
					<div className='lg:col-span-9'>
						<Outlet />
					</div>
				</div>
			</main>

			{/* Logout Confirm Dialog */}
			{showLogoutConfirm && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
					<div className='bg-surface w-full max-w-md rounded-2xl p-8 border border-outline-variant/30 shadow-2xl text-center space-y-6 animate-scaleIn'>
						<div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-100'>
							<span className='material-symbols-outlined text-[32px]'>logout</span>
						</div>
						
						<div className='space-y-2'>
							<h3 className='font-serif text-3xl font-bold text-primary'>Conclude Session?</h3>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Are you sure you want to sign out from your divine account? You will need to authenticate again to view your sacred orders.
							</p>
						</div>
						
						<div className='flex gap-4'>
							<button
								type='button'
								onClick={() => setShowLogoutConfirm(false)}
								className='flex-1 py-3 border border-tertiary text-primary rounded-xl font-bold hover:bg-surface-container-high transition-all cursor-pointer'>
								Stay
							</button>
							<button
								type='button'
								disabled={logoutMutation.isPending}
								onClick={() => logoutMutation.mutate()}
								className='flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'>
								{logoutMutation.isPending ? "Signing Out..." : "Sign Out"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
