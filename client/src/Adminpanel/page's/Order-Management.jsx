/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_ORDERS = [
	{
		id: "#KV-8921-S",
		devotee: "Rajesh Iyer",
		initials: "RJ",
		date: "Oct 24, 2023",
		collection: "Vigraha Divine",
		amount: "₹12,450.00",
		status: "Processing",
		address: "12, Temple Road, Malleshwaram, Bengaluru, KA 560003",
		history: [
			{ title: "Divine Confirmation", date: "Oct 24, 10:30 AM" },
			{ title: "Consecration (Processing)", date: "Pending Artisan Review" },
		],
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKGRvmkW8Bcf6JhTRmbko9W52OAUoTzS65YXvIkF8ufpJsf31c3JNBEETFoao8AQngTUE0SpPEjTiyQsiZqMA6swjYcLkdqcnwbux1qkwZO1g98qc65MUiy5sug5lcGVR8j_PhCgt0hL_zYQoBWwREg6I96b2c9BxvTn9-T5A-nWyVrhjOKVF5aVZ2vy-dau6rX3GfEKSFvdCI63TQCWhPZJ0e0fbr2ctql8Dz1vGlN7BxIMsAm5EN0f4A1TuW2VsDOosi67yYDVCT",
	},
	{
		id: "#KV-8919-T",
		devotee: "Priya Kulkarni",
		initials: "PK",
		date: "Oct 23, 2023",
		collection: "Temple Silk",
		amount: "₹45,200.00",
		status: "Shipped",
		address: "A-504, Vrindavan Heights, Pune, MH 411001",
		history: [
			{ title: "Divine Confirmation", date: "Oct 23, 09:15 AM" },
			{ title: "Consecration Complete", date: "Oct 23, 04:00 PM" },
			{ title: "Shipped via Sacred Express", date: "Oct 24, 08:00 AM" },
		],
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmZ9KivkJ2Wue7XjLv4dZtaHpHY2YB2YAePwXlp70iVXIbFE69vhczsBRsfKTdBVTxcC8W8NkywGpEf3QI8uVG-6fHFIMbDmxDbM5WVE3Dc4rylKAcgdlcfilCajJyMIfCrFMvCj7Jsm3Aeinem4zpChw2fzHeeq5gE5kPeXhSLYnhuapnrcKPYs9A9HOxdE-g4ZylTIukZSZhqrFQ4NR-JwPBZSskAlOUJcOjymEq8MoZFPV2Hp1kM7JK74AFf9cwaz_KNR2oEEdv",
	},
	{
		id: "#KV-8915-A",
		devotee: "Meera Sharma",
		initials: "MS",
		date: "Oct 21, 2023",
		collection: "Artisan Jewelry",
		amount: "₹8,900.00",
		status: "Delivered",
		address: "Flat 12, Peacock Apartments, New Delhi 110001",
		history: [
			{ title: "Divine Confirmation", date: "Oct 21, 02:30 PM" },
			{ title: "Dispatch Complete", date: "Oct 22, 10:00 AM" },
			{ title: "Delivered at Doorstep", date: "Oct 23, 05:30 PM" },
		],
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkYQhqK1ZsDbbS47V2-J2ZwLMyh3wyyJgQcXR3MR7gnKqK32LLWL14ctbgUks50nUVvMYdsMW-ojc75gd4N1JTiTmswAt_n9AS7FKNBTDjrksZSMCADMawoFZULaxo0vx6Yq2v6YQ6fFrRJRd8lNkAr9PsH_oFBXgsdMjC25Or4QBCDFOLPoYMFKwK8pFN02lcbmYdzfXZtWYd0VQxRnI1_U6U3PPPd7WmCd-ncGtzf3zEwtQB10BHJ9tEprgZsT-BsDo8S2jKry7",
	},
	{
		id: "#KV-8912-W",
		devotee: "Arjun Singh",
		initials: "AS",
		date: "Oct 20, 2023",
		collection: "Sandalwood",
		amount: "₹18,300.00",
		status: "Shipped",
		address: "10, Sacred Grove Road, Mysore, KA 570001",
		history: [
			{ title: "Divine Confirmation", date: "Oct 20, 11:00 AM" },
			{ title: "Dispatch Complete", date: "Oct 21, 09:00 AM" },
		],
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkYQhqK1ZsDbbS47V2-J2ZwLMyh3wyyJgQcXR3MR7gnKqK32LLWL14ctbgUks50nUVvMYdsMW-ojc75gd4N1JTiTmswAt_n9AS7FKNBTDjrksZSMCADMawoFZULaxo0vx6Yq2v6YQ6fFrRJRd8lNkAr9PsH_oFBXgsdMjC25Or4QBCDFOLPoYMFKwK8pFN02lcbmYdzfXZtWYd0VQxRnI1_U6U3PPPd7WmCd-ncGtzf3zEwtQB10BHJ9tEprgZsT-BsDo8S2jKry7",
	},
];

export default function OrderManagement() {
	const navigate = useNavigate();
	const [orders, setOrders] = useState(INITIAL_ORDERS);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrder, setSelectedOrder] = useState(null);

	// Dropdown states
	const [showNotifications, setShowNotifications] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const filteredOrders = orders.filter((o) =>
		o.devotee.toLowerCase().includes(searchQuery.toLowerCase()) ||
		o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
		o.collection.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='min-h-screen bg-surface font-sans text-on-surface flex'>
			{/* SIDEBAR: SideNavBar */}
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
					{[
						{ id: "dashboard", label: "Dashboard", icon: "dashboard", path: "/admin/dashboard" },
						{ id: "products", label: "Products", icon: "inventory_2", path: "/admin/products" },
						{ id: "orders", label: "Orders", icon: "shopping_cart", path: "/admin/orders" },
						{ id: "users", label: "Users", icon: "group", path: "/admin/users" },
						{ id: "banners", label: "Banners", icon: "branding_watermark", path: "/admin/banners" },
					].map((tab) => {
						const isActive = tab.id === "orders";
						return (
							<button
								key={tab.id}
								onClick={() => navigate(tab.path)}
								className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium text-left group ${
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
						className='w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-tertiary-fixed transition-colors text-left'>
						<span className='material-symbols-outlined' data-icon='settings'>
							settings
						</span>
						<span className='text-sm'>Settings</span>
					</button>
					<button
						onClick={() => alert("Connecting to Divine Support Portal...")}
						className='w-full flex items-center gap-3 px-4 py-2 text-white/70 hover:text-tertiary-fixed transition-colors text-left'>
						<span className='material-symbols-outlined' data-icon='help'>
							help
						</span>
						<span className='text-sm'>Support</span>
					</button>
					<button
						onClick={() => alert("Logging out from Sacred Sanctuary...")}
						className='mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-tertiary-fixed text-primary font-bold rounded-lg transform active:scale-95 transition-all shadow-md hover:bg-[#e7c96f]'>
						<span className='material-symbols-outlined text-[20px]' data-icon='logout'>
							logout
						</span>
						Log Out
					</button>
				</div>
			</aside>

			{/* MAIN CONTAINER */}
			<div className='flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest'>
				{/* TOP BAR: TopNavBar */}
				<header className='h-16 bg-surface border-b border-outline-variant/30 flex justify-between items-center px-8 sticky top-0 z-40 shadow-sm'>
					{/* Search Panel */}
					<div className='flex items-center gap-6 w-1/3'>
						<div className='relative w-full max-w-sm group'>
							<span
								className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant'
								data-icon='search'>
								search
							</span>
							<input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full bg-surface-container border border-outline-variant/20 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-tertiary-fixed transition-all text-on-surface'
								placeholder='Find a sacred order...'
								type='text'
							/>
						</div>
					</div>

					{/* Navigation Icons & Profile */}
					<div className='flex items-center gap-6 relative'>
						<div className='relative'>
							<button
								onClick={() => setShowNotifications(!showNotifications)}
								className='relative text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container'>
								<span className='material-symbols-outlined' data-icon='notifications'>
									notifications
								</span>
								<span className='absolute top-1 right-1 w-2.5 h-2.5 bg-tertiary-fixed rounded-full ring-2 ring-surface animate-pulse'></span>
							</button>

							{showNotifications && (
								<div className='absolute right-0 mt-3 w-80 bg-surface border border-outline-variant/30 rounded-xl shadow-xl py-3 z-50 animate-fadeIn'>
									<div className='px-4 pb-2 border-b border-outline-variant/20 flex justify-between items-center'>
										<h4 className='font-serif font-bold text-[#081B4B]'>Sanctuary Alerts</h4>
										<span className='text-[10px] bg-tertiary-fixed text-primary font-bold px-2 py-0.5 rounded-full'>
											2 New
										</span>
									</div>
								</div>
							)}
						</div>

						<button
							onClick={() => alert("Settings panel...")}
							className='text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container'>
							<span className='material-symbols-outlined' data-icon='settings'>
								settings
							</span>
						</button>

						<div className='h-8 w-px bg-outline-variant/30 mx-1'></div>

						{/* Profile Icon */}
						<div className='relative'>
							<div
								onClick={() => setShowProfileMenu(!showProfileMenu)}
								className='flex items-center gap-3 cursor-pointer group p-1 rounded-lg hover:bg-surface-container transition-all'>
								<div className='text-right hidden lg:block'>
									<p className='font-body-md font-bold text-primary leading-none'>Admin Krishna</p>
									<p className='text-[10px] text-on-surface-variant/70 mt-1 uppercase font-semibold tracking-wider'>
										Divine Overseer
									</p>
								</div>
								<img
									alt='Admin Avatar'
									className='w-10 h-10 rounded-full border-2 border-tertiary-fixed object-cover group-hover:scale-105 transition-transform'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuDoo8tmTZnzuXBfS2J5apdfcgG5vLaqYbr6TPBBf2egBT2gnk8FVuDyXOmw3D0t_Xax4RWUpV6B4RKHufn_sx3r1hNv_IzdqgDrrrPjDfJmgz1pAYIMKgndStNcb9M0fRPdHYDEpc6eOm01GXyo5PemRuPULSd-sHzF8CShaQdvUxhxJqSHmfNSosRcIEL_pZxFOt4EL5GT-tt7I6mtrtocnAsVIYfwrzTZG6ZGsW8GZDoZPF97WkdC6muZ9xOgXypJpPka2ahDl9Xj'
								/>
							</div>
						</div>
					</div>
				</header>

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-10 animate-fadeIn'>
					{/* Page Header */}
					<div className='flex justify-between items-end mb-10'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>
								Sacred Orders
							</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								Overseeing the flow of divine garments and artisanal crafts.
							</p>
						</div>
						<button
							onClick={() => alert("Exporting scrolls...")}
							className='flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 text-primary hover:bg-surface-container transition-all font-semibold text-sm'>
							<span className='material-symbols-outlined' data-icon='file_download'>file_download</span>
							<span>Export Scroll</span>
						</button>
					</div>

					{/* Filters area */}
					<div className='bg-surface p-6 rounded-2xl mb-8 border border-outline-variant/20 shadow-sm flex flex-wrap gap-4 items-end'>
						<div className='flex-1 min-w-45'>
							<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
								Time Period
							</label>
							<select className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'>
								<option>Last 30 Days</option>
								<option>Last Quarter</option>
								<option>All Time</option>
							</select>
						</div>
						<div className='flex-1 min-w-45'>
							<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
								Divine Status
							</label>
							<select className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'>
								<option>All Orders</option>
								<option>Processing</option>
								<option>Shipped</option>
								<option>Delivered</option>
							</select>
						</div>
						<button className='bg-primary text-tertiary-fixed font-bold px-8 py-2.5 rounded-lg hover:bg-primary-container transition-all shadow-md transform active:scale-95 text-sm h-10.5'>
							Apply Filters
						</button>
					</div>

					{/* Orders Table */}
					<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse'>
								<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
									<tr>
										<th className='px-8 py-4'>Order ID</th>
										<th className='px-6 py-4'>Devotee Name</th>
										<th className='px-6 py-4'>Date</th>
										<th className='px-6 py-4'>Collection</th>
										<th className='px-6 py-4'>Total Amount</th>
										<th className='px-6 py-4'>Status</th>
										<th className='px-8 py-4 text-right'>Actions</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-outline-variant/10'>
									{filteredOrders.map((order, idx) => (
										<tr key={idx} className='hover:bg-surface-container-low/40 transition-colors group'>
											<td className='px-8 py-5 font-bold text-primary'>{order.id}</td>
											<td className='px-6 py-5'>
												<div className='flex items-center gap-3'>
													<div className='w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary border border-tertiary-fixed/30'>
														{order.initials}
													</div>
													<span className='font-medium'>{order.devotee}</span>
												</div>
											</td>
											<td className='px-6 py-5 text-on-surface-variant/80 text-sm'>{order.date}</td>
											<td className='px-6 py-5'>
												<span className='px-3 py-1 rounded-full bg-secondary-container/10 text-primary text-xs font-semibold border border-outline-variant/10'>
													{order.collection}
												</span>
											</td>
											<td className='px-6 py-5 font-bold text-primary'>{order.amount}</td>
											<td className='px-6 py-5'>
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
														order.status === "Delivered"
															? "bg-green-50 text-green-700 border border-green-200"
															: order.status === "Shipped"
															? "bg-blue-50 text-blue-700 border border-blue-200"
															: "bg-amber-50 text-amber-700 border border-amber-200"
													}`}>
													<span className={`w-1.5 h-1.5 rounded-full ${order.status === "Delivered" ? "bg-green-500" : order.status === "Shipped" ? "bg-blue-500 animate-pulse" : "bg-amber-500"}`} />
													{order.status}
												</span>
											</td>
											<td className='px-8 py-5 text-right'>
												<button
													onClick={() => setSelectedOrder(order)}
													className='text-primary font-bold text-sm hover:underline flex items-center gap-1 justify-end ml-auto group-hover:translate-x-1 transition-transform'>
													<span>View Details</span>
													<span className='material-symbols-outlined text-sm'>arrow_forward</span>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Summary Asymmetric row */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
						<div className='bg-primary text-tertiary-fixed p-8 rounded-2xl relative overflow-hidden shadow-md flex flex-col justify-between h-48'>
							<div>
								<p className='text-xs uppercase tracking-wider font-bold opacity-75 mb-2'>Total Treasury</p>
								<h4 className='font-serif text-3xl font-bold'>₹24,82,450</h4>
							</div>
							<div className='flex items-center gap-1 text-[10px] font-bold bg-[#2a1d00] px-3 py-1 rounded-full w-fit text-[#ffdfa0]'>
								<span className='material-symbols-outlined text-[10px]' data-icon='trending_up'>trending_up</span>
								<span>12% Growth this month</span>
							</div>
						</div>
						<div className='bg-surface p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-48'>
							<div>
								<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/70 mb-2'>Active Shipments</p>
								<h4 className='font-serif text-3xl font-bold text-primary'>32 Shipments</h4>
							</div>
							<p className='text-xs text-on-surface-variant/80'>Dispatched via Sacred Express</p>
						</div>
						<div className='bg-[#F5EEDC] p-8 rounded-2xl border border-[#E7C96F]/30 shadow-sm flex flex-col justify-between h-48'>
							<div>
								<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/70 mb-2'>Pending Blessings</p>
								<h4 className='font-serif text-3xl font-bold text-primary'>05 Processings</h4>
							</div>
							<p className='text-xs text-on-surface-variant/80 italic'>Expected dispatch: within 48 sun-hours.</p>
						</div>
					</div>
				</main>
			</div>

			{/* Order Detail Modal */}
			{selectedOrder && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
					<div className='bg-surface w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30'>
						<div className='p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30'>
							<h3 className='font-serif text-2xl font-bold text-primary'>Sacred Request {selectedOrder.id}</h3>
							<button onClick={() => setSelectedOrder(null)} className='text-outline-variant hover:text-primary focus:outline-none'>
								<span className='material-symbols-outlined' data-icon='close'>close</span>
							</button>
						</div>

						<div className='p-6 space-y-6 max-h-125 overflow-y-auto pr-2'>
							<div className='flex items-center gap-6 bg-surface-container p-4 rounded-xl border border-outline-variant/10'>
								<img className='w-20 h-24 rounded-lg object-cover shadow-sm bg-surface-container-low' src={selectedOrder.image} alt={selectedOrder.collection} />
								<div>
									<h4 className='font-bold text-primary text-lg'>{selectedOrder.collection} Deity Attire</h4>
									<p className='text-xs text-on-surface-variant/80 mt-1'>Exclusive Artisan Piece</p>
									<p className='font-serif font-bold text-tertiary-fixed-dim text-base mt-2'>{selectedOrder.amount}</p>
								</div>
							</div>

							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								<div>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-3'>Patron / Devotee</p>
									<p className='font-bold text-primary mb-1'>{selectedOrder.devotee}</p>
									<p className='text-sm text-on-surface-variant/80 leading-relaxed'>{selectedOrder.address}</p>
								</div>
								<div>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-3'>Sacred Timeline</p>
									<div className='space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant/20'>
										{selectedOrder.history.map((step, idx) => (
											<div key={idx} className='pl-6 relative'>
												<div className='absolute left-0 top-1.5 w-4.5 h-4.5 rounded-full bg-tertiary-fixed border-4 border-surface shadow-sm' />
												<p className='text-sm font-semibold text-primary'>{step.title}</p>
												<p className='text-[10px] text-on-surface-variant/70 mt-0.5'>{step.date}</p>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className='p-6 bg-surface-container border-t border-outline-variant/20 flex justify-end gap-3'>
							<button onClick={() => setSelectedOrder(null)} className='px-5 py-2.5 text-xs text-primary font-bold hover:bg-surface-container-high rounded-lg transition-colors'>
								Close Scroll
							</button>
							<button
								onClick={() => {
									alert(`Consign dispatch initiated for ${selectedOrder.id}`);
									setSelectedOrder(null);
								}}
								className='gradient-btn px-6 py-2.5 rounded-lg text-xs text-primary font-bold shadow-md hover:shadow-lg transition-all scale-100 active:scale-95'>
								Begin Dispatch
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
