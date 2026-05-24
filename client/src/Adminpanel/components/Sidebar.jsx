/** @format */

import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab }) {
	const navigate = useNavigate();

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
									? "text-tertiary-fixed bg-secondary-container golden-glow font-semibold"
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
			<div className='mt-auto border-t border-outline-variant/20 pt-6 space-y-2'>
				<button
					onClick={() => alert("Settings panel...")}
					className='w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-tertiary-fixed transition-colors text-left cursor-pointer'>
					<span className='material-symbols-outlined' data-icon='settings'>
						settings
					</span>
					<span className='text-sm'>Settings</span>
				</button>
				<button
					onClick={() => alert("Connecting to Divine Support Portal...")}
					className='w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-tertiary-fixed transition-colors text-left cursor-pointer'>
					<span className='material-symbols-outlined' data-icon='help'>
						help
					</span>
					<span className='text-sm'>Support</span>
				</button>
				<button
					onClick={() => alert("Logging out from Sacred Sanctuary...")}
					className='mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-tertiary-fixed text-primary font-bold rounded-lg transform active:scale-95 transition-all shadow-md hover:bg-[#e7c96f] cursor-pointer'>
					<span className='material-symbols-outlined text-[20px]' data-icon='logout'>
						logout
					</span>
					Log Out
				</button>
			</div>
		</aside>
	);
}
