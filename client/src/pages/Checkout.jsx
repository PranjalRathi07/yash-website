/** @format */

// Checkout.jsx
import React, { useState } from "react";

export default function Checkout() {
	const [selectedPayment, setSelectedPayment] = useState("card");

	return (
		<div className='bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col'>
			<main className='grow w-full px-8 md:px-16 lg:px-24 pt-10 pb-20'>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>
					{/* Left Column: Checkout Details */}
					<div className='lg:col-span-7 xl:col-span-8 space-y-12'>
						{/* Sacred Shipping Address */}
						<section>
							<div className='flex items-center gap-3 mb-6'>
								<span className='material-symbols-outlined text-tertiary text-[20px]'>
									location_on
								</span>
								<h2 className='font-serif text-3xl font-bold text-primary tracking-wide'>
									Sacred Shipping Address
								</h2>
							</div>

							<div className='bg-[#fdfaf5] p-6 rounded-md border-[0.5px] border-tertiary/30 flex justify-between items-start'>
								<div>
									<p className='font-sans text-sm font-semibold text-primary mb-1'>
										Arjun Das
									</p>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Vrindavan Dham, Sector 5, Lane 3
									</p>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Near ISKCON Temple, Mathura, UP - 281121
									</p>
									<p className='font-sans text-sm text-on-surface-variant mt-2'>
										+91 98765 43210
									</p>
								</div>
								<button
									type='button'
									className='text-tertiary font-sans text-sm font-semibold hover:underline transition-all'>
									Change
								</button>
							</div>
						</section>

						{/* Separator */}
						<div className='h-px bg-tertiary/20 flex items-center justify-center'>
							<span
								className='material-symbols-outlined text-tertiary/50 bg-surface px-4 text-[14px]'
								style={{ fontVariationSettings: "'FILL' 1" }}>
								diamond
							</span>
						</div>

						{/* Payment Method Section */}
						<section>
							<div className='flex items-center gap-3 mb-6'>
								<span className='material-symbols-outlined text-tertiary text-[20px]'>
									payments
								</span>
								<h2 className='font-serif text-3xl font-bold text-primary tracking-wide'>
									Payment Method
								</h2>
							</div>

							<div className='border-[0.5px] border-tertiary/20 rounded-md bg-surface flex flex-col overflow-hidden shadow-sm'>
								{/* Saved Cards */}
								<div
									className={`p-4 transition-all ${selectedPayment === "card" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}>
									<label className='flex items-center gap-4 cursor-pointer'>
										<div className='relative flex items-center justify-center shrink-0'>
											<input
												className='appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer'
												name='payment'
												type='radio'
												checked={selectedPayment === "card"}
												onChange={() => setSelectedPayment("card")}
											/>
										</div>
										<span className='font-sans text-sm font-bold text-primary grow'>
											Credit or Debit Card
										</span>
									</label>

									{selectedPayment === "card" && (
										<div className='mt-4 ml-8 p-4 border-[0.5px] border-tertiary/30 rounded-md bg-surface shadow-[0_0_15px_rgba(212,175,55,0.05)]'>
											<div className='flex justify-between items-center mb-1'>
												<span className='font-sans text-sm font-semibold text-primary'>
													Saved Credit Card
												</span>
												<span className='material-symbols-outlined text-tertiary/80 text-[20px]'>
													credit_card
												</span>
											</div>
											<p className='font-sans text-sm text-on-surface-variant mb-4'>
												HDFC Bank Platinum •••• 4242
											</p>
											<button
												type='button'
												className='font-sans text-xs font-semibold text-tertiary hover:underline flex items-center gap-1'>
												<span className='material-symbols-outlined text-[14px]'>
													add
												</span>
												Add a new credit or debit card
											</button>
										</div>
									)}
								</div>

								<div className='h-px bg-tertiary/20 w-full'></div>

								{/* Net Banking */}
								<div
									className={`p-4 transition-all ${selectedPayment === "netbanking" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}>
									<label className='flex items-center gap-4 cursor-pointer'>
										<div className='relative flex items-center justify-center shrink-0'>
											<input
												className='appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer'
												name='payment'
												type='radio'
												checked={selectedPayment === "netbanking"}
												onChange={() => setSelectedPayment("netbanking")}
											/>
										</div>
										<span className='font-sans text-sm font-bold text-primary grow'>
											Net Banking
										</span>
									</label>

									{selectedPayment === "netbanking" && (
										<div className='mt-3 ml-8'>
											<select className='w-full max-w-xs bg-surface border-[0.5px] border-tertiary/30 rounded-md p-2 font-sans text-sm focus:outline-none focus:border-tertiary text-on-surface cursor-pointer'>
												<option>Choose an Option</option>
												<option>HDFC Bank</option>
												<option>ICICI Bank</option>
												<option>SBI Bank</option>
												<option>Axis Bank</option>
											</select>
										</div>
									)}
								</div>

								<div className='h-px bg-tertiary/20 w-full'></div>

								{/* UPI */}
								<div
									className={`p-4 transition-all ${selectedPayment === "upi" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}>
									<label className='flex items-center gap-4 cursor-pointer'>
										<div className='relative flex items-center justify-center shrink-0'>
											<input
												className='appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer'
												name='payment'
												type='radio'
												checked={selectedPayment === "upi"}
												onChange={() => setSelectedPayment("upi")}
											/>
										</div>
										<span className='font-sans text-sm font-bold text-primary grow'>
											Scan and Pay with UPI
										</span>
									</label>

									{selectedPayment === "upi" && (
										<div className='mt-3 ml-8'>
											<div className='flex items-start gap-2 text-on-surface-variant mb-3'>
												<span className='material-symbols-outlined text-[16px] text-tertiary/80 mt-0.5'>
													info
												</span>
												<p className='font-sans text-xs leading-relaxed'>
													You will need to scan the QR code on the payment page
													to complete the payment.
												</p>
											</div>
										</div>
									)}
								</div>

								<div className='h-px bg-tertiary/20 w-full'></div>

								{/* Divine Gift Card (Instead of EMI) */}
								<div
									className={`p-4 transition-all ${selectedPayment === "giftcard" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}>
									<label className='flex items-center gap-4 cursor-pointer'>
										<div className='relative flex items-center justify-center shrink-0'>
											<input
												className='appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer'
												name='payment'
												type='radio'
												checked={selectedPayment === "giftcard"}
												onChange={() => setSelectedPayment("giftcard")}
											/>
										</div>
										<div className='flex flex-col grow'>
											<span className='font-sans text-sm font-bold text-primary'>
												Divine Gift Card
											</span>
											{selectedPayment === "giftcard" && (
												<div className='mt-3 flex gap-2 items-center'>
													<input
														type='text'
														placeholder='Enter Code'
														className='bg-surface border-[0.5px] border-tertiary/30 rounded-md px-3 py-1.5 font-sans text-sm focus:outline-none focus:border-tertiary flex-1 max-w-[200px]'
													/>
													<button
														type='button'
														className='bg-surface border-[0.5px] border-tertiary/40 px-4 py-1.5 rounded-full font-sans text-xs font-semibold text-primary hover:border-tertiary transition-colors shadow-sm'>
														Apply
													</button>
												</div>
											)}
										</div>
									</label>
								</div>

								<div className='h-px bg-tertiary/20 w-full'></div>

								{/* Cash on Delivery */}
								<div
									className={`p-4 transition-all ${selectedPayment === "cod" ? "bg-[#fdfaf5]" : "hover:bg-[#fdfaf5]/50"}`}>
									<label className='flex items-center gap-4 cursor-pointer'>
										<div className='relative flex items-center justify-center shrink-0'>
											<input
												className='appearance-none w-4 h-4 border-[1.5px] border-tertiary/40 rounded-full checked:border-4 checked:border-tertiary transition-all cursor-pointer'
												name='payment'
												type='radio'
												checked={selectedPayment === "cod"}
												onChange={() => setSelectedPayment("cod")}
											/>
										</div>
										<div className='flex flex-col grow'>
											<span className='font-sans text-sm font-bold text-primary'>
												Cash on Delivery/Pay on Delivery
											</span>
											{selectedPayment === "cod" && (
												<p className='font-sans text-xs text-on-surface-variant mt-1.5'>
													Cash, UPI and Cards accepted.{" "}
													<span className='text-tertiary font-semibold hover:underline cursor-pointer'>
														Know more.
													</span>
												</p>
											)}
										</div>
									</label>
								</div>
							</div>
						</section>
					</div>

					{/* Right Column: Order Summary */}
					<aside className='lg:col-span-5 xl:col-span-4 sticky top-28'>
						<div className='bg-[#eeeadd] rounded-md border-[0.5px] border-tertiary/20 p-8'>
							<h3 className='font-serif text-2xl font-bold text-primary pb-4 border-b-[0.5px] border-tertiary/20 mb-6 tracking-wide'>
								Order Summary
							</h3>

							{/* Product List Preview */}
							<div className='mb-6'>
								<div className='flex gap-4 items-center'>
									<div className='w-16 h-20 rounded-md overflow-hidden bg-surface border-[0.5px] border-tertiary/20 shrink-0'>
										<img
											className='w-full h-full object-cover'
											alt='Pitambari Silk Set'
											src='https://lh3.googleusercontent.com/aida-public/AB6AXuB6ktgUjiLkGueypozklpYe8TvRW0GnDQEx14LQ3ozFUB3dMCXOlA5zqO18fEwf5eDTTKLP850ybChlQ3YYp_PyjdqFePHU5UiH_Ep4eWnyaWxgslwdn4cbUdMn7NZ5UxzlirkskaqdS2MeoaH8HCYEOfRgaFUximDtqkarM11PbRnd7EDBQukf5qSwT-T15bT8N26B7hJ_3hJ2RyDcIRQb25nJSugCfe-Hr254NmLMkp9Y80g9bg3NxN613D7MFpCBM9gtSsbXU2Rb'
										/>
									</div>
									<div className='grow flex flex-col'>
										<p className='font-sans text-sm font-bold text-primary mb-1'>
											Pitambari Silk Set
										</p>
										<p className='font-sans text-sm text-on-surface-variant mb-1'>
											Size: Large (12&quot;)
										</p>
										<p className='font-sans text-sm font-semibold text-tertiary'>
											₹ 4,500
										</p>
									</div>
								</div>
							</div>

							<div className='space-y-3 mb-6'>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Subtotal</span>
									<span>₹ 4,500.00</span>
								</div>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Sacred Delivery</span>
									<span className='text-tertiary font-semibold uppercase tracking-widest text-[10px]'>
										FREE
									</span>
								</div>
								<div className='flex justify-between font-sans text-sm text-on-surface-variant'>
									<span>Temple GST (5%)</span>
									<span>₹ 225.00</span>
								</div>
							</div>

							<div className='pt-6 border-t-[0.5px] border-tertiary/20 flex justify-between items-end mb-8'>
								<span className='font-serif text-2xl font-bold text-primary'>
									Total Amount
								</span>
								<span className='font-serif text-2xl font-bold text-tertiary'>
									₹ 4,725.00
								</span>
							</div>

							<button
								type='button'
								className='w-full bg-linear-to-r from-[#d4af37] via-[#c5a017] to-[#d4af37] text-primary font-sans text-sm font-bold py-4 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.4)] hover:shadow-[0_4px_25px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest'>
								Complete Purchase
							</button>

							<div className='flex items-center justify-center gap-2 text-on-surface-variant/80 text-[10px] uppercase tracking-widest mt-6'>
								<span className='material-symbols-outlined text-[14px]'>
									lock
								</span>
								<span>Secure SSL Encrypted Payment</span>
							</div>
						</div>

						{/* Heritage Note */}
						<div className='mt-6 p-4 text-center'>
							<p className='font-serif italic text-on-surface-variant/80 text-sm'>
								&quot;Crafted with devotion, delivered with care.&quot;
							</p>
						</div>
					</aside>
				</div>
			</main>
		</div>
	);
}
