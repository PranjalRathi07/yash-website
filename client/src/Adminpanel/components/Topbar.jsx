import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Topbar({ searchQuery, setSearchQuery, placeholder = "Search the sanctuary..." }) {
	const [showNotifications, setShowNotifications] = useState(false);
	const navigate = useNavigate();
	const [readOrderIds, setReadOrderIds] = useState(() => {
		const saved = localStorage.getItem("readOrderNotifications");
		return saved ? JSON.parse(saved) : [];
	});

	const [localUser] = useState(() => {
		const saved = localStorage.getItem("currentUser");
		return saved ? JSON.parse(saved) : null;
	});

	const { data: currentUser } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const res = await api.get("/api/auth/me");
			if (res.data?.user) {
				localStorage.setItem("currentUser", JSON.stringify(res.data.user));
			}
			return res.data.user;
		},
		initialData: localUser,
	});

	const { data: ordersData } = useQuery({
		queryKey: ["admin", "orders", "notifications"],
		queryFn: async () => {
			const res = await api.get("/api/orders/admin/all");
			return res.data;
		},
		refetchInterval: 30000,
	});

	const allOrders = ordersData?.orders || [];
	const unreadOrders = allOrders.filter(order => !readOrderIds.includes(order.id));

	const handleMarkAsChecked = (orderId, redirect = false) => {
		const updatedIds = [...readOrderIds, orderId];
		setReadOrderIds(updatedIds);
		localStorage.setItem("readOrderNotifications", JSON.stringify(updatedIds));
		if (redirect) {
			navigate(`/admin/orders?orderId=${orderId}`);
		}
	};

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
						{unreadOrders.length > 0 && (
							<span className='absolute top-1 right-1 w-2.5 h-2.5 bg-tertiary-fixed rounded-full ring-2 ring-surface animate-pulse'></span>
						)}
					</button>

					{showNotifications && (
						<div className='absolute right-0 mt-3 w-80 bg-surface border border-outline-variant/30 rounded-xl shadow-xl py-3 z-50 animate-fadeIn'>
							<div className='px-4 pb-2 border-b border-outline-variant/20 flex justify-between items-center'>
								<h4 className='font-serif font-bold text-[#081B4B]'>Sanctuary Alerts</h4>
								{unreadOrders.length > 0 && (
									<span className='text-[10px] bg-tertiary-fixed text-primary font-bold px-2 py-0.5 rounded-full'>
										{unreadOrders.length} New
									</span>
								)}
							</div>
							<div className='divide-y divide-outline-variant/10 max-h-60 overflow-y-auto'>
								{unreadOrders.length === 0 ? (
									<div className='px-4 py-6 text-center text-xs text-on-surface-variant/60 font-sans'>
										No new sanctuary notifications.
									</div>
								) : (
									unreadOrders.map((order) => (
										<div
											key={order.id}
											onClick={() => handleMarkAsChecked(order.id, true)}
											className='px-4 py-2.5 hover:bg-surface-container transition-colors cursor-pointer group flex justify-between items-start gap-2'>
											<div className='flex-1 min-w-0'>
												<p className='text-xs font-semibold text-primary group-hover:text-tertiary transition-colors truncate'>
													New Order {order.orderNumber}
												</p>
												<p className='text-[10px] text-on-surface-variant/80 mt-0.5 truncate'>
													Placed by {order.fullName || order.user?.name || "Devotee"} • ₹{Number(order.finalAmount).toLocaleString("en-IN")}
												</p>
												<p className='text-[8px] text-on-surface-variant/50 mt-0.5'>
													{new Date(order.createdAt).toLocaleString("en-IN")}
												</p>
											</div>
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleMarkAsChecked(order.id);
												}}
												title="Mark as read"
												className='text-on-surface-variant hover:text-red-600 cursor-pointer p-0.5 rounded-full hover:bg-surface-container-high transition-all flex items-center justify-center shrink-0'>
												<span className='material-symbols-outlined text-[14px]'>close</span>
											</button>
										</div>
									))
								)}
							</div>
						</div>
					)}
				</div>

				<div className='h-8 w-px bg-outline-variant/30 mx-1'></div>

				{/* Admin Avatar & Profile Dropdown */}
				<div className='relative'>
					<div
						className='flex items-center gap-3 cursor-pointer group p-1 rounded-lg hover:bg-surface-container transition-all'>
						<div className='text-right hidden lg:block'>
							<p className='font-body-md font-bold text-primary leading-none'>{currentUser?.name || "Admin"}</p>
							<p className='text-[10px] text-on-surface-variant/70 mt-1 uppercase font-semibold tracking-wider'>
								Divine Overseer
							</p>
						</div>
						{currentUser?.profilePic ? (
							<img
								alt='Admin Avatar'
								className='w-10 h-10 rounded-full border-2 border-tertiary-fixed object-cover group-hover:scale-105 transition-transform shrink-0'
								src={currentUser.profilePic}
							/>
						) : (
							<div className='w-10 h-10 rounded-full border-2 border-tertiary-fixed flex items-center justify-center bg-tertiary/10 text-tertiary group-hover:scale-105 transition-transform shrink-0'>
								<span className='material-symbols-outlined text-[20px]'>person</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
