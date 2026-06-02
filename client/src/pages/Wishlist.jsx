/** @format */
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

export default function Wishlist() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: wishlist = [], isLoading, isError } = useQuery({
		queryKey: ["wishlist"],
		queryFn: async () => {
			const res = await api.get("/api/wishlist");
			return res.data?.wishlist || [];
		},
	});

	const cartMutation = useMutation({
		mutationFn: async (productId) => {
			return await api.post("/api/cart", { productId, quantity: 1 });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
		},
	});

	if (isError) {
		return (
			<div className='w-full text-center py-20 flex flex-col items-center justify-center gap-4 font-sans text-red-500'>
				<span className='material-symbols-outlined text-[48px]'>error</span>
				<span>Failed to load your wishlist. Please try again.</span>
			</div>
		);
	}

	if (wishlist.length === 0 && !isLoading) {
		return (
			<div className='w-full text-center py-20 flex flex-col items-center justify-center gap-4 font-sans text-on-surface-variant border border-dashed border-tertiary/20 rounded-md bg-surface-container-low'>
				<span className='material-symbols-outlined text-[64px] text-tertiary/40 mb-2'>
					favorite
				</span>
				<h3 className='font-serif text-3xl text-primary'>Your Wishlist is Empty</h3>
				<p className='font-sans text-sm max-w-sm leading-relaxed mb-6'>
					Explore our collection of divine attire and save your favorite garments here.
				</p>
				<button
					onClick={() => navigate("/collection")}
					className='bg-primary text-surface px-8 py-3.5 rounded-full font-sans text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-colors shadow-lg'>
					Explore Collection
				</button>
			</div>
		);
	}

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
					<div className='flex items-center justify-center w-full max-w-30'>
						<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
						<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
						<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
					</div>
				</div>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
				{isLoading ? (
					Array.from({ length: 3 }).map((_, idx) => (
						<ProductSkeleton key={idx} />
					))
				) : (
					wishlist.map((item) => {
						const p = item.product;
						if (!p) return null;
						
						const displayImg = p.images?.[0]?.url || "https://placehold.co/400x500?text=No+Image";

						return (
							<div
								key={item.id}
								onClick={() => navigate(`/product/${p.slug}`)}
								className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
								<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
									<img
										alt={p.title}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src={displayImg}
									/>
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
									<LikeButton productId={p.id} />
								</div>

								<div className='grow flex flex-col'>
									<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium truncate'>
										{p.title}
									</h3>
									<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
										{p.description}
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<span className='font-sans text-xl font-medium text-primary'>
											₹{Number(p.price).toLocaleString("en-IN")}
										</span>
										<button
											type='button'
											disabled={cartMutation.isPending}
											onClick={(e) => {
												e.stopPropagation();
												cartMutation.mutate(p.id);
											}}
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
		</div>
	);
}
