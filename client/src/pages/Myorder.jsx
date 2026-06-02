/** @format */
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import api from "../services/api";

export default function MyOrders() {
	const navigate = useNavigate();
	const trackBtnRef = useRef(null);

	const { data: ordersData, isLoading, isError } = useQuery({
		queryKey: ["orders", "my-orders"],
		queryFn: async () => {
			const res = await api.get("/api/orders/my-orders");
			return res.data;
		},
	});

	const orders = ordersData?.orders || [];

	// Active orders: PENDING, CONFIRMED, PROCESSING, SHIPPED
	const activeOrders = orders.filter(o => 
		["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED"].includes(o.orderStatus)
	);

	// Past orders: DELIVERED, CANCELLED, RETURNED
	const pastOrders = orders.filter(o => 
		["DELIVERED", "CANCELLED", "RETURNED"].includes(o.orderStatus)
	);

	const handleTrackEnter = () => {
		if (trackBtnRef.current) {
			gsap.to(trackBtnRef.current, {
				scale: 1.05,
				y: -2,
				boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				duration: 0.4,
				ease: "power2.out",
			});
		}
	};

	const handleTrackLeave = () => {
		if (trackBtnRef.current) {
			gsap.to(trackBtnRef.current, {
				scale: 1,
				y: 0,
				boxShadow: "none",
				duration: 0.4,
				ease: "power2.out",
			});
		}
	};

	const getProgressDetails = (status) => {
		const steps = [
			{ label: "Ordered", checked: true, active: status === "PENDING" },
			{ label: "Shipped", checked: ["CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"].includes(status), active: ["CONFIRMED", "PROCESSING"].includes(status) },
			{ label: "In Transit", checked: ["SHIPPED", "DELIVERED"].includes(status), active: status === "SHIPPED" },
			{ label: "Delivered", checked: status === "DELIVERED", active: status === "DELIVERED" },
		];

		let width = "0%";
		if (status === "PENDING") {
			width = "0%";
		} else if (status === "CONFIRMED" || status === "PROCESSING") {
			width = "33%";
		} else if (status === "SHIPPED") {
			width = "66%";
		} else if (status === "DELIVERED") {
			width = "100%";
		}

		return { width, steps };
	};

	return (
		<section className='flex-1 bg-surface'>
			<header className='mb-8'>
				<h1 className='font-serif text-6xl text-primary mb-2'>
					Your Sacred Orders
				</h1>
				<p className='font-sans text-base text-on-surface-variant'>
					Review and track your recent acquisitions and spiritual garments.
				</p>
			</header>

			{/* Active Orders Section */}
			<div className='mb-section-gap'>
				<div className='flex items-center gap-4 mb-stack-md'>
					<h3 className='font-serif text-3xl font-bold text-primary p-1.5'>
						Active Orders
					</h3>
					<div className='h-px flex-1 bg-secondary-container/30' />
				</div>

				{isLoading ? (
					<div className='bg-surface-container-lowest border border-secondary-container rounded-[20px] p-12 text-center text-on-surface-variant font-sans'>
						<span className='material-symbols-outlined text-[48px] animate-spin mb-4 block text-primary'>
							progress_activity
						</span>
						Loading your divine orders...
					</div>
				) : isError ? (
					<div className='bg-surface-container-lowest border border-secondary-container rounded-[20px] p-12 text-center text-red-500 font-sans'>
						<span className='material-symbols-outlined text-[48px] mb-4 block'>
							error
						</span>
						Failed to load your orders. Please try again.
					</div>
				) : activeOrders.length === 0 ? (
					<div className='bg-surface-container-lowest border border-secondary-container rounded-[20px] p-12 text-center text-on-surface-variant font-sans border-dashed'>
						<span className='material-symbols-outlined text-[48px] text-tertiary/40 mb-3 block'>
							local_shipping
						</span>
						<p className='mb-6'>No active orders at the moment.</p>
						<button 
							onClick={() => navigate("/collection")}
							className='bg-primary text-surface px-6 py-3 font-sans text-xs rounded-md uppercase tracking-widest font-semibold hover:bg-primary/90 transition-colors'>
							Explore Divine Collections
						</button>
					</div>
				) : (
					activeOrders.map((order) => {
						const firstItem = order.items?.[0];
						const displayTitle = firstItem 
							? firstItem.productTitle + (order.items.length > 1 ? ` + ${order.items.length - 1} more` : "")
							: `Order #${order.orderNumber}`;
						const displayImg = firstItem?.productImage || "https://placehold.co/400x500?text=No+Image";
						
						// Delivery estimation: 7 days after placement
						const estDelivery = new Date(new Date(order.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric"
						});

						const { width, steps } = getProgressDetails(order.orderStatus);

						return (
							<div key={order.id} className='bg-surface-container-lowest border border-secondary-container rounded-[20px] p-6 shadow-sm overflow-hidden mb-6'>
								<div className='flex flex-col lg:flex-row gap-8'>
									{/* Product Thumbnail */}
									<div className='w-full lg:w-48 h-64 rounded-xl overflow-hidden bg-surface-container shrink-0'>
										<img
											className='w-full h-full object-cover'
											src={displayImg}
											alt={firstItem?.productTitle || ""}
										/>
									</div>

									{/* Order Info */}
									<div className='flex-1'>
										<div className='flex flex-wrap justify-between items-start mb-6 gap-4'>
											<div>
												<h4 className='font-serif text-2xl text-on-surface'>
													{displayTitle}
												</h4>
												<p className='font-sans text-sm font-semibold text-on-surface-variant mt-1'>
													Order #{order.orderNumber}
												</p>
											</div>

											<div className='text-right'>
												<p className='font-sans text-xs text-on-surface-variant uppercase tracking-widest'>
													Est. Delivery
												</p>
												<p className='font-serif text-2xl text-secondary'>
													{estDelivery}
												</p>
											</div>
										</div>

										{/* Progress Tracker */}
										<div className='mb-8 px-4'>
											<div className='relative flex justify-between items-center'>
												{/* Connection Line */}
												<div className='absolute top-4 left-0 w-full h-1 bg-surface-container-high z-0 rounded-full'>
													<div className='h-full bg-secondary-container transition-all duration-500 rounded-full' style={{ width }} />
												</div>

												{/* Steps */}
												{steps.map((step, idx) => {
													return (
														<div key={idx} className='relative z-10 flex flex-col items-center'>
															{step.checked ? (
																<div className='w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-md'>
																	<span className='material-symbols-outlined text-sm font-bold'>
																		check
																	</span>
																</div>
															) : step.active ? (
																<div className='w-8 h-8 rounded-full border-2 border-secondary-container bg-surface-container-lowest flex items-center justify-center shadow-md'>
																	<div className='w-3 h-3 rounded-full bg-secondary-container animate-pulse' />
																</div>
															) : (
																<div className='w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-high flex items-center justify-center' />
															)}
															<span className={`font-sans text-xs mt-2 ${step.checked || step.active ? 'text-on-surface font-semibold' : 'text-on-surface-variant'}`}>
																{step.label}
															</span>
														</div>
													);
												})}
											</div>
										</div>

										<div className='flex gap-4 items-center'>
											<button 
												ref={trackBtnRef}
												onMouseEnter={handleTrackEnter}
												onMouseLeave={handleTrackLeave}
												className='bg-white text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary px-8 py-3 rounded-full font-sans text-sm font-semibold border border-secondary-container transition-all duration-300'>
												Track Package
											</button>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>

			{/* Order History Section */}
			<div className='mb-section-gap'>
				<div className='flex items-center gap-4 mb-stack-md'>
					<h3 className='font-serif text-3xl font-bold text-primary p-1.5'>
						Order History
					</h3>
					<div className='h-px flex-1 bg-secondary-container/30' />
				</div>

				<div className='space-y-4'>
					{isLoading ? (
						<div className='bg-surface-container-lowest border border-secondary-container/20 rounded-xl p-12 text-center text-on-surface-variant font-sans'>
							Loading history...
						</div>
					) : pastOrders.length === 0 ? (
						<div className='text-center py-12 text-on-surface-variant font-sans bg-surface-container-lowest rounded-xl border border-secondary-container/20 border-dashed'>
							No previous order history.
						</div>
					) : (
						pastOrders.map((order) => {
							const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
								month: "short",
								day: "numeric",
								year: "numeric"
							});

							let statusClass = "bg-secondary-container/20 text-secondary";
							let statusText = "Delivered";
							if (order.orderStatus === "CANCELLED") {
								statusClass = "bg-surface-container-highest text-on-surface-variant";
								statusText = "Cancelled";
							} else if (order.orderStatus === "RETURNED") {
								statusClass = "bg-tertiary/10 text-tertiary border border-tertiary/20";
								statusText = "Returned";
							}

							return (
								<div key={order.id} className='bg-surface-container-lowest border border-secondary-container/20 rounded-xl p-5 flex flex-wrap items-center gap-6 transition-all hover:border-secondary-container/50'>
									<div className='flex -space-x-4 overflow-hidden shrink-0'>
										{order.items?.map((item, idx) => (
											<img
												key={item.id || idx}
												alt='Item thumbnail'
												className='inline-block h-16 w-16 rounded-lg ring-2 ring-surface-container-lowest object-cover bg-surface-container'
												src={item.productImage || "https://placehold.co/400x500?text=No+Image"}
											/>
										))}
									</div>

									<div className='flex-1 min-w-50'>
										<div className='flex items-center gap-3 mb-1'>
											<span className='font-sans text-sm font-semibold text-on-surface'>
												#{order.orderNumber}
											</span>
											<span className={`${statusClass} px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter`}>
												{statusText}
											</span>
										</div>
										<p className='font-sans text-sm text-on-surface-variant'>
											Ordered on {orderDate}
										</p>
									</div>

									<div className='text-right'>
										<p className='font-serif text-2xl text-primary'>₹{Number(order.finalAmount).toLocaleString("en-IN")}</p>
										<p className='font-sans text-xs text-on-surface-variant'>
											{order.items?.length || 0} {order.items?.length === 1 ? "Item" : "Items"}
										</p>
									</div>

									<div className='flex gap-2'>
										<button 
											onClick={() => navigate("/profile/orders")}
											className='px-5 py-2 border border-secondary-container text-secondary font-sans text-sm font-semibold rounded-full hover:bg-secondary-container/5 transition-colors cursor-pointer'>
											View Details
										</button>
										<button 
											onClick={() => navigate("/collection")}
											className='px-5 py-2 bg-primary text-surface font-sans text-sm font-semibold rounded-full hover:opacity-90 transition-opacity cursor-pointer'>
											Reorder
										</button>
									</div>
								</div>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
