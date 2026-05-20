/** @format */

import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function UserProfile() {
	const navigate = useNavigate();

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
										to={item.path}
										className={
											item.isLogout
												? "flex items-center gap-3 px-4 py-3 rounded-md text-red-500 font-medium hover:bg-red-50 transition-all"
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
		</div>
	);
}
