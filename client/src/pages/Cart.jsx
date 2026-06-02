/** @format */

import { useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import api from "../services/api";

export default function Cart() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const checkoutBtnRef = useRef(null);
	const arrowRef = useRef(null);

	const isCheckout = location.pathname === "/cart/checkout";
	const isAuthenticated = !!localStorage.getItem("supabaseToken");

	const { data: cartData, isLoading, isError, error } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => {
			const res = await api.get("/api/cart");
			return res.data?.cart || { items: [] };
		},
		enabled: isAuthenticated,
	});

	const isUnauthorized = !isAuthenticated || error?.response?.status === 401;

	const cartItems = cartData?.items || [];

	const updateQtyMutation = useMutation({
		mutationFn: async ({ itemId, quantity }) => {
			return await api.put(`/api/cart/${itemId}`, { quantity });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	const deleteItemMutation = useMutation({
		mutationFn: async (itemId) => {
			return await api.delete(`/api/cart/${itemId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	const handleMouseEnter = () => {
		if (checkoutBtnRef.current && arrowRef.current) {
			gsap.to(checkoutBtnRef.current, {
				scale: 1.02,
				boxShadow: "0 8px 30px rgba(79,55,138,0.3)",
				duration: 0.3,
				ease: "power2.out",
			});
			gsap.to(arrowRef.current, {
				x: 5,
				duration: 0.3,
				ease: "power2.out",
			});
		}
	};

	const handleMouseLeave = () => {
		if (checkoutBtnRef.current && arrowRef.current) {
			gsap.to(checkoutBtnRef.current, {
				scale: 1,
				boxShadow: "0 4px 20px rgba(79,55,138,0.2)",
				duration: 0.3,
				ease: "power2.out",
			});
			gsap.to(arrowRef.current, {
				x: 0,
				duration: 0.3,
				ease: "power2.out",
			});
		}
	};

	// Computations
	const subtotal = cartItems.reduce((acc, item) => {
		const price = Number(item.variant?.price || item.product?.price || 0);
		return acc + price * item.quantity;
	}, 0);

	const discount = 0; // Can be wired to coupons later
	const total = subtotal - discount;
	const totalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	const handleSignInRedirect = () => {
		localStorage.removeItem("supabaseToken");
		localStorage.removeItem("currentUser");
		navigate("/login");
	};

	if (isCheckout) {
		return <Outlet />;
	}

	if (isUnauthorized) {
		return (
			<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased'>
				<main className='grow w-full px-8 md:px-16 lg:px-24 pt-20 pb-20 flex flex-col items-center justify-center text-center'>
					<div className='w-20 h-20 bg-linear-to-b from-tertiary/10 to-tertiary/20 rounded-full flex items-center justify-center mb-8 border border-tertiary/20 shadow-inner animate-pulse'>
						<span className='material-symbols-outlined text-[40px] text-tertiary select-none'>
							lock
						</span>
					</div>
					<h1 className='font-serif text-4xl md:text-5xl text-primary mb-4 font-bold tracking-tight'>
						Your Sacred Cart Awaits
					</h1>
					<p className='font-sans text-base text-on-surface-variant max-w-md mb-8 leading-relaxed'>
						Please sign in to view, edit, or checkout the divine garments selected for your deity.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						<button
							onClick={handleSignInRedirect}
							className='bg-primary text-surface px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-primary/95 transition-all shadow-[0_4px_20px_rgba(79,55,138,0.2)] hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer'>
							Sign In to Account
						</button>
						<button
							onClick={() => navigate("/collection")}
							className='bg-transparent border-[0.5px] border-tertiary/40 text-primary px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-bold hover:bg-surface-container-low transition-all hover:scale-[1.02] active:scale-95 duration-200 cursor-pointer'>
							Explore Collection
						</button>
					</div>
				</main>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased justify-center items-center'>
				<span className='material-symbols-outlined text-[48px] animate-spin text-primary mb-4'>
					progress_activity
				</span>
				<p className='font-sans text-sm text-on-surface-variant'>Loading your sacred items...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased justify-center items-center text-center px-6'>
				<span className='material-symbols-outlined text-[48px] text-red-500 mb-4'>
					error
				</span>
				<h1 className='font-serif text-3xl mb-2 text-on-surface'>Failed to Load Cart</h1>
				<p className='font-sans text-sm text-on-surface-variant mb-6'>
					Something went wrong while retrieving your cart. Please try again.
				</p>
				<button 
					onClick={() => queryClient.invalidateQueries({ queryKey: ["cart"] })}
					className='bg-primary text-surface px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-opacity'>
					Retry Loading
				</button>
			</div>
		);
	}

	if (cartItems.length === 0) {
		return (
			<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased'>
				<main className='grow w-full px-8 md:px-16 lg:px-24 pt-20 pb-20 flex flex-col items-center justify-center text-center'>
					<span className='material-symbols-outlined text-[64px] text-tertiary mb-6 animate-bounce'>
						shopping_bag
					</span>
					<h1 className='font-serif text-4xl text-primary mb-4'>Your Sacred Cart is Empty</h1>
					<p className='font-sans text-base text-on-surface-variant max-w-md mb-8'>
						Explore our premium collection of divine attire, meticulously crafted to adorn your beloved deity.
					</p>
					<button
						onClick={() => navigate("/collection")}
						className='bg-primary text-surface px-8 py-4 rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-colors shadow-lg'>
						Shop Krishna Vastra
					</button>
				</main>
			</div>
		);
	}

	return (
		<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow w-full px-8 md:px-16 lg:px-24 pt-10 pb-20'>
				<div className='mb-10 text-center relative'>
					<h1 className='font-serif text-6xl text-primary mb-2'>Your Cart</h1>
					<div className='mt-4 flex justify-center'>
						<div className='flex items-center justify-center w-full max-w-30'>
							<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
							<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
							<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
					{/* Cart Items */}
					<div className='lg:col-span-8 flex flex-col gap-6'>
						{cartItems.map((item) => {
							const itemPrice = Number(item.variant?.price || item.product?.price || 0);
							const metaParts = [];
							if (item.variant?.size) metaParts.push(`Size: ${item.variant.size}`);
							if (item.variant?.color) metaParts.push(`Color: ${item.variant.color}`);
							const metaText = metaParts.length > 0 ? metaParts.join(" | ") : (item.product?.category?.name || "Divine Pieces");
							const stockText = (item.product?.stock > 0 || item.variant?.stock > 0) ? "In Stock" : "Out of Stock";
							const displayImg = item.product?.images?.[0]?.url || "https://placehold.co/400x500?text=No+Image";

							return (
								<div
									key={item.id}
									onClick={() => navigate(`/product/${item.product?.slug}`)}
									className='bg-surface-container-low rounded-md p-6 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative group transition-all duration-300 cursor-pointer'>
									<button
										type='button'
										aria-label='Remove item'
										onClick={(e) => {
											e.stopPropagation();
											deleteItemMutation.mutate(item.id);
										}}
										className='absolute top-4 right-4 text-on-surface-variant/50 hover:text-primary transition-colors'>
										<span className='material-symbols-outlined text-[20px]'>
											close
										</span>
									</button>

									<div className='w-32 aspect-3/4 shrink-0 bg-surface rounded-md overflow-hidden'>
										<img
											alt={item.product?.title || ""}
											className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
											src={displayImg}
										/>
									</div>

									<div className='grow flex flex-col justify-between h-full pt-2'>
										<div>
											<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
												{item.product?.title}
											</h3>
											<p className='font-sans text-sm text-on-surface-variant mb-3'>
												{metaText}
											</p>
											<p className='font-sans text-xs uppercase tracking-widest text-tertiary font-semibold'>
												{stockText}
											</p>
										</div>

										<div className='flex justify-between items-center mt-6 sm:mt-0'>
											<div className='flex items-center border-[0.5px] border-tertiary/30 rounded-full bg-surface w-fit'>
												<button
													type='button'
													disabled={item.quantity <= 1 || updateQtyMutation.isPending}
													onClick={(e) => {
														e.stopPropagation();
														if (item.quantity > 1) {
															updateQtyMutation.mutate({ itemId: item.id, quantity: item.quantity - 1 });
														}
													}}
													className='w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30 disabled:hover:text-on-surface-variant'>
													<span className='material-symbols-outlined text-[16px]'>
														remove
													</span>
												</button>
												<span className='w-6 text-center font-sans text-sm text-on-surface font-medium'>
													{item.quantity}
												</span>
												<button
													type='button'
													disabled={updateQtyMutation.isPending}
													onClick={(e) => {
														e.stopPropagation();
														updateQtyMutation.mutate({ itemId: item.id, quantity: item.quantity + 1 });
													}}
													className='w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30'>
													<span className='material-symbols-outlined text-[16px]'>
														add
													</span>
												</button>
											</div>

											<span className='font-sans text-xl text-primary font-medium'>
												₹ {Number(itemPrice * item.quantity).toLocaleString("en-IN")}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Order Summary */}
					<div className='lg:col-span-4 sticky top-30'>
						<div className='bg-surface-container-low rounded-md p-8 flex flex-col'>
							<h2 className='font-serif text-3xl text-primary mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
								Order Summary
							</h2>

							<div className='flex flex-col gap-5 mb-8'>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Subtotal ({totalQty} {totalQty === 1 ? 'item' : 'items'})</span>
									<span className='text-on-surface'>₹ {subtotal.toLocaleString("en-IN")}</span>
								</div>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Shipping</span>
									<span className='text-tertiary font-semibold'>Free</span>
								</div>
								{discount > 0 && (
									<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
										<span>Discount</span>
										<span className='text-primary'>- ₹ {discount.toLocaleString("en-IN")}</span>
									</div>
								)}
							</div>

							<div className='border-t-[0.5px] border-tertiary/20 pt-6 mb-8'>
								<div className='flex justify-between items-center mb-2'>
									<span className='font-sans text-lg uppercase tracking-widest text-primary font-medium'>
										Total
									</span>
									<span className='font-sans text-2xl text-primary font-medium'>
										₹ {total.toLocaleString("en-IN")}
									</span>
								</div>
								<p className='font-sans text-[10px] uppercase tracking-widest text-on-surface-variant/50 text-right'>
									Inclusive of all taxes
								</p>
							</div>

							<div className='mb-8'>
								<label className='sr-only' htmlFor='coupon'>
									Coupon Code
								</label>
								<div className='flex flex-col gap-3'>
									<input
										id='coupon'
										type='text'
										placeholder='Enter Coupon Code'
										className='w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-3 px-1 transition-colors placeholder:text-on-surface-variant/50'
									/>
									<button
										type='button'
										className='bg-transparent border-[0.5px] border-tertiary/30 text-primary w-full py-3 rounded-full font-sans text-xs uppercase tracking-widest hover:border-primary transition-colors'>
										Apply Code
									</button>
								</div>
							</div>

							<button
								ref={checkoutBtnRef}
								type='button'
								onClick={() => navigate("/cart/checkout")}
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								className='w-full py-4 rounded-full bg-primary text-surface font-sans text-sm uppercase tracking-widest flex justify-center items-center gap-3 shadow-[0_4px_20px_rgba(79,55,138,0.2)] transition-colors duration-300'>
								<span>Proceed to Checkout</span>
								<span
									ref={arrowRef}
									className='material-symbols-outlined text-[18px]'
									style={{ fontVariationSettings: "'FILL' 1" }}>
									arrow_right_alt
								</span>
							</button>

							<div className='mt-8 flex justify-center items-center gap-2 text-on-surface-variant/60'>
								<span className='material-symbols-outlined text-[16px]'>
									lock
								</span>
								<span className='font-sans text-[10px] uppercase tracking-widest'>
									Secure Checkout Process
								</span>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
