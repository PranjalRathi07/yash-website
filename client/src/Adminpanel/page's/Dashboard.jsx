import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../../services/api";


export default function Dashboard() {
	const navigate = useNavigate();
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Time state
	const [time, setTime] = useState(new Date());

	// Interaction States
	const [hoveredBar, setHoveredBar] = useState(null);

	const fetchDashboardData = async () => {
		try {
			setError(null);
			const response = await api.get("/api/admin/dashboard");
			if (response.data.success) {
				setStats(response.data.stats);
			}
		} catch (err) {
			console.error("Dashboard statistics load error:", err);
			setError("Failed to retrieve live metrics from the temple database.");
		} finally {
			setLoading(false);
		}
	};

	// Fetch stats on mount safely
	useEffect(() => {
		let isMounted = true;
		const loadData = async () => {
			if (isMounted) {
				await fetchDashboardData();
			}
		};
		loadData();
		return () => { isMounted = false; };
	}, []);

	// Fetch current date/time
	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const formatDate = (date) => {
		const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("en-US", dateOptions);
	};

	const formatTime = (date) => {
		const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
		return date.toLocaleTimeString("en-US", timeOptions);
	};

	const dashboardMetrics = stats
		? [
				{
					id: "revenue",
					label: "TOTAL REVENUE",
					value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`,
					change: "Live DB",
					icon: "payments",
					changeColor: "text-green-600 bg-green-50",
				},
				{
					id: "orders",
					label: "SACRED ORDERS",
					value: stats.totalOrders.toString(),
					change: `Pending: ${stats.pendingOrders}`,
					icon: "eco",
					changeColor: stats.pendingOrders > 0 ? "text-amber-600 bg-amber-50" : "text-green-600 bg-green-50",
				},
				{
					id: "devotees",
					label: "TOTAL DEVOTEES",
					value: stats.totalCustomers.toString(),
					change: "Registered",
					icon: "person_celebrate",
					changeColor: "text-[#D4A017] bg-[#f5ead4]/50",
				},
				{
					id: "products",
					label: "SACRED ATTRIBUTES",
					value: stats.totalProducts.toString(),
					change: `Low Stock: ${stats.lowStockProducts.length}`,
					icon: "sell",
					changeColor: stats.lowStockProducts.length > 0 ? "text-red-600 bg-red-50" : "text-[#081B4B] bg-[#f5ead4]",
				},
		  ]
		: [];

	const dynamicPillars = stats?.categoryPillars && stats.categoryPillars.length > 0
		? stats.categoryPillars.map((pillar, idx) => {
				const colors = [
					{ color: "bg-[#E7C96F]", strokeColor: "#E7C96F" },
					{ color: "bg-[#b88a0e]", strokeColor: "#b88a0e" },
					{ color: "bg-[#102A66]", strokeColor: "#102A66" }
				];
				const defaultColor = colors[idx] || colors[2];
				return {
					label: pillar.label,
					percent: pillar.percent,
					value: pillar.value,
					color: defaultColor.color,
					strokeColor: defaultColor.strokeColor
				};
		  })
		: [];

	const mainPillarPercent = dynamicPillars[0]?.percent || 0;
	const c1Length = (dynamicPillars[0]?.percent / 100) * 251.2 || 0;
	const c2Length = (dynamicPillars[1]?.percent / 100) * 251.2 || 0;
	const c3Length = (dynamicPillars[2]?.percent / 100) * 251.2 || 0;

	return (
		<div className='min-h-screen bg-surface font-sans text-on-surface flex'>
			<Sidebar activeTab="dashboard" />

			{/* MAIN CONTAINER */}
			<div className='flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest'>
				<Topbar />

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-10 animate-fadeIn'>
					{/* Welcome Header */}
					<div className='flex justify-between items-end mb-10'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>
								Sacred Admin Sanctuary
							</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								May your oversight be as graceful as the peacock's dance.
							</p>
						</div>
						<div className='text-right'>
							<p className='text-xs font-semibold tracking-wider text-outline-variant mb-1 uppercase'>
								{formatDate(time)}
							</p>
							<p className='font-serif text-3xl font-bold text-primary tracking-wider'>
								{formatTime(time)}
							</p>
						</div>
					</div>

					{/* Metrics Grid */}
					{loading ? (
						<div className='flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-outline-variant/20 shadow-sm mb-12'>
							<span className='material-symbols-outlined text-[48px] text-tertiary animate-spin mb-4'>sync</span>
							<p className='text-on-surface-variant font-serif text-lg'>Retrieving sacred numbers from database...</p>
						</div>
					) : error ? (
						<div className='flex flex-col items-center justify-center p-12 bg-surface rounded-2xl border border-red-200 shadow-sm mb-12'>
							<span className='material-symbols-outlined text-[48px] text-red-600 mb-4'>error</span>
							<p className='text-red-700 font-bold'>{error}</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12'>
							{dashboardMetrics.map((metric) => (
								<div
									key={metric.id}
									className='bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-tertiary-fixed hover:-translate-y-1 transition-all duration-300 group cursor-pointer'>
									<div className='flex justify-between items-start mb-4'>
										<div className='p-3 rounded-xl bg-tertiary-fixed/15 text-primary group-hover:scale-110 transition-transform duration-300'>
											<span className='material-symbols-outlined' data-icon={metric.icon}>
												{metric.icon}
											</span>
										</div>
										<span className={`text-[10px] font-bold px-2 py-1 rounded ${metric.changeColor}`}>
											{metric.change}
										</span>
									</div>
									<p className='text-xs uppercase tracking-wider text-on-surface-variant/70 font-semibold'>
										{metric.label}
									</p>
									<h3 className='font-serif text-3xl font-bold text-primary mt-2 tracking-wide'>
										{metric.value}
									</h3>
								</div>
							))}
						</div>
					)}

					{/* Charts and Visualization (Bento Style) */}
					<div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12'>
						{loading ? (
							<>
								{/* Sales Growth Chart Skeleton */}
								<div className='lg:col-span-2 bg-surface p-8 rounded-2xl border border-outline-variant/20 shadow-sm'>
									<div className='flex justify-between items-center mb-8'>
										<div className='h-8 w-48 shimmer-bg rounded-lg' />
										<div className='h-8 w-32 shimmer-bg rounded-full' />
									</div>
									<div className='h-75 w-full flex items-end gap-3 md:gap-5 px-4'>
										{[...Array(12)].map((_, idx) => (
											<div key={idx} className='flex-1 rounded-t-xl shimmer-bg' style={{ height: `${25 + (idx % 3) * 20}%` }} />
										))}
									</div>
									<div className='flex justify-between mt-4 px-4'>
										{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => (
											<span key={idx} className='w-full text-center text-xs font-semibold tracking-wider text-on-surface-variant/40 uppercase font-sans'>
												{m}
											</span>
										))}
									</div>
								</div>

								{/* Top Selling Categories (Sacred Pillars) Skeleton */}
								<div className='bg-primary p-8 rounded-2xl border border-outline-variant/10 shadow-lg flex flex-col items-center justify-between min-h-95'>
									<div className='h-8 w-32 bg-white/20 shimmer-bg rounded-lg mb-4' />
									<div className='w-48 h-48 my-4 rounded-full border-10 border-white/10 flex items-center justify-center relative bg-white/5 shimmer-bg'>
										<div className='text-center space-y-2'>
											<div className='h-6 w-12 bg-white/20 shimmer-bg rounded mx-auto' />
											<div className='h-3 w-16 bg-white/20 shimmer-bg rounded mx-auto' />
										</div>
									</div>
									<div className='w-full space-y-3 mt-4'>
										{[...Array(3)].map((_, idx) => (
											<div key={idx} className='flex justify-between items-center'>
												<div className='flex items-center gap-2.5'>
													<span className='w-2.5 h-2.5 rounded-full bg-white/20 shimmer-bg' />
													<div className='h-3 w-20 bg-white/20 shimmer-bg rounded' />
												</div>
												<div className='h-3 w-10 bg-white/20 shimmer-bg rounded' />
											</div>
										))}
									</div>
								</div>
							</>
						) : (
							<>
								{/* Sales Growth Chart */}
								<div className='lg:col-span-2 bg-surface p-8 rounded-2xl border border-outline-variant/20 shadow-sm'>
									<div className='flex justify-between items-center mb-8'>
										<h4 className='font-serif text-2xl font-bold text-primary'>
											Sales Growth Narrative
										</h4>
										<div className='flex gap-2 bg-surface-container p-1 rounded-full border border-outline-variant/10'>
											<button className='px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-tertiary-fixed shadow-sm cursor-pointer'>
												Monthly
											</button>
											<button className='px-4 py-1.5 rounded-full text-xs font-bold text-on-surface-variant/80 hover:bg-surface-container-high transition-colors cursor-pointer'>
												Yearly
											</button>
										</div>
									</div>

									{/* Chart Live Visualization */}
									<div className='h-75 w-full flex items-end gap-3 md:gap-5 px-4 relative'>
										{(stats?.salesGrowth || []).map((bar, idx) => {
											const heightVal = bar.heightPercent !== undefined ? `${bar.heightPercent}%` : "0%";
											const amountVal = bar.amount;
											
											return (
												<div
													key={idx}
													onMouseEnter={() => setHoveredBar(idx)}
													onMouseLeave={() => setHoveredBar(null)}
													style={{ height: heightVal }}
													className="flex-1 rounded-t-xl group relative cursor-pointer transition-all duration-500 bg-surface-container-high hover:bg-secondary-container">
													{/* Floating Tooltip */}
													<div
														className={`absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-tertiary-fixed text-[10px] py-1 px-2.5 rounded-lg shadow-md font-bold whitespace-nowrap transition-all duration-300 ${
															hoveredBar === idx ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
														}`}>
														{amountVal}
													</div>
												</div>
											);
										})}
									</div>

									{/* Months labels */}
									<div className='flex justify-between mt-4 px-4 text-xs font-semibold tracking-wider text-on-surface-variant/80 uppercase font-sans'>
										{(stats?.salesGrowth || []).map((bar, idx) => (
											<span key={idx} className='w-full text-center'>
												{bar.month}
											</span>
										))}
									</div>
								</div>

								{/* Top Selling Categories (Sacred Pillars) */}
								<div className='bg-primary p-8 rounded-2xl border border-outline-variant/10 shadow-lg flex flex-col items-center text-center justify-between'>
									<h4 className='font-serif text-2xl font-bold text-tertiary-fixed mb-4 tracking-wide'>
										Sacred Pillars
									</h4>

									{/* Custom Interactive SVG Donut */}
									<div className='relative w-48 h-48 my-4'>
										<svg className='w-full h-full transform -rotate-90' viewBox='0 0 100 100'>
											<circle
												cx='50'
												cy='50'
												fill='transparent'
												r='40'
												stroke='#102A66'
												strokeWidth='10'
												className='opacity-10'
											/>
											{dynamicPillars[0] && (
												<circle
													cx='50'
													cy='50'
													fill='transparent'
													r='40'
													stroke={dynamicPillars[0].strokeColor}
													strokeDasharray={`${c1Length} 251.2`}
													strokeDashoffset='0'
													strokeLinecap='round'
													strokeWidth='10'
													className='transition-all duration-500 hover:stroke-width-[12px]'
												/>
											)}
											{dynamicPillars[1] && (
												<circle
													cx='50'
													cy='50'
													fill='transparent'
													r='40'
													stroke={dynamicPillars[1].strokeColor}
													strokeDasharray={`${c2Length} 251.2`}
													strokeDashoffset={`-${c1Length}`}
													strokeLinecap='round'
													strokeWidth='10'
													className='transition-all duration-500 hover:stroke-width-[12px]'
												/>
											)}
											{dynamicPillars[2] && (
												<circle
													cx='50'
													cy='50'
													fill='transparent'
													r='40'
													stroke={dynamicPillars[2].strokeColor}
													strokeDasharray={`${c3Length} 251.2`}
													strokeDashoffset={`-${c1Length + c2Length}`}
													strokeLinecap='round'
													strokeWidth='10'
													className='transition-all duration-500 hover:stroke-width-[12px]'
												/>
											)}
										</svg>
										<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center'>
											<p className='font-serif text-4xl font-bold text-white tracking-wide'>{mainPillarPercent}%</p>
											<p className='text-[10px] text-tertiary-fixed uppercase font-bold tracking-widest mt-1 truncate max-w-30'>
												{dynamicPillars[0]?.label || "No Sales"}
											</p>
										</div>
									</div>

									{/* Pillars Legend */}
									<div className='w-full space-y-3 mt-4'>
										{dynamicPillars.length === 0 ? (
											<p className='text-white/60 text-xs italic mt-2'>No category sales logged yet.</p>
										) : (
											dynamicPillars.map((pillar, idx) => (
												<div key={idx} className='flex justify-between items-center text-xs'>
													<div className='flex items-center gap-2.5'>
														<span className={`w-2.5 h-2.5 rounded-full ${pillar.color}`} />
														<span className='text-white/80 font-medium truncate max-w-37.5'>{pillar.label}</span>
													</div>
													<span className='text-tertiary-fixed font-bold tracking-wide'>{pillar.value}</span>
												</div>
											))
										)}
									</div>
								</div>
							</>
						)}
					</div>

					{/* Recent Orders Table */}
					<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
						<div className='px-8 py-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30'>
							<h4 className='font-serif text-2xl font-bold text-primary'>
								Recent Sanctuary Requests
							</h4>
							<button
								onClick={() => navigate("/admin/orders")}
								className='text-primary font-bold text-sm hover:underline decoration-tertiary-fixed decoration-2 underline-offset-6 transition-all cursor-pointer'>
								View All Orders
							</button>
						</div>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse'>
								<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
									<tr>
										<th className='px-8 py-4'>Order Number</th>
										<th className='px-8 py-4'>Devotee</th>
										<th className='px-8 py-4'>Date</th>
										<th className='px-8 py-4'>Payment Mode</th>
										<th className='px-8 py-4'>Amount</th>
										<th className='px-8 py-4'>Status</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-outline-variant/10'>
									{loading ? (
										<tr>
											<td colSpan={6} className='text-center p-8 text-on-surface-variant/60 font-serif italic'>Loading recent requests...</td>
										</tr>
									) : error || !stats?.recentOrders || stats.recentOrders.length === 0 ? (
										<tr>
											<td colSpan={6} className='text-center p-8 text-on-surface-variant/60 font-serif italic'>No recent requests logged in sanctuary.</td>
										</tr>
									) : (
										stats.recentOrders.map((order, idx) => {
											const initials = order.fullName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) || "KV";
											const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
											
											return (
												<tr key={order.id || idx} className='hover:bg-surface-container-low/40 transition-colors group'>
													<td className='px-8 py-5 font-bold text-primary tracking-wide'>{order.orderNumber}</td>
													<td className='px-8 py-5'>
														<div className='flex items-center gap-3'>
															<div className='w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary border border-tertiary-fixed/30'>
																{initials}
															</div>
															<span className='font-medium'>{order.fullName}</span>
														</div>
													</td>
													<td className='px-8 py-5 text-on-surface-variant/80 text-sm'>{orderDate}</td>
													<td className='px-8 py-5'>
														<span className='px-3 py-1 rounded-full bg-secondary-container/10 text-primary text-xs font-semibold border border-outline-variant/10'>
															{order.paymentMethod || "COD"}
														</span>
													</td>
													<td className='px-8 py-5 font-bold text-primary'>₹{Number(order.finalAmount).toLocaleString("en-IN")}</td>
													<td className='px-8 py-5'>
														<span
															className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
																order.orderStatus === "DELIVERED"
																	? "bg-green-50 text-green-700 border border-green-200"
																	: order.orderStatus === "SHIPPED"
																	? "bg-blue-50 text-blue-700 border border-blue-200"
																	: "bg-amber-50 text-amber-700 border border-amber-200"
															}`}>
															<span
																className={`w-1.5 h-1.5 rounded-full ${
																	order.orderStatus === "DELIVERED"
																		? "bg-green-500"
																		: order.orderStatus === "SHIPPED"
																		? "bg-blue-500"
																		: "bg-amber-500 animate-pulse"
																}`}
															/>
															{order.orderStatus}
														</span>
													</td>
												</tr>
											);
										})
									)}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
