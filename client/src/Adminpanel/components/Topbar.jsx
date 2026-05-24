/** @format */

import { useState } from "react";

export default function Topbar({ searchQuery, setSearchQuery, placeholder = "Search the sanctuary..." }) {
	const [showNotifications, setShowNotifications] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	return (
		<header className='h-16 bg-surface border-b border-outline-variant/30 flex justify-between items-center px-8 sticky top-0 z-40 shadow-sm'>
			{/* Search Panel */}
			<div className='flex items-center gap-6 w-1/3'>
				{setSearchQuery !== undefined && (
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
							placeholder={placeholder}
							type='text'
						/>
					</div>
				)}
			</div>

			{/* Navigation Icons & Profile */}
			<div className='flex items-center gap-6 relative'>
				{/* Notifications */}
				<div className='relative'>
					<button
						onClick={() => setShowNotifications(!showNotifications)}
						className='relative text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container cursor-pointer'>
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
							<div className='divide-y divide-outline-variant/10 max-h-60 overflow-y-auto'>
								<div className='px-4 py-2.5 hover:bg-surface-container transition-colors'>
									<p className='text-xs font-semibold text-primary'>New Sacred Request #KV-8906</p>
									<p className='text-[10px] text-on-surface-variant/80 mt-0.5'>
										Neelam Mittal requested a custom Banarasi Silk.
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<button
					onClick={() => alert("Settings panel...")}
					className='text-on-surface-variant hover:text-primary transition-colors focus:outline-none p-1 rounded-full hover:bg-surface-container cursor-pointer'>
					<span className='material-symbols-outlined' data-icon='settings'>
						settings
					</span>
				</button>

				<div className='h-8 w-px bg-outline-variant/30 mx-1'></div>

				{/* Admin Avatar & Profile Dropdown */}
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

					{showProfileMenu && (
						<div className='absolute right-0 mt-3 w-56 bg-surface border border-outline-variant/30 rounded-xl shadow-xl py-2 z-50 animate-fadeIn'>
							<div className='px-4 py-2 border-b border-outline-variant/20'>
								<p className='text-xs font-semibold text-primary'>Krishna Vasanam Admin</p>
								<p className='text-[10px] text-on-surface-variant/70'>krishna@couture.com</p>
							</div>
							<button
								onClick={() => alert("Opening settings...")}
								className='w-full text-left px-4 py-2 text-xs text-primary hover:bg-surface-container transition-colors cursor-pointer'>
								Sanctuary Settings
							</button>
							<button
								onClick={() => alert("Opening profile...")}
								className='w-full text-left px-4 py-2 text-xs text-primary hover:bg-surface-container transition-colors cursor-pointer'>
								My Profile
							</button>
							<div className='border-t border-outline-variant/20 my-1'></div>
							<button
								onClick={() => alert("Logging out...")}
								className='w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-medium cursor-pointer'>
								Log Out
							</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
}
