/** @format */

export default function ShippingReturns() {
	return (
		<div className='bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='w-full px-4 md:px-8 lg:px-16 xl:px-24 py-20 flex flex-col gap-20'>
				{/* Page Header */}
				<div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						Shipping & Returns
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed'>
						Ensuring the divine essence of our textiles reaches your sanctuary
						with the utmost care and grace.
					</p>
				</div>

				{/* Sacred Delivery & Timelines */}
				<section className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
					<div className='relative rounded-md overflow-hidden bg-surface-container-low aspect-square border-[0.5px] border-tertiary/20'>
						<img
							className='w-full h-full object-cover'
							alt='Luxurious hand-woven silk fabric'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuCLIEUpbVwANG0kSgsHF9dIVsNsb6BEMJNP05oNkxYb8bdWGU3EzfLAAtcysRXdTw9MKimXgL08CfWMH6P8zzrmW5p4j6BocVhAWabs_vsYpBFvTHGK5Lswty4ZAkW3JefKfyjWxY8kDYhoFjDN6gOjN1L39v-4OMLyDHM7yEBCHcgkkrYKept3IbxynGnSgPuqfgGPZG7i5EdcdpdU4QCSzi59INCu6wJZZo6MDiTiNEQaMqDuKhk9DDX26uCkI7i-KFN5abk9SyAD'
						/>
						<div className='absolute inset-0 bg-primary/5' />
					</div>
					<div className='flex flex-col gap-6 md:pl-8'>
						<div>
							<span className='font-sans text-xs uppercase tracking-widest text-tertiary font-semibold mb-2 block'>
								Shipping Logistics
							</span>
							<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-6'>
								Sacred Delivery
							</h2>
						</div>
						<p className='font-sans text-base text-on-surface-variant leading-relaxed mb-4'>
							Each Krishna Vasanam creation is treated as a sacred artifact.
							We partner with specialized couriers to ensure your order
							arrives in pristine condition, wrapped in sustainable, premium
							packaging.
						</p>
						<div className='space-y-6'>
							<div className='flex gap-4'>
								<span className='material-symbols-outlined text-tertiary text-[24px]'>
									local_shipping
								</span>
								<div>
									<h3 className='font-sans text-lg text-primary font-semibold mb-1'>
										Domestic Shipping
									</h3>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Arrival within 3-5 business days. Complimentary delivery
										on orders above ₹10,000.
									</p>
								</div>
							</div>
							<div className='flex gap-4'>
								<span className='material-symbols-outlined text-tertiary text-[24px]'>
									public
								</span>
								<div>
									<h3 className='font-sans text-lg text-primary font-semibold mb-1'>
										International Offerings
									</h3>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Global reach to over 40 countries. Deliveries typically
										conclude within 7-12 business days depending on customs.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Returns & Exchanges Bento Grid */}
				<section>
					<div className='flex items-center gap-3 mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
						<h2 className='font-serif text-3xl text-primary'>
							Returns & Exchanges
						</h2>
					</div>
					<p className='font-sans text-base text-on-surface-variant mb-8 max-w-2xl'>
						We understand that the journey to finding the perfect drape is
						personal. We offer a 15-day window for returns and exchanges.
					</p>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-8 hover:border-tertiary transition-all duration-300 group'>
							<span className='material-symbols-outlined text-tertiary mb-6 text-[32px] group-hover:scale-110 transition-transform'>
								calendar_today
							</span>
							<h3 className='font-serif text-2xl text-primary mb-3'>
								15-Day Window
							</h3>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Request an exchange or return within 15 days of receiving your
								order. The item must be in its original, unworn condition with
								all tags intact.
							</p>
						</div>
						<div className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-8 hover:border-tertiary transition-all duration-300 group'>
							<span className='material-symbols-outlined text-tertiary mb-6 text-[32px] group-hover:scale-110 transition-transform'>
								inventory_2
							</span>
							<h3 className='font-serif text-2xl text-primary mb-3'>
								Sacred Integrity
							</h3>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Due to the artisanal nature of our textiles, items that show
								signs of wear or damage to the delicate embroidery cannot be
								accepted.
							</p>
						</div>
						<div className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-8 hover:border-tertiary transition-all duration-300 group'>
							<span className='material-symbols-outlined text-tertiary mb-6 text-[32px] group-hover:scale-110 transition-transform'>
								currency_exchange
							</span>
							<h3 className='font-serif text-2xl text-primary mb-3'>
								Seamless Refunds
							</h3>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Refunds are processed back to the original payment method
								within 7 business days of our quality check completion.
							</p>
						</div>
					</div>
				</section>

				{/* Initiation Guide */}
				<section className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 overflow-hidden flex flex-col md:flex-row'>
					<div className='p-10 md:p-16 flex-1 flex flex-col gap-8'>
						<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-primary'>
							How to Initiate a Return
						</h2>
						<div className='space-y-8'>
							<div className='flex gap-6 items-start'>
								<span className='w-8 h-8 rounded-full border border-tertiary/30 flex items-center justify-center font-sans text-sm text-tertiary font-bold shrink-0'>
									1
								</span>
								<div>
									<h3 className='font-sans text-lg text-primary font-semibold mb-1'>
										Contact Our Concierge
									</h3>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Email us at support@krishnavasanam.com with your order
										number and reason for return.
									</p>
								</div>
							</div>
							<div className='flex gap-6 items-start'>
								<span className='w-8 h-8 rounded-full border border-tertiary/30 flex items-center justify-center font-sans text-sm text-tertiary font-bold shrink-0'>
									2
								</span>
								<div>
									<h3 className='font-sans text-lg text-primary font-semibold mb-1'>
										Packaging for Journey
									</h3>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Place the item in its original box. We will arrange a
										complimentary pickup for domestic returns.
									</p>
								</div>
							</div>
							<div className='flex gap-6 items-start'>
								<span className='w-8 h-8 rounded-full border border-tertiary/30 flex items-center justify-center font-sans text-sm text-tertiary font-bold shrink-0'>
									3
								</span>
								<div>
									<h3 className='font-sans text-lg text-primary font-semibold mb-1'>
										Quality Inspection
									</h3>
									<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
										Once received at our atelier, our artisans will verify the
										garment&apos;s integrity before finalizing the refund.
									</p>
								</div>
							</div>
						</div>
						<div className='mt-4'>
							<button
								type='button'
								className='bg-primary text-surface px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90'>
								Start Your Return
							</button>
						</div>
					</div>
					<div className='md:w-1/3 bg-surface relative min-h-[300px] border-l-[0.5px] border-tertiary/20'>
						<img
							className='w-full h-full object-cover grayscale opacity-50 mix-blend-overlay'
							alt='Shipping box'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuBjfNi4zVuLP8VUgjGXvfzFfXskAYStSXjgMt41VOh8H_lcc8qFDPxjT3VMPiBQrbYU0ZjspO9HHhaSptH0knDnhYBrH6V_skpiw_zcIPnYwZ4-kdLq5Jthh1B23S7pBf790-BYyVLu5bobKyIGb6cgvizcEdm2aWnHWNuG5rBrJ-ZZIp40c1JGNYVWUoKBiuPkcsJ5yekbt5zD2LRL1USkJIR5b3paVpvrFdCva9s8A36YjtqUVotjJkezlKuOJPhz5b-I0KMHsxvU'
						/>
					</div>
				</section>

				{/* FAQ Summary */}
				<section className='max-w-3xl mx-auto w-full'>
					<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-primary mb-10 text-center'>
						Frequently Asked
					</h2>
					<div className='divide-y-[0.5px] divide-tertiary/20'>
						<details className='group py-6'>
							<summary className='flex justify-between items-center cursor-pointer list-none'>
								<span className='font-sans text-lg text-primary font-semibold'>
									Can I exchange for a different size?
								</span>
								<span className='material-symbols-outlined text-tertiary transition-transform group-open:rotate-180'>
									expand_more
								</span>
							</summary>
							<p className='mt-4 font-sans text-sm text-on-surface-variant leading-relaxed pl-4 border-l-[0.5px] border-tertiary'>
								Yes, exchanges for different sizes are complimentary, provided
								the item is in stock. Please initiate the request within 15
								days.
							</p>
						</details>
						<details className='group py-6'>
							<summary className='flex justify-between items-center cursor-pointer list-none'>
								<span className='font-sans text-lg text-primary font-semibold'>
									Are custom orders returnable?
								</span>
								<span className='material-symbols-outlined text-tertiary transition-transform group-open:rotate-180'>
									expand_more
								</span>
							</summary>
							<p className='mt-4 font-sans text-sm text-on-surface-variant leading-relaxed pl-4 border-l-[0.5px] border-tertiary'>
								Customized garments and tailored items are final sale and
								cannot be returned or exchanged due to their unique nature.
							</p>
						</details>
						<details className='group py-6'>
							<summary className='flex justify-between items-center cursor-pointer list-none'>
								<span className='font-sans text-lg text-primary font-semibold'>
									What if my item arrives damaged?
								</span>
								<span className='material-symbols-outlined text-tertiary transition-transform group-open:rotate-180'>
									expand_more
								</span>
							</summary>
							<p className='mt-4 font-sans text-sm text-on-surface-variant leading-relaxed pl-4 border-l-[0.5px] border-tertiary'>
								In the rare event of damage, please contact us immediately
								(within 24 hours). We will arrange an urgent replacement or a
								full refund.
							</p>
						</details>
					</div>
				</section>
			</main>
		</div>
	);
}
