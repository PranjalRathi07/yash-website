/** @format */

import React, { useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import gsap from "gsap";

export default function Cart() {
	const navigate = useNavigate();
	const location = useLocation();
	const checkoutBtnRef = useRef(null);
	const arrowRef = useRef(null);

	const isCheckout = location.pathname === "/cart/checkout";

	const handleMouseEnter = () => {
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
	};

	const handleMouseLeave = () => {
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
	};

	const cartItems = [
		{
			title: "Royal Blue Silk Kurta",
			meta: "Size: L | Color: Midnight Blue",
			stock: "In Stock",
			qty: 1,
			price: "₹ 4,500",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb8d-9xIPGvncN42nh1eQ49Plvk0XrlPBxjVyqsdhFscHA8PCTsh3qL4tYazL-WB2jAj4HjqDoFrL8Jyu5wW_nYQOwKlI-BzkubMgnfSrrTvweBPWbkEnkHNO1dyvtU5xcTob02Zne96NZceWKjfOp1qGAbHzva2stFrZJYbK9pau9LGimdpR2N4yLz4u7JzbHpIX2buM9I56P-nTGNUyh7kXsLTY-trjlXI0uLHFrWiX6uvlOFePzALHbMRZE3e2SgkefMVEMIIjz",
			alt: "Royal Blue Silk Kurta",
		},
		{
			title: "Golden Zari Dupatta",
			meta: "Size: Free | Color: Temple Gold",
			stock: "In Stock",
			qty: 2,
			price: "₹ 3,200",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5_8PIJLzjy4PzOLTTz_whomvOFq4DOpPCctlACmESiGQYOxBXvSXAwC8jGVokuqtazNf2U6dWA7NuziLHs4iUaD7Uo7Vs9dF0RiUypOe91rKeiQ0S4rqRLWHa4dR7TYxcfx2uKjgaGVc0XvAveftbF7w-1ZTTUq2eZNHmRbNSK6DycG0rYAtPdKikuUabsJTGstZsmOF0ClTc2lvkTQ4-2nynHORAj3noTB0YMEV53X4yfTMn0Gt6DhY9MB96T5y3uw-WSHyyRRc3",
			alt: "Golden Embroidered Dupatta",
		},
	];

	if (isCheckout) {
		return <Outlet />;
	}

	return (
		<div className='font-sans text-on-surface min-h-screen flex flex-col bg-surface antialiased selection:bg-tertiary/20 selection:text-primary'>
			{/* Main Content */}
			<main className='grow w-full px-8 md:px-16 lg:px-24 pt-10 pb-20'>
				<div className='mb-10 text-center relative'>
					<h1 className='font-serif text-6xl text-primary mb-2'>Your Cart</h1>
					<div className='mt-4 flex justify-center'>
						<div className='flex items-center justify-center w-full max-w-[120px]'>
							<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
							<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
							<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
					{/* Cart Items */}
					<div className='lg:col-span-8 flex flex-col gap-6'>
						{cartItems.map((item) => (
							<div
								key={item.title}
								onClick={() => navigate('/product/1')}
								className='bg-surface-container-low rounded-md p-6 flex flex-col sm:flex-row gap-8 items-center sm:items-start relative group transition-all duration-300 cursor-pointer'>
								<button
									type='button'
									aria-label='Remove item'
									onClick={(e) => e.stopPropagation()}
									className='absolute top-4 right-4 text-on-surface-variant/50 hover:text-primary transition-colors'>
									<span className='material-symbols-outlined text-[20px]'>
										close
									</span>
								</button>

								<div className='w-32 aspect-3/4 shrink-0 bg-surface rounded-md overflow-hidden'>
									<img
										alt={item.alt}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src={item.img}
									/>
								</div>

								<div className='grow flex flex-col justify-between h-full pt-2'>
									<div>
										<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
											{item.title}
										</h3>
										<p className='font-sans text-sm text-on-surface-variant mb-3'>
											{item.meta}
										</p>
										<p className='font-sans text-xs uppercase tracking-widest text-tertiary font-semibold'>
											{item.stock}
										</p>
									</div>

									<div className='flex justify-between items-center mt-6 sm:mt-0'>
										<div className='flex items-center border-[0.5px] border-tertiary/30 rounded-full bg-surface w-fit'>
											<button
												type='button'
												onClick={(e) => e.stopPropagation()}
												className='w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors'>
												<span className='material-symbols-outlined text-[16px]'>
													remove
												</span>
											</button>
											<span className='w-6 text-center font-sans text-sm text-on-surface font-medium'>
												{item.qty}
											</span>
											<button
												type='button'
												onClick={(e) => e.stopPropagation()}
												className='w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors'>
												<span className='material-symbols-outlined text-[16px]'>
													add
												</span>
											</button>
										</div>

										<span className='font-sans text-xl text-primary font-medium'>
											{item.price}
										</span>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Order Summary */}
					<div className='lg:col-span-4 sticky top-[120px]'>
						<div className='bg-surface-container-low rounded-md p-8 flex flex-col'>
							<h2 className='font-serif text-3xl text-primary mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
								Order Summary
							</h2>

							<div className='flex flex-col gap-5 mb-8'>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Subtotal (3 items)</span>
									<span className='text-on-surface'>₹ 10,900</span>
								</div>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Shipping</span>
									<span className='text-tertiary font-semibold'>Free</span>
								</div>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Discount</span>
									<span className='text-primary'>- ₹ 500</span>
								</div>
							</div>

							<div className='border-t-[0.5px] border-tertiary/20 pt-6 mb-8'>
								<div className='flex justify-between items-center mb-2'>
									<span className='font-sans text-lg uppercase tracking-widest text-primary font-medium'>
										Total
									</span>
									<span className='font-sans text-2xl text-primary font-medium'>
										₹ 10,400
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
