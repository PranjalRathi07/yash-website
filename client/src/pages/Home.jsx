/** @format */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../assets/Logo.jpeg";

export default function KrishnaVasanam() {
	const navigate = useNavigate();
	const categories = [
		{ icon: "styler", label: "Daily Wear" },
		{ icon: "celebration", label: "Festive Wear" },
		{ icon: "temple_hindu", label: "Janmashtami" },
		{ icon: "spa", label: "Accessories" },
		{ icon: "diamond", label: "Jewelry" },
		{ icon: "layers", label: "Premium Sets" },
		{ icon: "ac_unit", label: "Winter" },
		{ icon: "featured_seasonal_and_gifts", label: "Combo Packs" },
	];

	const arrivals = [
		{
			title: "Makhanchor Set",
			subtitle: "Pure Silk & Brocade",
			price: "₹1,299",
			badge: "New",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPO4eW1TVJuezUrS_VBSR_Cb_BLawc0qMqIHQnfe5mDopm7_tQYsurLOxLWfjHnNTTqRiHrP6IvJeik6OgtmFBt48H-FUvXa_YM0cx4hkVKdNUd--lwP_yue2ae3JdMgjlSm4LrKtsdR7ubKSM_DqQUyjelsy7Q5dm2F4UzDDZSaLjMHEZDU3XZrzezPhA6SJm4a7_caasVM1W3-m0Akjzy3rkkmlqge9IXNkp8opyz4CidDtHSmbidCIAPnmIdycGpC5VsZRd2cHN",
		},
		{
			title: "Vrindavan Bliss",
			subtitle: "Handmade Organic Cotton",
			price: "₹850",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCv8vMKKsd2yuxhwDOxsd_AoAM4OHJ4Rz3i1FCrP4JMZJUOG2LQ3mR_I-lqj0pcyLWzUXk03WHLXarlFn6x4hA-MEh9EAPIz2m9wzN_ULfgI5RLJqo3kpjlZH9H6ylPXcYOOcrGzjlBB9a062426nLCg2rfKelV746Nh7l_8es_xgKUxbdVbJ-2x3S6VJbd_cSAjzjzWN55R4DMsSXOqkBr2Uaf632XaFeDU-GfkXjQLnALqzThSePDmESED5HbePtHvWrFsiWy3Y8",
		},
		{
			title: "Divine Shringar",
			subtitle: "Premium Temple Jewelry",
			price: "₹2,499",
			badge: "New",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmYw-2iYnDCRUwuNSFSmpW0oNODMx4K7XcOgR3JRt1tBRIzb_M1jKmeinPYSVw_JO8KLoS3QRiA-BZtyF_1nWx1ZoIGYdTYav5NV9YQnIKJeqaUdpqt1MfI5CqhLP8wtJu0pWoXiKgIeD7PXOYnbE3fwXCcfev2O16VR11No8-aVXthF4a-cKw94AlR5jLMSMx9sZbEJvCU8uIyJZNB47B4HXfNvOwW5PnFmsh36jgu6gYPnYpzX4p_gEJN5kP3_rCJxDKEB8LOOv0",
		},
		{
			title: "Gopi Gitanjali",
			subtitle: "Yellow Festive Vastra",
			price: "₹1,550",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC5KZ4ThwXzaZwkl0XZ31R-OARRIEa5eNLSrJzA4GR0P3vriAouNr7eFYg_o1HcTQRmV49-fDGtvQBeM2_h_fiVH1Fld0nDKmcWK-VqV0n13ZBocuY5RnSUA3GXnoaPkutUYcn2Bw0MlQZVPXTNePQLVbeRglC7tPTEvoLElmTVDABdZAbSZPB3bJ_3uVM4XiVHWniKaKRHdhTUU8LWovzWh6ooL3ZKeFWA76P2ZdZbHatp-UsBeYtCaiRB3w1RAIzD4VW60q62tej",
		},
	];

	return (
		<div className='bg-surface font-sans text-on-surface selection:bg-tertiary/20 selection:text-primary'>
			{/* Hero */}
			<section className='relative min-h-[85vh] flex items-center overflow-hidden bg-primary'>
				<div className='absolute inset-0 w-full opacity-70'>
					<img
						className='w-full h-full object-cover object-center'
						alt='Luxury silk fabric background'
						src='https://lh3.googleusercontent.com/aida-public/AB6AXuAxk00buKNvC0wKPU6lb9o3uDUw-QrLerzLMaYyOslZkToHwJ-5B-Ah2C_P02qpT947QqCQgC26KHvuwSUUu_Mx5Xwh7StL7YCSVovYqcYqGIObMDF7doQRBCCGCuggWWs1_3XtgWGkgBtyxvBJ548oDTH5E4M1iS5k7Bt7Tw-kPnEUoSoq5DKfwV8wwjUOA0WJHfOimSZ0gZIdnZWiZGPBSoCZVvQbBhu_mq7dgYuE9ZZ0da4rWuULED-_C3BqrOqeD6DeLpQ71cQA'
					/>
				</div>
				<div className='absolute inset-0 bg-linear-to-r from-primary via-primary/60 to-transparent' />

				<div className='relative w-full px-8 md:px-16 lg:px-24 py-20 z-10 text-center lg:text-left'>
					<span className='inline-block text-tertiary font-sans text-xs tracking-[0.2em] uppercase mb-6 font-semibold'>
						HANDCRAFTED WITH DEVOTION
					</span>
					<h1 className='font-serif text-6xl leading-[1.1] text-surface mb-8 max-w-2xl font-normal tracking-[-0.02em]'>
						Divine Vastra for Your Beloved{" "}
						<span className='italic text-tertiary'>Kanha Ji</span>
					</h1>
					<p className='font-sans text-lg text-surface/80 max-w-xl mb-12 leading-relaxed'>
						Experience the sacred artisanal journey of dressing your deity. Each
						piece is meticulously crafted using premium silks and organic
						cottons.
					</p>

					<div className='flex flex-col sm:flex-row gap-6 justify-center lg:justify-start'>
						<Link
							to='/collection'
							className='bg-linear-to-r from-[#D4A017] to-[#F7C948] text-[#081B4B] px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-bold transition-all hover:shadow-[0_0_20px_rgba(212,160,23,0.4)] border-none text-center'>
							Shop Collection
						</Link>
						<Link
							to='/festive-wear'
							className='bg-transparent border border-tertiary text-surface px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-linear-to-r hover:from-[#D4A017] hover:via-[#D4A017] hover:to-[#F7C948] hover:text-[#081B4B] hover:border-none text-center'>
							Explore Festive Wear
						</Link>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className='py-stack-xl w-full px-8 md:px-16 lg:px-24'>
				<div className='flex flex-col items-center mb-16'>
					<h2 className='font-serif text-6xl text-on-surface text-center mb-6'>
						Shop by Category
					</h2>
					<div className='flex items-center justify-center w-full max-w-xs'>
						<div className='flex-1 h-px bg-linear-to-r from-transparent to-tertiary/50'></div>
						<div className='w-2 h-2 rounded-full bg-tertiary mx-4'></div>
						<div className='flex-1 h-px bg-linear-to-l from-transparent to-tertiary/50'></div>
					</div>
				</div>

				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8'>
					{categories.map((c) => (
						<a
							key={c.label}
							className='group flex flex-col items-center text-center gap-4'
							href='#'>
							<div className='w-24 h-24 rounded-[40px] bg-surface-container-low flex items-center justify-center border-[0.5px] border-tertiary/20 transition-all duration-300 group-hover:border-tertiary group-hover:shadow-[0_20px_40px_rgba(31,31,31,0.04)] group-hover:-translate-y-1'>
								<span className='material-symbols-outlined text-[32px] text-primary/80 group-hover:text-primary transition-colors'>
									{c.icon}
								</span>
							</div>
							<span className='font-sans text-xs text-on-surface-variant uppercase tracking-widest font-semibold'>
								{c.label}
							</span>
						</a>
					))}
				</div>
			</section>

			{/* Featured Collection */}
			<section className='bg-surface-container-low py-stack-xl'>
				<div className='w-full px-8 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-20'>
					<div className='w-full lg:w-1/2 relative scale-95'>
						<div className='absolute -inset-4 border-[0.5px] border-tertiary/30 rounded-tl-[100px] rounded-br-[100px] z-0' />
						<img
							className='relative z-10 w-full object-cover rounded-tl-[100px] rounded-br-[100px] shadow-[0_20px_40px_rgba(31,31,31,0.04)]'
							alt='Featured heritage collection'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuCay_nQZSSFRQFxhSEwbO71Mod8_zatZkq59b9Q2E4dykixVCbg_Ukgd9bL87OEyMPKUzDQJCyjutStajvudbVgmwJtMH2s-mtI7i0oh2UEeIcuPsdXSt2zNNKu3teU00ZgfdsmFNqU6PVhYTwMflzN7wfEKcFLi-dWoTVp4YJJLLmYrz-FtnshwFQuX57SemKL5ilQUZKlcEhd8nEgylWMRVr_hI7ENWtRk6FRYXREufvEfoS3R7l1pB2tELRI8azBBEckHRJFyq4n'
						/>
					</div>

					<div className='w-full lg:w-1/2'>
						<span className='text-tertiary font-sans text-xs uppercase tracking-[0.2em] mb-6 inline-block font-semibold'>
							Featured Collection
						</span>
						<h2 className='font-serif text-6xl text-on-surface mb-8 leading-[1.2]'>
							The Golden Peacock Heritage
						</h2>
						<p className='font-sans text-lg text-on-surface-variant mb-10 leading-relaxed'>
							Inspired by the traditional art of Vrindavan, this limited edition
							collection features hand-woven Zari work and ethically sourced
							peacock embellishments. Perfect for special Shringar ceremonies.
						</p>

						<Link
							to='/collection'
							className='bg-primary text-on-primary px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90 hover:shadow-lg'
							type='button'>
							Explore Heritage Range
						</Link>
					</div>
				</div>
			</section>

			{/* New Arrivals */}
			<section className='py-stack-xl w-full px-8 md:px-16 lg:px-24'>
				<div className='flex justify-between items-end mb-16 border-b-[0.5px] border-tertiary/20 pb-6'>
					<div>
						<h2 className='font-serif text-6xl text-on-surface'>
							New Arrivals
						</h2>
						<p className='font-sans text-base text-on-surface-variant mt-2'>
							Latest additions to our divine wardrobe.
						</p>
					</div>
					<Link
						className='text-primary font-sans text-xs uppercase tracking-[0.15em] pb-1 font-semibold hover:text-tertiary transition-colors'
						to='/new-arrivals'>
						View All
					</Link>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
					{arrivals.map((p) => (
						<div
							key={p.title}
							onClick={() => navigate('/product/1')}
							className='group relative flex flex-col transition-all duration-500 rounded-md overflow-hidden cursor-pointer'>
							<div className='aspect-4/5 overflow-hidden rounded-md mb-6 relative'>
								<img
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
									alt={p.title}
									src={p.img}
								/>
								{p.badge ? (
									<span className='absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold'>
										{p.badge}
									</span>
								) : null}
							</div>

							<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
								{p.title}
							</h3>
							<p className='font-sans text-sm text-on-surface-variant mb-4'>
								{p.subtitle}
							</p>

							<div className='flex items-center justify-between mt-auto'>
								<span className='font-sans text-lg text-primary font-medium'>
									{p.price}
								</span>
								<button
									className='w-10 h-10 flex items-center justify-center rounded-full border border-tertiary/30 text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300'
									onClick={(e) => e.stopPropagation()}
									type='button'>
									<span className='material-symbols-outlined text-[20px]'>
										add_shopping_cart
									</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Janmashtami Banner */}
			<section className='py-stack-xl px-8'>
				<div className='w-full px-8 md:px-16 lg:px-24 relative rounded-tl-[100px] rounded-br-[100px] overflow-hidden min-h-[500px] flex items-center justify-center text-center shadow-[0_20px_40px_rgba(31,31,31,0.04)]'>
					<div className='absolute inset-0 bg-primary/80 z-10 mix-blend-multiply' />
					<img
						className='absolute inset-0 w-full h-full object-cover'
						alt='Janmashtami banner'
						src='https://lh3.googleusercontent.com/aida-public/AB6AXuAcFBMRD4hSQYQ0_icI1WYKnHZY_91t1brRa-IRCjJ8BtjQenM-PHByCp8BZmq7UULeu3NXgGrL0s57WAbsQ_a6Ce2wArYXPXDVuFeVYrbSsPqSkiSBeyTaINY7H-iAPRMq5li355_EvnNFwMWQyb3TdikZXWRzw6LMml1fJ5mMjdnzy3EhIDwfiMXI3a-jVnVuzo3U1o-_cKFJkEmmouXOFLXpNrfu1QxDUOmyqYLy7IJjABibFHmJGk8QlpV0jUa1GzYfFfWrqd4I'
					/>

					<div className='relative z-20 max-w-2xl px-6 py-16'>
						<span className='text-tertiary font-sans text-xs uppercase tracking-[0.2em] mb-6 inline-block font-semibold'>
							Special Celebration
						</span>
						<h2 className='font-serif text-6xl leading-[1.1] text-surface mb-8'>
							Janmashtami Special Collection
						</h2>
						<p className='font-sans text-lg text-surface/90 mb-12 leading-relaxed'>
							Prepare for the grand arrival. Explore exclusive designer wear
							crafted especially for the year's most sacred celebration.
						</p>
						<Link
							className='bg-surface text-primary px-8 py-4 font-sans text-xs rounded-md uppercase tracking-widest font-bold transition-all hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary hover:shadow-lg'
							type='button'
							to='/festive-wear'>
							View Janmashtami Range
						</Link>
					</div>
				</div>
			</section>

			{/* Highlights */}
			<section className='py-stack-xl bg-surface'>
				<div className='w-full px-8 md:px-16 lg:px-24'>
					<div className='flex items-center justify-center w-full mb-16'>
						<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/30'></div>
						<div className='mx-6 material-symbols-outlined text-tertiary'>
							spa
						</div>
						<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/30'></div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
						{[
							{
								icon: "volunteer_activism",
								title: "100% Handcrafted",
								text: "Each attire is personally touched and crafted with devotion and prayer.",
							},
							{
								icon: "eco",
								title: "Pure Fabrics",
								text: "We use only pure silks, malmal cotton, and lead-free embellishments.",
							},
							{
								icon: "check_circle",
								title: "Perfect Fit",
								text: "Specially tailored for standard Laddu Gopal idol sizes 0 through 5.",
							},
							{
								icon: "local_shipping",
								title: "Safe Delivery",
								text: "Secure packaging and fast doorstep delivery across India and globally.",
							},
						].map((f) => (
							<div
								key={f.title}
								className='flex flex-col items-center text-center group'>
								<span className='material-symbols-outlined text-[40px] text-tertiary mb-6 transition-transform group-hover:scale-110 duration-300'>
									{f.icon}
								</span>
								<h3 className='font-serif text-2xl text-on-surface mb-4 font-medium'>
									{f.title}
								</h3>
								<p className='font-sans text-base text-on-surface-variant leading-relaxed'>
									{f.text}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Size + Story */}
			<section className='py-stack-xl w-full px-8 md:px-16 lg:px-24'>
				<div className='flex flex-col lg:flex-row gap-20 items-stretch'>
					<div className='w-full lg:w-1/3 bg-surface-container-low p-12 rounded-tl-[60px] rounded-br-[60px] border-[0.5px] border-tertiary/20 flex flex-col'>
						<h2 className='font-serif text-[32px] text-primary mb-6'>
							Find the Perfect Size
						</h2>
						<p className='font-sans text-base text-on-surface-variant mb-10 leading-relaxed'>
							Measure the height of your deity from head to toe (excluding the
							crown base) to select the most appropriate size.
						</p>

						<div className='space-y-6 mb-12 flex-1'>
							{[
								["Size 0", "2.5 Inches"],
								["Size 1", "3.5 Inches"],
								["Size 2", "4.5 Inches"],
								["Size 3", "5.5 Inches"],
								["Size 4", "6.5 Inches"],
								["Size 5", "7.5 Inches"],
							].map(([s, v]) => (
								<div
									key={s}
									className='flex justify-between border-b-[0.5px] border-tertiary/20 pb-3'>
									<span className='font-sans text-on-surface'>{s}</span>
									<span className='font-sans font-semibold text-primary'>
										{v}
									</span>
								</div>
							))}
						</div>

						<button
							onClick={() => navigate("/size-guide")}
							className='w-full py-4 bg-transparent border border-tertiary text-on-surface font-sans text-xs uppercase tracking-widest font-semibold hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-colors rounded-md'
							type='button'>
							View Full Size Guide
						</button>
					</div>

					<div className='w-full lg:w-2/3 flex flex-col justify-between py-6'>
						<div className='mb-16'>
							<h2 className='font-serif text-6xl text-on-surface mb-8'>
								Our Devotional Journey
							</h2>
							<p className='font-sans text-lg text-on-surface-variant mb-6 leading-relaxed'>
								Krishna Vasanam was born out of a simple desire: to offer the
								same level of luxury and care to our beloved deities that we
								seek for ourselves. Each thread woven into our collections is a
								prayer, each bead an offering of love.
							</p>
							<p className='font-sans text-lg text-on-surface-variant mb-12 leading-relaxed'>
								Our artisans in Vrindavan and Mathura carry centuries of
								tradition in their hands, ensuring that when you dress your
								Kanha ji, you are participating in a timeless ritual of beauty
								and faith.
							</p>

							<div className='flex items-center gap-6'>
								<div className='w-16 h-16 rounded-full border-[0.5px] border-tertiary/30 overflow-hidden flex items-center justify-center'>
									<img
										alt='Logo Icon'
										className='w-full h-full object-cover'
										src={logoIcon}
									/>
								</div>
								<div>
									<p className='font-serif text-2xl text-primary mb-1'>
										Krishna Vasanam
									</p>
									<p className='font-sans text-xs text-tertiary uppercase tracking-widest font-semibold'>
										Founded in Devotion
									</p>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
							{[
								{
									quote:
										"The quality of the silk is beyond anything I've bought before. My Laddu Gopal looks truly divine in the Golden Heritage set.",
									name: "Radhika M.",
								},
								{
									quote:
										"The fitting was perfect for my Size 2 Bal Gopal. The packaging was also very safe and beautiful. Highly recommended.",
									name: "Ananya S.",
								},
							].map((t) => (
								<div
									key={t.name}
									className='bg-surface-container-low p-10 rounded-md border-[0.5px] border-tertiary/10 relative'>
									<span className='absolute top-6 left-6 font-serif text-6xl text-tertiary/20 leading-none'>
										"
									</span>
									<p className='font-sans text-base text-on-surface-variant leading-relaxed mb-8 relative z-10 pt-4'>
										{t.quote}
									</p>
									<p className='font-sans text-xs font-bold text-primary uppercase tracking-widest'>
										— {t.name}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
