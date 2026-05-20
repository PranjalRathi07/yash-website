/** @format */
import React from "react";

export default function Productdetails() {
	const related = [
		{
			title: "Ivory Ananta Drape",
			price: "₹18,000",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCF09BkwjpMpKq6NGDBHpL4davox-v1Xe185vTGIm_MxsYAuxjMmRVOjvN8iC_9E4qK4HAU44ycofMBIFDwOloSZWNeQx72u-6YbsdjOxv16mY--YwJzlPFLAhfvcXtAPx_6P9OBOLM0ohrX7-M_kgoIfhvarrHBaVxy79beTUQBwC7dXHJCyIGzFXob3VDNaLySuBkrhJptd04tFqX-xqpGhiSEFjAiFY6HenDv5b_StxOumDyyZmDt78AjAQtfvm6bgpmT_WF0s0-",
			alt: "Related Product 1",
		},
		{
			title: "Royal Velvet Odhni",
			price: "₹12,500",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhzDDCpwBTC2O9xr792QaeTmGX_yb_1m9pm61ff_KjV2reAgirahnab6eGWHQdAZOBra0GKSwr--p7lbPCrGZ37UAfIu3s52Tp5qF977LQAUIkY1gsQS0J0kUV3xyQVlSjSPXl4WlLYWo77Pak2DoRgJzywo_8h-eGCbL_ik9KkJ3Ypm0tIVogEx2hADAGk_WujFLZghiBVvLaUNWsXQLKLPhlkeclhJj0km2MJRy3pzpOpLqz9gLwp8BNmuaqV63VALkwXZEwVQwM",
			alt: "Related Product 2",
		},
		{
			title: "Saffron Tejas Sari",
			price: "₹28,000",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADZgajLemPu9lkEluFJQmAMast93GerywYm_lKVSsCNEguQR3Nq0V9XZZBckDc_eEu70DmI4IuDeFx4RZy3GSa2-djWM4wrz9jGFbHJ9Oebw_HLOlCu_BnThN2i0NQT4xtA4Y725c-W73Wb_P8sOzMFbY_wTdZdVLbGITlJVXgJKjHFFMIE29eVQ_PAZNQOlo3S_Pd14TTgZp1Ba1c2uX0bCy4TSj7OSW7-vYFA6dZ_3C1kOmQ4wqDW6SwUA2NLoAVKpxBEOwqjARO",
			alt: "Related Product 3",
		},
		{
			title: "Emerald Vana Silk",
			price: "₹22,000",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1v71z8TG1_XvZm-KVUDMtWA05_dLPIKA02xe5RyAIcvX1o2_XQmt5oN2N5ssmvGOzmZ0_gs2BT4RjAPhAKW2viJ8neXEjok75oCm0DFT-wFz3rnrP6bFG7QEPYaG3BUM-ZrF0WffCTXnLNd_ApNbck3Q291Q49r2QdjhXRV38gdmvtdmSR07SRjSJU35HLB-pvTvfvV-AbPVh-4kS6RoJEJ3CBE6fEK6CYPuFMV2Iop8mDdpNi5PAhurZpE3S6V7f0LjQdbPi1eVs",
			alt: "Related Product 4",
		},
	];

	return (
		<div className='bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='flex-1 w-full px-8 md:px-16 lg:px-24 py-10 flex flex-col gap-12'>
				{/* Breadcrumbs */}
				<nav className='flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-on-surface-variant w-full'>
					<a className='hover:text-primary transition-colors' href='#'>
						Home
					</a>
					<span className='material-symbols-outlined text-[14px] opacity-50'>
						chevron_right
					</span>
					<a className='hover:text-primary transition-colors' href='#'>
						Shop
					</a>
					<span className='material-symbols-outlined text-[14px] opacity-50'>
						chevron_right
					</span>
					<a className='hover:text-primary transition-colors' href='#'>
						Lehengas
					</a>
					<span className='material-symbols-outlined text-[14px] opacity-50'>
						chevron_right
					</span>
					<span className='text-primary font-semibold'>
						Devotional Lotus Silk Set
					</span>
				</nav>

				{/* Product Core Section */}
				<section className='grid grid-cols-1 md:grid-cols-12 gap-12 items-start'>
					{/* Left: Image Gallery (Bento Style) */}
					<div className='md:col-span-7 flex flex-col gap-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
							<div className='md:col-span-2 aspect-4/5 bg-surface-container-low rounded-md overflow-hidden relative group'>
								<img
									alt='Main Product Image'
									className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuCTCoTv8qBHLQZe9WJf1JyimsaxkVvY4wwSGS16GoBEA2Vii1-dDZN95GSBYaXlKAVAKZeDtWIsmDU20HhmpK1IAMBxri0W1c-_vbtUBP2Umq-gSbuPyxeMptbyXx0zieehnbJHhg6V62xj-qZTLuXWu6YnOdiaXLPzdiB0YJF4ArtlS3_su5WitPitBp2QJrTEYhYYfoBo9PRAPwKTBDI_7yS_RsIpKBrLfIW8yhx2Uk2-4rnVnE1M2iN7Adt2oo5vKpp419_yr2ea'
								/>
							</div>

							<div className='aspect-square bg-surface-container-low rounded-md overflow-hidden relative group'>
								<img
									alt='Detail View 1'
									className='w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuD6HI5rJPlDc46YUvX3gAZS4shoghlNVt2aHioZ5LGsHczct7IifaVpZarO1FHNT2Bh0AM7y8ACAdYNrAyuouaIKuvApvOIn_VHK0nzQAzX7ZW0Mh0isSbMwiZUFtOuFoYuHgaCAbuUFATJ_sZ2TGVxJKrktUijx-DI1k-m1LFp3lda6V8Xvx7gzslstcrckPpA39R1ZJjw7I7rN81M5t30kQZ5M0NmqEQhCpv4cgv62iT2zhHszon8hWXSil6x9LEzfZve1BTXMjZi'
								/>
							</div>

							<div className='aspect-square bg-surface-container-low rounded-md overflow-hidden relative group'>
								<img
									alt='Detail View 2'
									className='w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuB1oiZK0kXT_JZj4OJIFv_BaJEKFjG06xnOFyWo1qRczbNx_iyYjMINsvluFfmKxXn30b7ialVqAr66cx0hqZIhy4sjsk-1IoAFTi0wxee8yjGVUeqVAU0ba7ApWMtPCgRRok2bULdIkULMhsTfHUO13HgOCHVGvdgaZUxEGuDJ1SXMKhAFoLTRuGRbop4vT2BE1wExci98HcbC_8J8d71XmZH0KbDzKvUHXzIeor4MhRN0qsnWEYgxDG0Ru1K1qoLIYI-fqA842pMf'
								/>
							</div>
						</div>
					</div>

					{/* Right: Product Details */}
					<div className='md:col-span-5 flex flex-col gap-10 sticky top-[140px]'>
						{/* Title & Price Block */}
						<div className='flex flex-col gap-4 border-b-[0.5px] border-tertiary/20 pb-10'>
							<h1 className='font-serif text-6xl text-primary leading-tight font-medium'>
								Devotional Lotus Silk Set
							</h1>

							<div className='flex items-center gap-4 mt-2'>
								<span className='font-sans text-2xl text-on-surface font-medium'>
									₹32,500
								</span>
								<span className='font-sans text-lg text-on-surface-variant/60 line-through'>
									₹40,000
								</span>
								<span className='bg-tertiary/10 text-tertiary border border-tertiary/20 font-sans text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ml-2 font-bold'>
									New Arrival
								</span>
							</div>

							<p className='font-sans text-base text-on-surface-variant mt-6 leading-relaxed'>
								Woven with reverence, this opulent silk ensemble features
								hand-crafted Zari lotus motifs across a canvas of midnight blue.
								A masterpiece of tactile luxury designed for spiritual
								gatherings and festive celebrations.
							</p>
						</div>

						{/* Selectors Block */}
						<div className='flex flex-col gap-8'>
							{/* Size Selector */}
							<div className='flex flex-col gap-4'>
								<div className='flex justify-between items-center'>
									<span className='font-sans text-sm uppercase tracking-widest text-primary font-semibold'>
										Select Size
									</span>
									<a
										className='font-sans text-xs uppercase tracking-widest text-on-surface-variant border-b border-on-surface-variant hover:text-primary hover:border-primary transition-colors pb-0.5'
										href='#'>
										Size Guide
									</a>
								</div>

								<div className='flex flex-wrap gap-4'>
									{["XS", "S", "M", "L", "XL"].map((s) => (
										<button
											key={s}
											type='button'
											className={
												s === "S"
													? "w-12 h-12 flex items-center justify-center font-sans text-sm border-[1.5px] border-primary rounded-full bg-primary text-surface transition-colors"
													: "w-12 h-12 flex items-center justify-center font-sans text-sm border-[0.5px] border-tertiary/30 rounded-full bg-transparent text-on-surface hover:border-primary hover:text-primary transition-colors"
											}>
											{s}
										</button>
									))}
								</div>
							</div>

							{/* Quantity */}
							<div className='flex flex-col gap-4'>
								<span className='font-sans text-sm uppercase tracking-widest text-primary font-semibold'>
									Quantity
								</span>

								<div className='flex items-center border-[0.5px] border-tertiary/30 rounded-full w-fit bg-transparent'>
									<button
										type='button'
										className='w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors'>
										<span className='material-symbols-outlined text-lg'>
											remove
										</span>
									</button>

									<span className='w-8 text-center font-sans text-base text-on-surface'>
										1
									</span>

									<button
										type='button'
										className='w-12 h-12 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors'>
										<span className='material-symbols-outlined text-lg'>
											add
										</span>
									</button>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className='flex flex-col gap-4 mt-4'>
							<button
								type='button'
								className='w-full py-4 rounded-full font-sans text-sm uppercase tracking-widest bg-primary text-surface shadow-[0_4px_20px_rgba(79,55,138,0.2)] hover:shadow-[0_4px_25px_rgba(79,55,138,0.3)] transition-all duration-300 flex justify-center items-center gap-3'>
								<span className='material-symbols-outlined text-[18px]'>
									shopping_bag
								</span>
								Add to Cart
							</button>

							<button
								type='button'
								className='w-full py-4 rounded-full font-sans text-sm uppercase tracking-widest border-[0.5px] border-tertiary/30 text-primary bg-transparent hover:border-primary transition-all duration-300'>
								Buy Now
							</button>
						</div>

						{/* Accordion Details (Stylized) */}
						<div className='flex flex-col mt-6 border-t-[0.5px] border-tertiary/20'>
							<details
								className='group border-b-[0.5px] border-tertiary/20'
								open>
								<summary className='flex justify-between items-center font-serif text-xl text-primary py-6 cursor-pointer list-none'>
									Fabric Details
									<span className='material-symbols-outlined transition-transform group-open:rotate-180 text-tertiary opacity-50'>
										expand_more
									</span>
								</summary>
								<div className='pb-6 font-sans text-sm text-on-surface-variant flex flex-col gap-3 leading-relaxed'>
									<p>• Premium Banarasi Art Silk blend.</p>
									<p>• Heavy Zari embroidery with metallic thread.</p>
									<p>• Fully lined with breathable cotton-silk inner.</p>
								</div>
							</details>

							<details className='group border-b-[0.5px] border-tertiary/20'>
								<summary className='flex justify-between items-center font-serif text-xl text-primary py-6 cursor-pointer list-none'>
									Care Instructions
									<span className='material-symbols-outlined transition-transform group-open:rotate-180 text-tertiary opacity-50'>
										expand_more
									</span>
								</summary>
								<div className='pb-6 font-sans text-sm text-on-surface-variant flex flex-col gap-3 leading-relaxed'>
									<p>• Dry clean only to preserve the zari work.</p>
									<p>
										• Store in the provided muslin bag away from direct
										sunlight.
									</p>
									<p>
										• Do not iron directly on embroidery; use a pressing cloth.
									</p>
								</div>
							</details>
						</div>
					</div>
				</section>

				{/* Decorative Divider */}
				<div className='w-full flex items-center justify-center my-16 opacity-50'>
					<div className='h-[0.5px] w-full max-w-[200px] bg-linear-to-r from-transparent to-tertiary/50' />
					<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-4' />
					<div className='h-[0.5px] w-full max-w-[200px] bg-linear-to-l from-transparent to-tertiary/50' />
				</div>

				{/* You May Also Like */}
				<section className='flex flex-col gap-12'>
					<h3 className='font-serif text-4xl text-primary text-center'>
						You May Also Like
					</h3>

					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
						{related.map((p) => (
							<div
								key={p.title}
								className='flex flex-col gap-4 group cursor-pointer'>
								<div className='aspect-3/4 bg-surface-container-low rounded-md overflow-hidden relative'>
									<img
										alt={p.alt}
										className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
										src={p.img}
									/>
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none' />
								</div>

								<div className='flex flex-col text-center'>
									<h4 className='font-serif text-xl text-on-surface mb-1'>
										{p.title}
									</h4>
									<span className='font-sans text-sm text-primary font-medium'>
										{p.price}
									</span>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

