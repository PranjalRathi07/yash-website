import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";

export default function Sidebar({ activeTab }) {
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
			console.error("Admin logout failed:", err);
			localStorage.removeItem("supabaseToken");
			localStorage.removeItem("currentUser");
			window.location.href = "/login";
		}
	});

	const menuItems = [
		{ id: "dashboard", label: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
		{ id: "products", label: "Products", icon: "inventory_2", path: "/admin/products" },
		{ id: "orders", label: "Orders", icon: "shopping_cart", path: "/admin/orders" },
		{ id: "users", label: "Users", icon: "group", path: "/admin/users" },
		{ id: "banners", label: "Banners", icon: "branding_watermark", path: "/admin/banners" },
	];

	return (
		<aside className='bg-primary h-screen w-64 fixed left-0 top-0 shadow-md flex flex-col py-8 px-4 z-50 border-r border-outline-variant/10'>
			{/* Brand Header */}
			<div className='mb-12 px-4'>
				<h1 className='font-serif text-3xl font-bold text-tertiary-fixed leading-tight tracking-wide text-shadow-gold'>
					Krishna Vasanam
				</h1>
				<p className='text-xs uppercase tracking-widest text-[#e7c96f] opacity-80 mt-1 font-semibold'>
					Admin Sanctuary
				</p>
			</div>

			{/* Navigation Links */}
			<nav className='flex-1 space-y-2 overflow-y-auto pr-1'>
				{menuItems.map((tab) => {
					const isActive = tab.id === activeTab;
					return (
						<button
							key={tab.id}
							onClick={() => navigate(tab.path)}
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left group cursor-pointer ${
								isActive
									? "text-tertiary-fixed bg-secondary-container font-semibold"
									: "text-white/70 hover:text-tertiary-fixed hover:bg-primary-container"
							}`}>
							<span
								className={`material-symbols-outlined transition-transform duration-300 ${
									isActive ? "scale-105" : "group-hover:scale-110"
								}`}
								data-icon={tab.icon}>
								{tab.icon}
							</span>
							<span>{tab.label}</span>
						</button>
					);
				})}
			</nav>

			{/* Footer Actions */}
			<div className='mt-auto border-t border-outline-variant/20 pt-2 space-y-2'>
				<button
					onClick={() => setShowLogoutConfirm(true)}
					className='mt-2 w-full flex items-center justify-center gap-2 px-4 py-3 bg-tertiary-fixed text-primary font-bold rounded-lg transform active:scale-95 transition-all shadow-md hover:bg-[#e7c96f] cursor-pointer'>
					<span className='material-symbols-outlined text-[20px]' data-icon='logout'>
						logout
					</span>
					Log Out
				</button>
			</div>

			{/* Logout Confirm Dialog */}
			{showLogoutConfirm && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn text-on-surface'>
					<div className='bg-surface w-full max-w-md rounded-2xl p-8 border border-outline-variant/30 shadow-2xl text-center space-y-6 animate-scaleIn'>
						<div className='w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto text-red-600 border border-red-100'>
							<span className='material-symbols-outlined text-[32px]'>logout</span>
						</div>
						
						<div className='space-y-2'>
							<h3 className='font-serif text-3xl font-bold text-primary'>Conclude Sanctuary Session?</h3>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Are you sure you want to sign out from the sacred admin panel?
							</p>
						</div>
						
						<div className='flex gap-4'>
							<button
								type='button'
								onClick={() => setShowLogoutConfirm(false)}
								className='flex-1 py-3 border border-tertiary text-primary rounded-xl font-bold hover:bg-surface-container-high transition-all cursor-pointer'>
								Cancel
							</button>
							<button
								type='button'
								disabled={logoutMutation.isPending}
								onClick={() => logoutMutation.mutate()}
								className='flex-1 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50'>
								{logoutMutation.isPending ? "Exiting..." : "Log Out"}
							</button>
						</div>
					</div>
				</div>
			)}
		</aside>
	);
}
