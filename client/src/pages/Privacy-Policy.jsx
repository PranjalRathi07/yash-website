/** @format */
export default function PrivacyPolicyPage() {
	return (
		<div className='bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='w-full px-8 md:px-16 lg:px-24 py-20 flex flex-col gap-20'>
				{/* Page Header */}
				<div className='flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						Our Sacred Covenant
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed italic'>
						Protecting your privacy is not just a legal obligation; it is a
						sacred trust we uphold with the same reverence as our craft.
					</p>
				</div>

				{/* Privacy Content */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>
					{/* Sidebar */}
					<div className='hidden lg:flex flex-col gap-12 lg:col-span-3 sticky top-32 h-fit'>
						<div>
							<h4 className='font-sans text-xs uppercase tracking-widest text-[#7C98FF] font-semibold mb-6'>
								CONTENTS
							</h4>
							<ul className='space-y-4 font-sans text-sm text-on-surface-variant'>
								<li>
									<a href='#data-collection' className='hover:text-primary transition-colors'>
										Data Collection
									</a>
								</li>
								<li>
									<a href='#your-sanctuary' className='hover:text-primary transition-colors'>
										Your Sanctuary
									</a>
								</li>
								<li>
									<a href='#sacred-trust' className='hover:text-primary transition-colors'>
										Sacred Trust
									</a>
								</li>
								<li>
									<a href='#contact' className='hover:text-primary transition-colors'>
										Privacy Inquiries
									</a>
								</li>
							</ul>
						</div>

						<div className='bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 p-6'>
							<h4 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-2'>
								LAST UPDATED
							</h4>
							<p className='font-sans text-sm text-on-surface-variant'>
								October 14, 2024
							</p>
						</div>
					</div>

					{/* Main Body */}
					<div className='lg:col-span-9 flex flex-col gap-16'>
						{/* Data Collection */}
						<section className='scroll-mt-32' id='data-collection'>
							<div className='flex items-center gap-4 mb-6'>
								<div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0'>
									<span className='material-symbols-outlined text-surface text-xl'>
										account_circle
									</span>
								</div>
								<h2 className='font-serif text-4xl text-primary'>
									Data Collection
								</h2>
							</div>
							<div className='space-y-6 text-on-surface-variant font-sans text-base leading-relaxed'>
								<p>
									To provide you with the exquisite experience of Krishna
									Vasanam, we collect information that allows us to tailor our
									divine collections to your preferences. This includes personal
									identifiers such as your name, contact details, and
									measurements for our bespoke garments.
								</p>
								<div className='grid md:grid-cols-2 gap-8 mt-8'>
									<div className='p-8 bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 hover:border-tertiary transition-all duration-300'>
										<h3 className='font-serif text-2xl text-primary mb-3'>
											Direct Harmony
										</h3>
										<p className='font-sans text-sm text-on-surface-variant'>
											Information you provide when creating a sanctuary
											(account), placing an order, or whispering to us via
											customer support.
										</p>
									</div>
									<div className='p-8 bg-surface-container-low rounded-xl border-[0.5px] border-tertiary/20 hover:border-tertiary transition-all duration-300'>
										<h3 className='font-serif text-2xl text-primary mb-3'>
											Silent Observation
										</h3>
										<p className='font-sans text-sm text-on-surface-variant'>
											Technical details like your IP address and browsing
											patterns that help us refine the digital tapestry of our
											website.
										</p>
									</div>
								</div>
							</div>
						</section>

						<hr className='border-t-[0.5px] border-tertiary/20' />

						{/* Your Sanctuary (Security) */}
						<section className='scroll-mt-32' id='your-sanctuary'>
							<div className='flex items-center gap-4 mb-6'>
								<div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0'>
									<span className='material-symbols-outlined text-surface text-xl'>
										shield
									</span>
								</div>
								<h2 className='font-serif text-4xl text-primary'>
									Your Sanctuary
								</h2>
							</div>
							<div className='bg-primary text-surface p-10 rounded-2xl relative overflow-hidden'>
								<div className='relative z-10'>
									<p className='font-sans text-base text-surface/90 mb-6 leading-relaxed'>
										We protect your personal data with the same diligence as a
										temple guardian. Utilizing advanced encryption and secure
										socket layers, your digital footprint within Krishna Vasanam
										is fortified against unauthorized intrusion.
									</p>
									<ul className='space-y-4 font-sans text-sm text-surface/90'>
										<li className='flex items-start gap-3'>
											<span className='material-symbols-outlined text-tertiary'>
												check_circle
											</span>
											<span>
												Encrypted payment processing through verified gateways.
											</span>
										</li>
										<li className='flex items-start gap-3'>
											<span className='material-symbols-outlined text-tertiary'>
												check_circle
											</span>
											<span>
												Anonymized analytical data for internal improvements.
											</span>
										</li>
										<li className='flex items-start gap-3'>
											<span className='material-symbols-outlined text-tertiary'>
												check_circle
											</span>
											<span>
												Regular security audits of our digital architecture.
											</span>
										</li>
									</ul>
								</div>
								<div className='absolute -right-10 -bottom-10 opacity-10 pointer-events-none'>
									<span className='material-symbols-outlined text-[200px] text-surface'>
										lock
									</span>
								</div>
							</div>
						</section>

						<hr className='border-t-[0.5px] border-tertiary/20' />

						{/* Sacred Trust (Sharing) */}
						<section className='scroll-mt-32' id='sacred-trust'>
							<div className='flex items-center gap-4 mb-6'>
								<div className='w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0'>
									<span className='material-symbols-outlined text-surface text-xl'>
										handshake
									</span>
								</div>
								<h2 className='font-serif text-4xl text-primary'>
									Sacred Trust
								</h2>
							</div>
							<div className='space-y-6 text-on-surface-variant font-sans text-base leading-relaxed'>
								<p>
									Krishna Vasanam will never sell your soul—or your data—to
									third-party advertisers. We only share essential information
									with our trusted partners who assist in bringing our creations
									to your doorstep.
								</p>
								<div className='flex flex-col md:flex-row gap-8 mt-4'>
									<div className='flex-1 bg-surface-container-low p-6 rounded-xl border-[0.5px] border-tertiary/20'>
										<h4 className='font-sans text-xs uppercase tracking-widest text-tertiary font-semibold mb-2'>
											Logistics
										</h4>
										<p className='font-sans text-sm text-on-surface-variant'>
											Sharing your address with our couriers to ensure the safe
											passage of your garments.
										</p>
									</div>
									<div className='flex-1 bg-surface-container-low p-6 rounded-xl border-[0.5px] border-tertiary/20'>
										<h4 className='font-sans text-xs uppercase tracking-widest text-tertiary font-semibold mb-2'>
											Communications
										</h4>
										<p className='font-sans text-sm text-on-surface-variant'>
											Using verified mailing services to share our latest
											seasonal lookbooks and festive offerings.
										</p>
									</div>
								</div>
							</div>
						</section>

						<hr className='border-t-[0.5px] border-tertiary/20' />

						{/* Contact Section */}
						<section
							className='scroll-mt-32 bg-surface-container-low border-[0.5px] border-tertiary/20 p-12 rounded-2xl text-center'
							id='contact'>
							<h2 className='font-serif text-4xl text-primary mb-4'>
								Contact for Privacy Inquiries
							</h2>
							<p className='font-sans text-base text-on-surface-variant mb-10 max-w-xl mx-auto leading-relaxed'>
								Should you wish to review, alter, or dissolve your personal data
								from our archives, our dedicated privacy stewards are here to
								assist you.
							</p>
							<div className='flex flex-col sm:flex-row justify-center gap-6'>
								<a
									className='flex items-center justify-center gap-3 bg-primary text-surface px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all hover:bg-primary/90'
									href='mailto:privacy@krishnavasanam.com'>
									<span className='material-symbols-outlined text-[18px]'>
										mail
									</span>
									privacy@krishnavasanam.com
								</a>
								<a
									className='flex items-center justify-center gap-3 bg-transparent border border-tertiary text-on-surface px-8 py-4 rounded-xl font-sans text-xs uppercase tracking-widest font-semibold transition-all hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary'
									href='#'>
									<span className='material-symbols-outlined text-[18px]'>
										chat
									</span>
									WhatsApp Support
								</a>
							</div>
						</section>
					</div>
				</div>
			</main>

			{/* Decorative Illustration */}
			<section className='w-full h-[400px] relative overflow-hidden bg-surface-container-low border-t-[0.5px] border-tertiary/20'>
				<img
					className='w-full h-full object-cover opacity-40 grayscale mix-blend-multiply'
					alt="A serene, wide-angle shot of a minimalist temple interior with sunlight streaming through intricate stone carvings. The scene is bathed in a warm golden glow, echoing the brand's Ivory Cream and Temple Gold palette. The mood is one of profound tranquility and sacredness, perfectly aligning with the privacy policy's theme of a digital sanctuary."
					src='https://lh3.googleusercontent.com/aida-public/AB6AXuBrJu2RHJyXtfYSpyq46bBAWkbCbzmHc6nFxfesds4pAXFdQenwKBHF_BsP8uRZnTl5caKSg891qYyWi7PmiE54WwxwjOXoZOjTdGJV3e97lVWsVsvN8AMERn-ZnuLWGXe6cz_iS8vbsqCOp6AVNAkN0vmlNbJP6yWlZvGMEawZNMJdMDdSHqOxyTdFpUUHJbLS5PNTWm56uhxRlGzh_oaS_cR7p2YIUJwQ8jq2TO_pBWW1XygzmzeronQjCrXFpRqLEm_ok6vc-Wyh'
				/>
				<div className='absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10'>
					<h2 className='font-serif text-5xl text-primary mb-4'>
						Elegance is Privacy
					</h2>
					<p className='font-sans text-lg text-on-surface-variant max-w-lg'>
						Your peace of mind is the true luxury we strive to protect.
					</p>
				</div>
			</section>
		</div>
	);
}
