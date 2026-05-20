/** @format */
import React, { useRef } from "react";
import gsap from "gsap";

export default function MyOrders() {
	const trackBtnRef = useRef(null);

	const handleTrackEnter = () => {
		gsap.to(trackBtnRef.current, {
			scale: 1.05,
			y: -2,
			boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
			duration: 0.4,
			ease: "power2.out",
		});
	};

	const handleTrackLeave = () => {
		gsap.to(trackBtnRef.current, {
			scale: 1,
			y: 0,
			boxShadow: "none",
			duration: 0.4,
			ease: "power2.out",
		});
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

				<div className='bg-surface-container-lowest border border-secondary-container rounded-[20px] p-6 shadow-sm overflow-hidden'>
					<div className='flex flex-col lg:flex-row gap-8'>
						{/* Product Thumbnail */}
						<div className='w-full lg:w-48 h-64 rounded-xl overflow-hidden bg-surface-container'>
							<img
								className='w-full h-full object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuArMvkGA0ursGzFEW0nP8eQfsXsSl_uCZMOwbajDO-LgnhGc6oEyFcj9h1OwrgSaKWVY2DgsXdAOu6lCzQTrVraJj0iVGsb8pjW2RE9pLay_GN62RjaD9tuPYIFqZ1FK-xvd-nOuar7N62-WssBMJkLJ3bfGJ86OqB241SDtjBMmrMtNYWyMiqBdmRqyMrMZqzdsbm8aA6C6Mkf43RI3KOzcXrOirKNj1pfp3okrhIgY-qIAlXL-O28k4gW0RNDqYFDFcN9d2T-A33n'
								data-alt='A luxury close-up of a finely embroidered silk ethnic garment, featuring intricate gold thread work on a deep royal blue fabric. The lighting is directional and dramatic, highlighting the texture of the silk and the shimmering brilliance of the gold. The scene conveys a sense of traditional opulence and divine craftsmanship.'
								alt=''
							/>
						</div>

						{/* Order Info */}
						<div className='flex-1'>
							<div className='flex flex-wrap justify-between items-start mb-6'>
								<div>
									<h4 className='font-serif text-2xl text-on-surface'>
										Pristine Silk Kurta - Midnight Gold
									</h4>
									<p className='font-sans text-sm font-semibold text-on-surface-variant mt-1'>
										Order #KV-8924102
									</p>
								</div>

								<div className='text-right'>
									<p className='font-sans text-xs text-on-surface-variant uppercase tracking-widest'>
										Est. Delivery
									</p>
									<p className='font-serif text-2xl text-secondary'>
										Oct 24, 2024
									</p>
								</div>
							</div>

							{/* Progress Tracker */}
							<div className='mb-8'>
								<div className='relative flex justify-between'>
									{/* Connection Line */}
									<div className='absolute top-4 left-0 w-full h-1 bg-surface-container-high z-0'>
										<div className='h-full bg-secondary-container w-[66%]' />
									</div>

									{/* Steps */}
									<div className='relative z-10 flex flex-col items-center'>
										<div className='w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center'>
											<span className='material-symbols-outlined text-sm'>
												check
											</span>
										</div>
										<span className='font-sans text-xs mt-2 text-on-surface'>
											Ordered
										</span>
									</div>

									<div className='relative z-10 flex flex-col items-center'>
										<div className='w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center'>
											<span className='material-symbols-outlined text-sm'>
												check
											</span>
										</div>
										<span className='font-sans text-xs mt-2 text-on-surface'>
											Shipped
										</span>
									</div>

									<div className='relative z-10 flex flex-col items-center'>
										<div className='w-8 h-8 rounded-full border-2 border-secondary-container bg-surface-container-lowest flex items-center justify-center'>
											<div className='w-3 h-3 rounded-full bg-secondary-container' />
										</div>
										<span className='font-sans text-xs mt-2 text-on-surface font-bold'>
											In Transit
										</span>
									</div>

									<div className='relative z-10 flex flex-col items-center'>
										<div className='w-8 h-8 rounded-full bg-surface-container-high border-2 border-surface-container-high flex items-center justify-center' />
										<span className='font-sans text-xs mt-2 text-on-surface-variant'>
											Delivered
										</span>
									</div>
								</div>
							</div>

							<button 
								ref={trackBtnRef}
								onMouseEnter={handleTrackEnter}
								onMouseLeave={handleTrackLeave}
								className='bg-white text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary px-8 py-3 rounded-full font-sans text-sm font-semibold border border-secondary-container'>
								Track Package
							</button>
						</div>
					</div>
				</div>
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
					{/* Order Item 1 */}
					<div className='bg-surface-container-lowest border border-secondary-container/20 rounded-xl p-5 flex flex-wrap items-center gap-6 transition-all hover:border-secondary-container/50'>
						<div className='flex -space-x-4 overflow-hidden'>
							<img
								alt='Item thumbnail'
								className='inline-block h-16 w-16 rounded-lg ring-2 ring-surface-container-lowest object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuDGDOw9N-AahUOgBNhOm_7ZuUrCsDRhYwibRd6lnvCvLV--EwWMKMlfnZP9FJ37X_55VIywlKO65vl8XJEL7kobozbinV8o2QNKHcGD3Z-a5T-1pju1JC9u2bQOPKFJTfsUMJMJLFDfrIdC6bd51zFLvrIvbjfG_e-p6KaUj0Y7NYHNIK9d4-L4nN_wM_rlB1KoLbJCCeQQ4amcYCvAvN6cWe5kCHNTe4eCuu4G8C-B6LS5052_mTspGdeRjRCfzuswPrBs3H2pcFas'
								data-alt='A folded artisan-woven cotton dupatta with gold zari borders, draped elegantly. The texture is soft ivory with metallic accents, capturing a premium handcrafted feel under bright, warm gallery lighting.'
							/>
							<img
								alt='Item thumbnail'
								className='inline-block h-16 w-16 rounded-lg ring-2 ring-surface-container-lowest object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuAxvmlMZ2kNFCidHujazV9GSDL4OkH-o60Hev4FprfPyP8iU2MdKSJf6GM50_tpxWnsBB9LTJLALxbQcCvswC5D3N9BA_nFdbGHZDwpWpLb3nKxFTTZtj4ARRMCIz-hAXJV2udx3E88v9p0AkylH3UoEC5XOBq1-A5e5Ib8QT6mEjTZbPPKmpYlgowUPlqCrmGOVVZhOeWy8fLvY_kImv0dJSVfHLVErxgOEaECxW1wj7lf1Ob7g_-_0H0KIEt54OBIj4E3JGDECNB-'
								data-alt='Close-up of embroidered floral motifs on a silk fabric, showcasing delicate needlework in traditional Indian patterns. The colors are muted pastels with gold highlights, reflecting luxury and spiritual grace.'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<div className='flex items-center gap-3 mb-1'>
								<span className='font-sans text-sm font-semibold text-on-surface'>
									#KV-8924
								</span>
								<span className='bg-secondary-container/20 text-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter'>
									Delivered
								</span>
							</div>
							<p className='font-sans text-sm text-on-surface-variant'>
								Ordered on Sep 12, 2024
							</p>
						</div>

						<div className='text-right'>
							<p className='font-serif text-2xl text-primary'>₹14,950</p>
							<p className='font-sans text-xs text-on-surface-variant'>
								2 Items
							</p>
						</div>

						<div className='flex gap-2'>
							<button className='px-5 py-2 border border-secondary-container text-secondary font-sans text-sm font-semibold rounded-full hover:bg-secondary-container/5 transition-colors'>
								View Details
							</button>
							<button className='px-5 py-2 bg-primary text-surface font-sans text-sm font-semibold rounded-full hover:opacity-90 transition-opacity'>
								Reorder
							</button>
						</div>
					</div>

					{/* Order Item 2 */}
					<div className='bg-surface-container-lowest border border-secondary-container/20 rounded-xl p-5 flex flex-wrap items-center gap-6 transition-all hover:border-secondary-container/50'>
						<div className='w-16 h-16 rounded-lg bg-surface-container overflow-hidden'>
							<img
								alt='Item thumbnail'
								className='w-full h-full object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuCmn91c-ZS9AeTd5G3ktPVCIMJ_UW52EfyRDazU5swCMhIBYX-dwYvxrqeYswWPRSl9DhE02HTpz-B779gEoX0RD_z6On0b1gs0CJhjcW_tD0-VEZqO6dhyc0SgfSELEdM_84-2GK50rt6ZnC_VGXMCMBkg0jQx4c3iBLaNgx0TS9bnxz3QHcH3zSvb4CHpfAkp3jpJvWN6qY4AAjHtqi6EMgruBWcnTF5o6vDlQjfQtbcAtInH3GFhqVGnAiO4pWr-VxQind2e4El4'
								data-alt='A single premium gold-plated pendant with sacred symbols, resting on a velvet cushion. The shot is high-key with soft ivory shadows, emphasizing the fine detailing and high-end boutique quality.'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<div className='flex items-center gap-3 mb-1'>
								<span className='font-sans text-sm font-semibold text-on-surface'>
									#KV-7812
								</span>
								<span className='bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter'>
									Cancelled
								</span>
							</div>
							<p className='font-sans text-sm text-on-surface-variant'>
								Ordered on Aug 05, 2024
							</p>
						</div>

						<div className='text-right'>
							<p className='font-serif text-2xl text-primary'>₹3,200</p>
							<p className='font-sans text-xs text-on-surface-variant'>
								1 Item
							</p>
						</div>

						<div className='flex gap-2'>
							<button className='px-5 py-2 border border-secondary-container text-secondary font-sans text-sm font-semibold rounded-full hover:bg-secondary-container/5 transition-colors'>
								View Details
							</button>
							<button className='px-5 py-2 bg-primary text-surface font-sans text-sm font-semibold rounded-full hover:opacity-90 transition-opacity'>
								Reorder
							</button>
						</div>
					</div>

					{/* Order Item 3 */}
					<div className='bg-surface-container-lowest border border-secondary-container/20 rounded-xl p-5 flex flex-wrap items-center gap-6 transition-all hover:border-secondary-container/50'>
						<div className='flex -space-x-4 overflow-hidden'>
							<img
								alt='Item thumbnail'
								className='inline-block h-16 w-16 rounded-lg ring-2 ring-surface-container-lowest object-cover'
								src='https://lh3.googleusercontent.com/aida-public/AB6AXuCKrlos6EprDUe3lLlyqTwn5OXHvh--t8aIJyL2oxW6Trn4asLc141qFuM_FUa70oC_orsd2bikrAAMXHn1X36Z0sFrq7F0kdndq1zG84DxDRtY3CTZpxpvkcY0wT2SWHEkki3eSino7INLzOzDBaBdgyORvXY2MPtwwQ2pD-hg7a3X4A0RcbtDtTc16D8zlrkqhKJaNjkME2Fwf-GtliPCPZjWj5Z6caMEeymI9F9w_y92xnaz-wu6I7iSvgT_I6A6PR89wfA_9XyK'
								data-alt='A collection of sandalwood prayer beads with a silk tassel, presented in a minimalist high-end arrangement. The lighting is soft and spiritual, emphasizing the organic textures and the warmth of the wood.'
							/>
						</div>

						<div className='flex-1 min-w-[200px]'>
							<div className='flex items-center gap-3 mb-1'>
								<span className='font-sans text-sm font-semibold text-on-surface'>
									#KV-6501
								</span>
								<span className='bg-secondary-container/20 text-secondary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter'>
									Returned
								</span>
							</div>
							<p className='font-sans text-sm text-on-surface-variant'>
								Ordered on July 20, 2024
							</p>
						</div>

						<div className='text-right'>
							<p className='font-serif text-2xl text-primary'>₹8,700</p>
							<p className='font-sans text-xs text-on-surface-variant'>
								1 Item
							</p>
						</div>

						<div className='flex gap-2'>
							<button className='px-5 py-2 border border-secondary-container text-secondary font-sans text-sm font-semibold rounded-full hover:bg-secondary-container/5 transition-colors'>
								View Details
							</button>
							<button className='px-5 py-2 bg-primary text-surface font-sans text-sm font-semibold rounded-full hover:opacity-90 transition-opacity'>
								Reorder
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
