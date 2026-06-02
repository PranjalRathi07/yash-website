import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import LikeButton from "../components/LikeButton";
import api from "../services/api";

const ProductSkeleton = () => (
	<div className='flex flex-col group relative overflow-hidden bg-transparent'>
		{/* Image Container Skeleton */}
		<div className='aspect-4/5 shimmer-bg mb-6 relative overflow-hidden' />
		
		{/* Info Section Skeleton */}
		<div className='grow flex flex-col'>
			{/* Category Skeleton */}
			<div className='h-3.5 w-1/4 shimmer-bg mb-2' />
			{/* Title Skeleton */}
			<div className='h-7 w-3/4 shimmer-bg mb-2.5' />
			{/* Description lines Skeleton */}
			<div className='h-4 w-full shimmer-bg mb-2' />
			<div className='h-4 w-5/6 shimmer-bg mb-6' />

			{/* Price & Add to Cart Skeleton */}
			<div className='mt-auto flex items-center justify-between'>
				<div className='h-6 w-1/3 shimmer-bg' />
				<div className='h-10 w-10 rounded-full shimmer-bg' />
			</div>
		</div>
	</div>
);

export default function ShopKrishnaVastra() {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);

	const { data, isLoading, isError, isFetching } = useQuery({
		queryKey: ["products", page],
		queryFn: async () => {
			const res = await api.get(`/api/products?page=${page}&limit=9`);
			return res.data;
		},
		placeholderData: keepPreviousData,
	});

	const products = data?.products || [];
	const totalPages = data?.totalPages || 1;
	const showSkeleton = isLoading || isFetching;
	const categories = [
		{ label: "Daily Wear", checked: false },
		{ label: "Mukut", checked: false },
		{ label: "Jewelry", checked: false },
		{ label: "Bansuri", checked: false },
		{ label: "Combo Sets", checked: false },
		{ label: "Winter Wear", checked: false },
		{ label: "Premium Sets", checked: false },
	];

	return (
		<div className='bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow w-full px-8 md:px-16 lg:px-24 py-stack-xl'>
				{/* Page Header */}
				<div className='mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						Shop Krishna Vastra
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed'>
						Explore our premium collection of divine attire, meticulously
						crafted with reverence and luxury to adorn your beloved deity.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-12 items-start'>
					{/* Sidebar */}
					<aside className='w-full lg:w-64 shrink-0 bg-surface-container-low border-[0.5px] border-tertiary/20 rounded-md p-8 sticky top-28'>
						<div className='mb-8 pb-8 border-b-[0.5px] border-tertiary/20'>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Categories
							</h3>

							<ul className='space-y-4'>
								{categories.map((c) => (
									<li key={c.label}>
										<label className='flex items-center gap-4 cursor-pointer group'>
											<div className='relative flex items-center justify-center'>
												<input
													type='checkbox'
													defaultChecked={c.checked}
													className='peer appearance-none w-5 h-5 border-[1.5px] border-tertiary/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
												/>
												<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none'>
													check
												</span>
											</div>
											<span className='font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors'>
												{c.label}
											</span>
										</label>
									</li>
								))}
							</ul>
						</div>

						<div className='mb-8 pb-8 border-b-[0.5px] border-tertiary/20'>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Price
							</h3>

							<div className='space-y-6'>
								<input
									type='range'
									className='w-full h-0.5 bg-tertiary/20 rounded-full appearance-none cursor-pointer accent-primary'
								/>
								<div className='flex items-center justify-between gap-4'>
									<input
										type='text'
										placeholder='Min'
										className='w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50'
									/>
									<span className='text-on-surface-variant/50'>-</span>
									<input
										type='text'
										placeholder='Max'
										className='w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50'
									/>
								</div>
							</div>
						</div>

						<div>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Size (Inches)
							</h3>
							<div className='flex flex-wrap gap-3'>
								{["0-2", "3-5", "6-8", "9-12", "12+"].map((size, idx) => (
									<button
										key={size}
										type='button'
										className={`px-4 py-2 border-[0.5px] rounded-full font-sans text-xs transition-colors ${
											idx === 1
												? "border-primary bg-primary text-surface"
												: "border-tertiary/30 text-on-surface-variant hover:border-primary hover:text-primary"
										}`}>
										{size}
									</button>
								))}
							</div>
						</div>
					</aside>

					{/* Main Content Area */}
					<div className='grow w-full'>
						{/* Toolbar */}
						<div className='flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b-[0.5px] border-tertiary/20 gap-4'>
							<div className='flex items-center gap-4'>
								<label
									className='font-sans text-xs text-on-surface-variant uppercase tracking-widest whitespace-nowrap'
									htmlFor='sort'>
									Sort by:
								</label>
								<select
									id='sort'
									className='bg-transparent border-none font-sans text-sm text-primary focus:outline-none focus:ring-0 cursor-pointer font-semibold'>
									<option>Recommended</option>
									<option>Price: Low to High</option>
									<option>Price: High to Low</option>
									<option>Newest Arrivals</option>
								</select>
							</div>
						</div>

						{/* Product Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
							{showSkeleton ? (
								Array.from({ length: 9 }).map((_, idx) => (
									<ProductSkeleton key={idx} />
								))
							) : isError ? (
								<div className="col-span-full py-20 text-center text-red-500 flex flex-col items-center justify-center gap-4">
									<span className="material-symbols-outlined text-[32px]">error</span>
									<span className="font-serif text-lg">Failed to retrieve divine collection. Please try again.</span>
								</div>
							) : products.length === 0 ? (
								<div className="col-span-full py-20 text-center text-on-surface-variant">No products found in the collection.</div>
							) : (
								products.map((p) => {
									const discountPercent = (p.oldPrice && p.oldPrice > p.price) ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
									
									return (
										<div key={p.id} onClick={() => navigate(`/product/${p.slug}`)} className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
											<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
												{p.isNewArrival && (
													<div className='absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold z-10'>
														New Arrival
													</div>
												)}
												{!p.isNewArrival && discountPercent > 0 && (
													<div className='absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold z-10'>
														{discountPercent}% OFF
													</div>
												)}
												<img
													alt={p.title}
													className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
													src={p.images?.[0]?.url || "https://placehold.co/400x500?text=No+Image"}
												/>
												{/* Hover overlay */}
												<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
												<LikeButton productId={p.id} />
											</div>

											<div className='grow flex flex-col'>
												<p className='font-sans text-[10px] text-tertiary mb-2 uppercase tracking-widest font-semibold truncate'>
													{p.category?.name || "Divine Attire"}
												</p>
												<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium truncate'>
													{p.title}
												</h3>
												<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
													{p.description}
												</p>

												<div className='mt-auto flex items-center justify-between'>
													<div className='flex items-baseline gap-3'>
														<span className='font-sans text-xl font-medium text-primary'>
															₹{Number(p.price).toLocaleString("en-IN")}
														</span>
														{discountPercent > 0 && (
															<span className='text-xs text-on-surface-variant line-through'>
																₹{Number(p.oldPrice).toLocaleString("en-IN")}
															</span>
														)}
													</div>
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
									);
								})
							)}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className='mt-stack-xl flex justify-center items-center gap-4'>
								<button
									type='button'
									disabled={page === 1 || showSkeleton}
									onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
									className={`h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center transition-all duration-300 ${
										page === 1 || showSkeleton
											? "opacity-30 cursor-not-allowed text-on-surface-variant"
											: "text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-90 cursor-pointer"
									}`}>
									<span className='material-symbols-outlined'>chevron_left</span>
								</button>

								{Array.from({ length: totalPages }, (_, idx) => {
									const pageNum = idx + 1;
									return (
										<button
											key={pageNum}
											type='button'
											disabled={showSkeleton}
											onClick={() => setPage(pageNum)}
											className={`h-10 w-10 rounded-full flex items-center justify-center font-sans text-sm transition-all duration-300 ${
												showSkeleton
													? "opacity-50 cursor-not-allowed text-on-surface-variant"
													: page === pageNum
														? "bg-primary text-surface font-bold shadow-[0_4px_14px_rgba(79,55,138,0.3)] scale-110 cursor-pointer"
														: "text-on-surface-variant hover:text-primary hover:bg-primary/5 active:scale-95 cursor-pointer"
											}`}>
											{pageNum}
										</button>
									);
								})}

								<button
									type='button'
									disabled={page === totalPages || showSkeleton}
									onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
									className={`h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center transition-all duration-300 ${
										page === totalPages || showSkeleton
											? "opacity-30 cursor-not-allowed text-on-surface-variant"
											: "text-on-surface-variant hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-90 cursor-pointer"
									}`}>
									<span className='material-symbols-outlined'>chevron_right</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}

