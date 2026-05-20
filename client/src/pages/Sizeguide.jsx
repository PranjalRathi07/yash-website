/** @format */

import React from "react";

export default function SizeGuide() {
	const sizeRows = [
		{
			id: "Size 0",
			height: '3" - 4"',
			length: '2.5"',
			rec: "Small Home Shrines",
		},
		{
			id: "Size 1",
			height: '5" - 6"',
			length: '4"',
			rec: "Standard Home Altars",
		},
		{
			id: "Size 2",
			height: '7" - 8"',
			length: '5.5"',
			rec: "Medium Altar Displays",
		},
		{
			id: "Size 3",
			height: '9" - 10"',
			length: '7"',
			rec: "Large Altars / Gifts",
		},
		{
			id: "Size 4",
			height: '11" - 12"',
			length: '8.5"',
			rec: "Elaborate Temple Setups",
		},
		{
			id: "Size 5",
			height: '13" - 15"',
			length: '10.5"',
			rec: "Grand Mandirs",
		},
	];

	return (
		<div className='bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary'>
			{/* Main Content Canvas */}
			<main className='w-full px-8 md:px-16 lg:px-24 py-20 flex flex-col gap-20'>
				{/* Page Header */}
				<div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						Divine Proportions
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed'>
						A meticulous guide to finding the perfect fit for your beloved
						deity. Ensure every thread drapes with grace and reverence.
					</p>
				</div>

				{/* How to Measure (Bento Layout) */}
				<section className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<div className='col-span-1 md:col-span-2 bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-10 flex flex-col md:flex-row gap-10 items-center'>
						<div className='w-full md:w-1/2 h-[300px] bg-surface rounded-md overflow-hidden relative'>
							<img
								alt='Measuring Tape'
								className='w-full h-full object-cover mix-blend-multiply'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuAwyB3PrF4RpVVGWqjrW6QI06ydwi90h2TT6l3govFi6m3MvBF_bbEIOSDBgGrVKFqm5sKDgj2ua05UZOJEiqE-JkejCSLwUpqDD8yS2lElFCPIYKK57u_wBOGEqyYAAzN0VvPC_cLw2CVFvNZvIftvievbWWfYIFvU8CcTMxYz34OXyUkJ5wKwX8VEIdR4pPrXSj8Tp2mCZJfH_xK6QxPM0HUzKXSEZITAnsJubzuOuTNjgL-eP324csEdNKy5OaD1YfGpXU-VbxV8'
							/>
						</div>

						<div className='w-full md:w-1/2 flex flex-col gap-6'>
							<div className='flex items-center gap-3 mb-2 border-b-[0.5px] border-tertiary/20 pb-4'>
								<span className='material-symbols-outlined text-tertiary text-2xl'>
									straighten
								</span>
								<h2 className='font-serif text-3xl text-primary'>
									How to Measure
								</h2>
							</div>

							<ol className='list-decimal list-inside font-sans text-sm text-on-surface-variant space-y-4 marker:text-tertiary marker:font-bold leading-relaxed'>
								<li>
									<strong className='text-on-surface'>Height:</strong> Measure
									from the base of the lotus pedestal to the top of the crown.
								</li>
								<li>
									<strong className='text-on-surface'>Shoulder Width:</strong>{" "}
									Measure horizontally across the widest point of the shoulders.
								</li>
								<li>
									<strong className='text-on-surface'>Waist:</strong> Wrap the
									tape gently around the narrowest part of the waist.
								</li>
							</ol>
						</div>
					</div>

					<div className='col-span-1 bg-primary text-surface rounded-md p-10 flex flex-col justify-center items-center text-center gap-6 relative overflow-hidden'>
						<div className='absolute -right-10 -top-10 w-40 h-40 bg-tertiary/20 rounded-full blur-2xl' />
						<span className='material-symbols-outlined text-[48px] text-tertiary relative z-10'>
							info
						</span>
						<h3 className='font-serif text-3xl text-surface relative z-10'>
							Pro Tip
						</h3>
						<p className='font-sans text-sm text-surface/80 leading-relaxed relative z-10'>
							Always use a soft tailor's tape for accuracy. If your deity falls
							between sizes, we recommend selecting the larger size for a
							majestic drape.
						</p>
					</div>
				</section>

				{/* Size Chart Table */}
				<section className='flex flex-col gap-8'>
					<h2 className='font-serif text-4xl text-center text-primary mb-2'>
						Standard Size Chart
					</h2>
					<div className='flex justify-center mb-6'>
						<div className='w-16 h-[0.5px] bg-tertiary/50' />
					</div>

					<div className='overflow-x-auto bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-6'>
						<table className='w-full text-left border-collapse'>
							<thead>
								<tr className='border-b-[0.5px] border-tertiary/30'>
									<th className='py-5 px-6 font-sans text-xs uppercase tracking-widest text-primary font-semibold bg-transparent'>
										Size ID
									</th>
									<th className='py-5 px-6 font-sans text-xs uppercase tracking-widest text-primary font-semibold bg-transparent'>
										Deity Height (Inches)
									</th>
									<th className='py-5 px-6 font-sans text-xs uppercase tracking-widest text-primary font-semibold bg-transparent'>
										Dress Length (Inches)
									</th>
									<th className='py-5 px-6 font-sans text-xs uppercase tracking-widest text-primary font-semibold bg-transparent'>
										Recommended For
									</th>
								</tr>
							</thead>

							<tbody className='font-sans text-sm text-on-surface-variant'>
								{sizeRows.map((r) => (
									<tr
										key={r.id}
										className='border-b-[0.5px] border-tertiary/10 hover:bg-surface/50 transition-colors'>
										<td className='py-5 px-6 font-serif text-lg text-primary'>
											{r.id}
										</td>
										<td className='py-5 px-6'>{r.height}</td>
										<td className='py-5 px-6'>{r.length}</td>
										<td className='py-5 px-6'>{r.rec}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>

				{/* FAQ & CTA Section */}
				<section className='grid grid-cols-1 md:grid-cols-2 gap-16 items-start'>
					<div className='flex flex-col gap-6'>
						<h2 className='font-serif text-3xl text-primary mb-6 border-b-[0.5px] border-tertiary/20 pb-4'>
							Frequently Asked Questions
						</h2>

						<div className='border-b-[0.5px] border-tertiary/20 py-4 group'>
							<h4 className='font-sans text-sm uppercase tracking-widest text-on-surface mb-3 flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors font-semibold'>
								Do sizes vary by fabric?
								<span className='material-symbols-outlined text-tertiary/50 group-hover:text-tertiary transition-colors'>
									expand_more
								</span>
							</h4>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Slight variations may occur. Heavy silks tend to drape with less
								give than soft cottons. We account for this in our tailoring.
							</p>
						</div>

						<div className='border-b-[0.5px] border-tertiary/20 py-4 group'>
							<h4 className='font-sans text-sm uppercase tracking-widest text-on-surface mb-3 flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors font-semibold'>
								Can I request a custom size?
								<span className='material-symbols-outlined text-tertiary/50 group-hover:text-tertiary transition-colors'>
									expand_more
								</span>
							</h4>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
								Yes, we offer bespoke tailoring for unique deities. Please
								contact our divine styling team for consultations.
							</p>
						</div>

						<div className='border-b-[0.5px] border-tertiary/20 py-4 group'>
							<h4 className='font-sans text-sm uppercase tracking-widest text-on-surface mb-3 flex justify-between items-center cursor-pointer group-hover:text-primary transition-colors font-semibold'>
								What if the dress doesn't fit?
								<span className='material-symbols-outlined text-tertiary/50 group-hover:text-tertiary transition-colors'>
									expand_more
								</span>
							</h4>
							<p className='font-sans text-sm text-on-surface-variant leading-relaxed hidden'>
								Please refer to our Returns &amp; Exchange policy. We strive for
								absolute perfection in every offering.
							</p>
						</div>
					</div>

					<div className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-12 text-center flex flex-col items-center justify-center gap-6'>
						<div className='w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-2 border-[0.5px] border-tertiary/30'>
							<span className='material-symbols-outlined text-[28px] text-tertiary'>
								support_agent
							</span>
						</div>

						<h3 className='font-serif text-3xl text-primary'>
							Need Help Choosing?
						</h3>
						<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
							Our dedicated sizing specialists are available to guide you
							personally.
						</p>

						<button
							type='button'
							className='mt-6 w-full py-4 rounded-full bg-primary text-surface font-sans text-sm uppercase tracking-widest flex justify-center items-center gap-3 shadow-[0_4px_20px_rgba(79,55,138,0.2)] hover:shadow-[0_4px_25px_rgba(79,55,138,0.3)] transition-all duration-300'>
							<span
								className='material-symbols-outlined text-[18px]'
								style={{ fontVariationSettings: "'FILL' 1" }}>
								chat
							</span>
							Contact us on WhatsApp
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}

