/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import LikeButton from "../components/LikeButton";
import ProductSidebar from "../components/ProductSidebar";
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

export default function NewArrivals() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");
	const [selectedSizes, setSelectedSizes] = useState([]);
	const [sortOption, setSortOption] = useState("Recommended");

	const handleCategoryChange = (category) => {
		setSelectedCategories(prev =>
			prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
		);
		setPage(1);
	};

	const handleSizeChange = (size) => {
		setSelectedSizes(prev =>
			prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
		);
		setPage(1);
	};

	const handleSortChange = (e) => {
		setSortOption(e.target.value);
		setPage(1);
	};

	const cartMutation = useMutation({
		mutationFn: async (productId) => {
			return await api.post("/api/cart", { productId, quantity: 1 });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	const handleAddToCart = (e, productId) => {
		e.stopPropagation();
		if (!localStorage.getItem("supabaseToken")) {
			navigate("/login");
			return;
		}
		cartMutation.mutate(productId);
	};

	const { data, isLoading, isError, isFetching } = useQuery({
		queryKey: ["newArrivals", page, selectedCategories, minPrice, maxPrice, selectedSizes, sortOption],
		queryFn: async () => {
			const params = new URLSearchParams({
				isNewArrival: "true",
				page,
				limit: 9
			});
			if (selectedCategories.length > 0) params.append("categories", selectedCategories.join(","));
			if (minPrice) params.append("minPrice", minPrice);
			if (maxPrice) params.append("maxPrice", maxPrice);
			if (selectedSizes.length > 0) params.append("sizes", selectedSizes.join(","));
			if (sortOption !== "Recommended") params.append("sort", sortOption);

			const res = await api.get(`/api/products?${params.toString()}`);
			return res.data;
		},
		placeholderData: keepPreviousData,
	});

	const products = data?.products || [];
	const totalPages = data?.totalPages || 1;
	const showSkeleton = isLoading || isFetching;

	const categoriesList = [
		"Daily Wear",
		"Mukut",
		"Jewelry",
		"Bansuri",
		"Combo Sets",
		"Winter Wear",
		"Premium Sets",
	];
	const sizesList = ["0-2", "3-5", "6-8", "9-12", "12+"];

	return (
		<div className='bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow w-full px-4 md:px-8 lg:px-16 xl:px-24 py-stack-xl'>
				{/* Page Header */}
				<div className='mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						New Arrivals
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed'>
						Discover the latest additions to our exquisite collection of divine
						attire, crafted with reverence and luxury to adorn your beloved
						deity.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-12 items-start'>
					{/* Sidebar */}
					<ProductSidebar
						categories={categoriesList}
						selectedCategories={selectedCategories}
						onCategoryChange={handleCategoryChange}
						minPrice={minPrice}
						maxPrice={maxPrice}
						onMinPriceChange={(val) => { setMinPrice(val); setPage(1); }}
						onMaxPriceChange={(val) => { setMaxPrice(val); setPage(1); }}
						sizes={sizesList}
						selectedSizes={selectedSizes}
						onSizeChange={handleSizeChange}
					/>

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
									value={sortOption}
									onChange={handleSortChange}
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
									<span className="font-serif text-lg">Failed to retrieve new arrivals. Please try again.</span>
								</div>
							) : products.length === 0 ? (
								<div className="col-span-full py-20 text-center text-on-surface-variant">No new arrivals found.</div>
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
															<>
																<span className='text-xs text-on-surface-variant line-through'>
																	₹{Number(p.oldPrice).toLocaleString("en-IN")}
																</span>
																<span className='text-xs text-tertiary font-semibold'>
																	({discountPercent}% OFF)
																</span>
															</>
														)}
													</div>
													<button
														type='button'
														onClick={(e) => handleAddToCart(e, p.id)}
														disabled={cartMutation.isPending}
														className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform disabled:opacity-50'>
														<span className='material-symbols-outlined text-[20px]'>
															shopping_bag
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
