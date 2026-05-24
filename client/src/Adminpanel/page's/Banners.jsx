/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_CAMPAIGNS = [
	{
		id: "camp-1",
		title: "Divine Winter Solstice Collection",
		placement: "Placement: Home Header",
		label: "Hero Display",
		dateRange: "Jan 01 - Feb 28, 2024",
		active: true,
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAM7HsHzX-shE2Rfr2Djh8-nCWwiG4gbiHGs7L0WojwHCQvwU-LOEj5VehliTgdAlitYiAh0pMJADCFf7R-LKKSG6M9EbaVmGJSNn01p4AmOn_OrehW-0GXt77rytgbD_6MiRja4LGdgM0u2mMu0eLCoN9MhvMq-iwCP-e0jx3wPPZL919u0Ot4ZWPmeWauaM0b6-iztrB4ING6MEbtWaT_J3K9syxKY5xIBowaC9JGheH2bMRlF6ZyvK1GD-RHDcVd-BM-C3JUAHxa",
	},
	{
		id: "camp-2",
		title: "Vigraha Accessories",
		placement: "Active in: All Jewelry",
		label: "Shop Sidebar",
		dateRange: "Indefinite",
		active: true,
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXnht6JjyF5FfWptPjCk9gUUK3LjaE4uhwCBMARdYo5b5C2CqM_ryNSqtlEGvbwogq3cnvmHuUrr2sTlGSf7n6cwBgmsMM05GNAEyvJ5-C36wXqYh3cmHTZzTaUYeyfPyhIWtjXcxRoLN1aNfN3AwZ3B6KHhoj1zymIaoIbTeMAjd-T9zgGlAz1nGhKPG71F3tI_A-3ljA78X41WdhC_e8ucIbAhUzfkzAlItdc3gkUU_pPWAXsHrEaMpgvC1orirmXF9w7vMiRCGr",
	},
	{
		id: "camp-3",
		title: "Janmashtami Specials",
		placement: "Scheduled: Aug 20",
		label: "Home Center",
		dateRange: "Aug 20 - Aug 30, 2024",
		active: false,
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPC6YSc8AdWpD7UQ59vN5rLoRE9j1YynHeAAhrHFUX4uNMYQG6XYwttwBfggc5Wna3C-uKU0BNg_5q0qBLHASl97VoSscGeZLfYsQDkRmWE40E-f10l3zcB41pB2cJIwtv_wFIfBt9LkMZgOwF31E_MHJiYVgp3UeH8uxXrv65XiymIV-1dc5zPj6tpWJoexxWUYuuExwER_7wUKUSKZJw_uTochxWTyfK03akiAWi6sUBnuZ_WkgyGioQF864cGMCWQcmrFlIyttF",
	},
	{
		id: "camp-4",
		title: "Aura of Tranquility",
		placement: "Active: Indefinite",
		label: "Shop Footer",
		dateRange: "Indefinite",
		active: true,
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7dbRJHVGbGyQbgk1CvMXr2qxWojRojKWH-OQs_cO46RTpJ0dZVQKq7F5cnoQwnVEx-Vt5knfkGtkAloMhflAa4KRVY1xFHW4tJ_IYbjNHI4om4Lh6wbv4sPypCXDop-JEHVcXqvCIn6KCW66Q0nUP4iF5HwyMdUZq6NR1DtoTrp5CgsAzwAJCbzAQ6Pf7DqsjtThXfQ0TCCu2wAoquxnDQb91uC91zuiMzYbJs8fcqGTT1na-Of9vVvOVI4Kc_7Q2iDbtLJuAA157",
	},
];

export default function Banners() {
	const navigate = useNavigate();
	const [campaigns, setCampaigns] = useState(INITIAL_CAMPAIGNS);
	const [searchQuery, setSearchQuery] = useState("");

	// Dropdown states
	const [showNotifications, setShowNotifications] = useState(false);
	const [] = useState(false);

	const handleToggleActive = (id) => {
		setCampaigns(
			campaigns.map((camp) =>
				camp.id === id ? { ...camp, active: !camp.active } : camp
			)
		);
	};

	const handleDeleteCampaign = (id) => {
		if (confirm("Are you sure you want to delete this visual campaign banner?")) {
			setCampaigns(campaigns.filter((c) => c.id !== id));
		}
	};

	const filteredCampaigns = campaigns.filter((c) =>
		c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		c.label.toLowerCase().includes(searchQuery.toLowerCase())
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
						const isActive = tab.id === "banners";
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
					<div className='flex items-center gap-6 flex-1'>
						<div className='relative w-full max-w-sm focus-within:ring-1 focus-within:ring-tertiary-fixed rounded-lg overflow-hidden border border-outline-variant/20'>
							<span className='material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant'>search</span>
							<input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className='w-full bg-surface-container-low pl-10 pr-4 py-2 text-sm focus:ring-0 placeholder:text-on-surface-variant/50 border-none text-on-surface'
								placeholder='Search banners...'
								type='text'
							/>
						</div>
					</div>

					{/* Navigation Icons & Profile */}
					<div className='flex items-center gap-4'>
						<button
							onClick={() => setShowNotifications(!showNotifications)}
							className='p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-surface-container'>
							<span className='material-symbols-outlined'>notifications</span>
						</button>
						<button
							onClick={() => alert("Settings...")}
							className='p-2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none rounded-full hover:bg-surface-container'>
							<span className='material-symbols-outlined'>settings</span>
						</button>
						<div className='h-8 w-8 rounded-full overflow-hidden border border-outline-variant ml-2 cursor-pointer'>
							<img
								alt='Admin Avatar'
								className='w-full h-full object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuDoo8tmTZnzuXBfS2J5apdfcgG5vLaqYbr6TPBBf2egBT2gnk8FVuDyXOmw3D0t_Xax4RWUpV6B4RKHufn_sx3r1hNv_IzdqgDrrrPjDfJmgz1pAYIMKgndStNcb9M0fRPdHYDEpc6eOm01GXyo5PemRuPULSd-sHzF8CShaQdvUxhxJqSHmfNSosRcIEL_pZxFOt4EL5GT-tt7I6mtrtocnAsVIYfwrzTZG6ZGsW8GZDoZPF97WkdC6muZ9xOgXypJpPka2ahDl9Xj'
							/>
						</div>
					</div>
				</header>

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-8 animate-fadeIn'>
					{/* Header Section */}
					<div className='flex justify-between items-end mb-12'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>Banner Sanctuary</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								Manage the visual aura of the Krishna Vasanam digital boutique.
							</p>
						</div>
						<button
							onClick={() => alert("Uploading new banner campaign...")}
							className='gradient-btn text-primary px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-transform active:scale-95'>
							<span className='material-symbols-outlined'>add_photo_alternate</span>
							<span>Upload New Banner</span>
						</button>
					</div>

					{/* Stats Cards */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
						{[
							{ label: "Active Banners", value: "08" },
							{ label: "Scheduled Items", value: "03" },
							{ label: "Total Views", value: "42.5k" },
							{ label: "Avg Click-through", value: "4.2%" },
						].map((stat, idx) => (
							<div key={idx} className='bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant/20 transition-all hover:border-tertiary-fixed'>
								<p className='text-on-surface-variant/70 text-xs font-bold uppercase tracking-wider mb-1'>{stat.label}</p>
								<p className='text-2xl font-serif font-bold text-primary'>{stat.value}</p>
							</div>
						))}
					</div>

					{/* Bento Campaigns List */}
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{filteredCampaigns.map((camp) => (
							<div
								key={camp.id}
								className={`bg-surface p-6 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-tertiary-fixed ${
									!camp.active ? "opacity-75" : ""
								}`}>
								<div className='aspect-video w-full rounded-xl overflow-hidden relative group mb-6 bg-surface-container'>
									<img
										className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
										src={camp.image}
										alt={camp.title}
									/>
									<div className='absolute top-4 left-4 bg-primary text-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border border-outline-variant/10'>
										{camp.label}
									</div>
								</div>

								<div className='flex-1 flex flex-col justify-between'>
									<div>
										<span className='text-xs font-semibold text-on-surface-variant/70 mb-2 block'>{camp.placement}</span>
										<h3 className='font-serif text-xl font-bold text-primary mb-4 leading-tight'>{camp.title}</h3>
										<div className='space-y-4 mb-6'>
											<div className='flex items-center justify-between p-3 bg-surface-container rounded-xl border border-outline-variant/10'>
												<span className='text-xs font-semibold text-primary'>Visibility</span>
												<label className='relative inline-flex items-center cursor-pointer'>
													<input
														type='checkbox'
														checked={camp.active}
														onChange={() => handleToggleActive(camp.id)}
														className='sr-only peer'
													/>
													<div className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
												</label>
											</div>
											<div className='flex items-center gap-3 text-on-surface-variant/80 text-xs font-semibold'>
												<span className='material-symbols-outlined text-[18px]'>calendar_today</span>
												<span>{camp.dateRange}</span>
											</div>
										</div>
									</div>

									<div className='flex gap-2 border-t border-outline-variant/15 pt-4'>
										<button
											onClick={() => alert(`Managing campaign ${camp.id}`)}
											className='flex-1 border border-outline-variant/30 text-primary py-2 rounded-lg hover:bg-surface-container transition-colors text-xs font-bold'>
											Manage Content
										</button>
										<button
											onClick={() => handleDeleteCampaign(camp.id)}
											className='p-2 border border-outline-variant/30 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors focus:outline-none'>
											<span className='material-symbols-outlined text-[18px]'>delete</span>
										</button>
									</div>
								</div>
							</div>
						))}

						{/* Add New campaign Campaign placeholder */}
						<div onClick={() => alert("Creating a new visual campaign...")} className='border-2 border-dashed border-outline-variant/50 rounded-2xl flex flex-col items-center justify-center p-8 text-center hover:bg-surface-container transition-all group cursor-pointer h-100'>
							<div className='w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:bg-tertiary-fixed transition-colors duration-300'>
								<span className='material-symbols-outlined text-[32px] text-on-surface-variant group-hover:text-primary'>add</span>
							</div>
							<h4 className='font-serif text-lg font-bold text-primary'>New Campaign</h4>
							<p className='text-xs text-on-surface-variant/70 mt-1'>Start a new visual narrative campaign</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
