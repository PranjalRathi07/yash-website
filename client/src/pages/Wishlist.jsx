/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/LikeButton";

export default function Wishlist() {
	const navigate = useNavigate();
	const wishlist = [
		{
			title: "Midnight Tejas Kurta",
			desc: "Deep blue silk with golden zari embroidery.",
			price: "₹14,500",
			badge: "New Arrival",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-7CyNIIeGQ37tYWOeugd5HGXwHdT73ZdvPq2-n41DNJQlb3ufU7kv8-FJF5vRbiEMBaYmksOEBGgMXMRleL2oB_bFdpRVj3NAcMF25KdvTu9tvPBPZNfqFdlbZJonMkQ3Hu8Zhi1M20DiillFhuSeVA6fm6D2IFem9jJ44vymh2rODMhQw4zv8jhgMzqxzCOk3mRU5ITDwW4OP-nYVjHYduB0PNab28h7kzBSXVd-4kTBjulpOSed_1AGKK11vWjGAt5A8zFVdrWg",
		},
		{
			title: "Ivory Devotion Saree",
			desc: "Pure handloom silk with intricate temple borders.",
			price: "₹22,000",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAonZ2wDJd1vGtvypewjoxAjx6eMFokqJsq5uPMOKX2r1KOYmSLrI8OsbrCuNBmw-EkA3SiXloUPtUbzx2qgrdTNKQhdIXbknocOp3wnvgz7G5l7Bfl9_Gs0OwzHTpP2u3pbCDFWqvNVYIRYR43RNsic-qncS_K1vavwqljESUi9yxWS1jFlO61TP8qd0PMBum2Er8JZiJlWoe-2lt8tbVbPxxj16JBO-FVapNahzrUAYeRLib-jCv0yYkC4rSajnCSVH-tQ8t9puj",
		},
		{
			title: "Golden Radiance Juttis",
			desc: "Hand-embroidered footwear with pearl accents.",
			price: "₹4,800",
			img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-Nthjjf97KqemHlLlsxaXIXADLKRFbkjFAZBUMoZCSmakOq9ZV3H8iuHbmoOfOsWqMyG6usJy6ew27hPvCAU8Pul_mp1F9Lzm8VTnAbFocct0HDbQ_FpXm9nhtskeL0T7vd-uoZL-Qni0wW5rULp2ygl6DdT4FdjKJAwTRI0vAa7MGo_w2kpZC0DZ5WbBXp7RxVGKkMXcFLdS4yqBqCbetVBGNMk4sKhiQXZc-T5n-KhwhrSVSIZ-ezuWfmdvqLpPISwChaLd9Lq9",
		},
	];

	return (
		<div className='w-full'>
			<div className='text-center mb-16'>
				<h2 className='font-serif text-6xl text-primary mb-6'>
					Your Divine Selection
				</h2>
				<p className='font-sans text-base text-on-surface-variant max-w-2xl mx-auto'>
					A curated collection of your favorite pieces, ready to bring devotion
					and elegance into your life.
				</p>
				<div className='mt-8 flex justify-center'>
					<div className='flex items-center justify-center w-full max-w-[120px]'>
						<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
						<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
						<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
				{wishlist.map((p) => (
					<div
						key={p.title}
						onClick={() => navigate('/product/1')}
						className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
						<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
							<img
								alt={p.title}
								className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
								src={p.img}
							/>
							<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
							<LikeButton initialLiked={true} />
						</div>

						<div className='grow flex flex-col'>
							<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
								{p.title}
							</h3>
							<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
								{p.desc}
							</p>

							<div className='mt-auto flex items-center justify-between'>
								<span className='font-sans text-xl font-medium text-primary'>
									{p.price}
								</span>
								<button
									type='button'
									onClick={(e) => e.stopPropagation()}
									className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform'>
									<span className='material-symbols-outlined text-[20px]'>
										add_shopping_cart
									</span>
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
