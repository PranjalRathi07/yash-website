import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function ProfileDashboard() {
	const navigate = useNavigate();
	const [localUser] = useState(() => {
		const saved = localStorage.getItem("currentUser");
		return saved ? JSON.parse(saved) : null;
	});

	const { data: currentUser, isError: isAuthError } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			try {
				const res = await api.get("/api/auth/me");
				if (res.data?.user) {
					localStorage.setItem("currentUser", JSON.stringify(res.data.user));
				}
				return res.data.user;
			} catch (err) {
				localStorage.removeItem("currentUser");
				throw err;
			}
		},
		initialData: localUser,
		retry: false,
	});

	const { data: ordersData } = useQuery({
		queryKey: ["orders", "my-orders"],
		queryFn: async () => {
			const res = await api.get("/api/orders/my-orders");
			return res.data;
		},
		enabled: !!currentUser,
	});

	if (isAuthError || (!currentUser && localUser === null)) {
		return (
			<div className='flex flex-col items-center justify-center py-20 text-center'>
				<span className='material-symbols-outlined text-[64px] text-tertiary mb-6'>
					lock
				</span>
				<h2 className='font-serif text-4xl text-primary mb-4'>
					Authentication Required
				</h2>
				<p className='text-on-surface-variant font-sans text-lg mb-8 max-w-md mx-auto'>
					Your session has expired or you are not logged in. Please sign in to view your sacred profile.
				</p>
				<button
					onClick={() => navigate("/login")}
					className='bg-primary text-surface px-8 py-3 font-sans text-sm rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90 flex items-center gap-2 mx-auto'>
					<span className='material-symbols-outlined text-[20px]'>login</span>
					Sign in to Account
				</button>
			</div>
		);
	}

	const orders = ordersData?.orders || [];

	// Compute metrics dynamically from actual orders
	const totalPieces = orders.reduce((sum, order) => {
		return sum + (order.items?.reduce((itemSum, item) => itemSum + item.quantity, 0) || 0);
	}, 0);

	const activeOrdersCount = orders.filter(o => 
		["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"].includes(o.orderStatus)
	).length;

	const totalAmountSpent = orders.reduce((sum, order) => sum + Number(order.finalAmount || 0), 0);
	// Rewards points: e.g., 10% of total spent
	const rewardPoints = Math.round(totalAmountSpent / 10);

	return (
		<div className='space-y-12'>
			<div className='mb-12'>
				<h1 className='font-serif text-6xl text-primary mb-2'>
					Namaste, {currentUser?.name || "Devotee"}
				</h1>
				<p className='text-on-surface-variant font-sans text-lg'>
					Welcome back to your sacred sanctuary of style.
				</p>
			</div>
			{/* User Overview */}
			<section className='bg-surface-container-lowest rounded-md p-8 border-[0.5px] border-tertiary/20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden'>
				<div className='relative shrink-0'>
					{currentUser?.profilePic ? (
						<img
							alt='User Profile'
							className='w-32 h-32 rounded-full object-cover border-2 border-tertiary/30 p-1'
							src={currentUser.profilePic}
						/>
					) : (
						<div className='w-32 h-32 rounded-full border-2 border-tertiary/30 p-1 flex items-center justify-center bg-surface-container-low'>
							<div className='w-full h-full rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary'>
								<span className='material-symbols-outlined text-[48px]'>person</span>
							</div>
						</div>
					)}
					<div className='absolute bottom-2 right-2 bg-surface p-1 rounded-full text-tertiary'>
						<span
							className='material-symbols-outlined text-[20px]'
							style={{ fontVariationSettings: "'FILL' 1" }}>
							verified
						</span>
					</div>
				</div>

				<div className='space-y-2 text-center md:text-left grow'>
					<h2 className='font-serif text-3xl text-primary'>{currentUser?.name || "Devotee"}</h2>
					<p className='text-on-surface-variant font-sans flex justify-center md:justify-start items-center gap-2'>
						<span className='material-symbols-outlined text-[18px]'>mail</span>
						{currentUser?.email || "devotee@temple.com"}
					</p>
					<p className='text-on-surface-variant font-sans flex justify-center md:justify-start items-center gap-2'>
						<span className='material-symbols-outlined text-[18px]'>
							calendar_today
						</span>
						Member since {currentUser?.createdAt 
							? new Date(currentUser.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
							: "Jan 2026"}
					</p>
				</div>

				<button
					onClick={() => navigate("/profile/account-settings")}
					className='w-full md:w-auto bg-primary text-surface px-6 py-3 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90 whitespace-nowrap flex items-center justify-center gap-2 md:absolute md:top-8 md:right-8'>
					<span className='material-symbols-outlined text-[18px]'>edit</span>
					Edit Profile
				</button>
			</section>

			{/* Quick Stats Grid */}
			<section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{[
					{ icon: "apparel", label: "Divine Pieces Owned", value: totalPieces.toString().padStart(2, '0') },
					{ icon: "local_shipping", label: "Active Orders", value: activeOrdersCount.toString().padStart(2, '0') },
					{
						icon: "token",
						label: "Sacred Rewards Points",
						value: rewardPoints.toLocaleString("en-IN"),
					},
				].map((stat) => (
					<div
						key={stat.label}
						className='bg-surface-container-low rounded-md p-8 text-center border-[0.5px] border-tertiary/20 hover:border-tertiary transition-colors group'>
						<span className='material-symbols-outlined text-[32px] text-tertiary mb-4 group-hover:scale-110 transition-transform'>
							{stat.icon}
						</span>
						<p className='text-on-surface-variant font-sans text-[10px] uppercase tracking-widest font-semibold mb-2'>
							{stat.label}
						</p>
						<p className='font-serif text-4xl text-primary'>{stat.value}</p>
					</div>
				))}
			</section>

			{/* Recent Orders Section */}
			<section className='space-y-6'>
				<div className='flex justify-between items-end border-b-[0.5px] border-tertiary/20 pb-4'>
					<h3 className='font-serif text-3xl text-primary'>
						Recent Divine Acquisitions
					</h3>
					<button
						onClick={() => navigate("/profile/my-orders")}
						className='text-primary font-sans text-xs uppercase tracking-[0.15em] font-semibold hover:text-tertiary transition-colors pb-1 bg-transparent border-none cursor-pointer'>
						View All
					</button>
				</div>

				<div className='space-y-6'>
					{orders.length === 0 ? (
						<div className='text-center py-12 text-on-surface-variant font-sans bg-surface-container-low rounded-md border border-dashed border-tertiary/20'>
							<span className='material-symbols-outlined text-[48px] text-tertiary/40 mb-3 block'>
								shopping_bag
							</span>
							No purchases yet. Start your sacred style journey!
						</div>
					) : (
						orders.slice(0, 2).map((order) => {
							const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric"
							});

							const displayImg = order.items?.[0]?.productImage || "https://placehold.co/400x500?text=No+Image";

							let statusText = "Processing";
							let statusClass = "bg-tertiary/10 text-tertiary border-tertiary/20";
							if (order.orderStatus === "DELIVERED") {
								statusText = `Delivered`;
								statusClass = "bg-secondary-container/20 text-secondary border-secondary-container/10";
							} else if (order.orderStatus === "CANCELLED") {
								statusText = "Cancelled";
								statusClass = "bg-surface-container-highest text-on-surface-variant border-tertiary/10";
							} else if (order.orderStatus === "RETURNED") {
								statusText = "Returned";
								statusClass = "bg-tertiary/10 text-tertiary border-tertiary/20";
							} else if (order.orderStatus === "SHIPPED") {
								statusText = "Shipped";
								statusClass = "bg-primary/10 text-primary border-primary/20";
							} else if (order.orderStatus === "CONFIRMED") {
								statusText = "Confirmed";
								statusClass = "bg-primary/10 text-primary border-primary/20";
							}

							return (
								<div key={order.id} className='bg-surface-container-low rounded-md p-6 border-[0.5px] border-tertiary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-tertiary transition-colors'>
									<div className='flex gap-6 items-center'>
										<div className='w-20 h-24 bg-surface rounded-md overflow-hidden shrink-0'>
											<img
												alt='Product Thumb'
												className='object-cover w-full h-full'
												src={displayImg}
											/>
										</div>
										<div>
											<p className='font-serif text-2xl text-primary mb-1'>
												Order #{order.orderNumber}
											</p>
											<p className='text-on-surface-variant font-sans text-sm mb-2'>
												Placed on {orderDate}
											</p>
											<span className={`inline-block border px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold ${statusClass}`}>
												{statusText}
											</span>
										</div>
									</div>

									<div className='w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end md:gap-3'>
										<p className='font-sans text-2xl text-primary font-medium'>
											₹ {Number(order.finalAmount).toLocaleString("en-IN")}
										</p>
										<button 
											onClick={() => navigate("/profile/my-orders")}
											className='text-tertiary font-sans text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer'>
											Track Order
											<span className='material-symbols-outlined text-[16px]'>
												arrow_right_alt
											</span>
										</button>
									</div>
								</div>
							);
						})
					)}
				</div>
			</section>

			{/* Decorative Divider */}
			<div className='flex items-center justify-center gap-4 py-8 opacity-60'>
				<div className='h-[0.5px] w-full bg-linear-to-r from-transparent to-tertiary/50'></div>
				<span
					className='material-symbols-outlined text-[20px] text-tertiary'
					style={{ fontVariationSettings: "'FILL' 1" }}>
					diamond
				</span>
				<div className='h-[0.5px] w-full bg-linear-to-l from-transparent to-tertiary/50'></div>
			</div>
		</div>
	);
}
