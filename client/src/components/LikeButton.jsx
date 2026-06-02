/** @format */

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

export default function LikeButton({
	productId,
	initialLiked = false,
	className = "absolute top-4 right-4",
	onClick,
}) {
	const queryClient = useQueryClient();

	// Fetch wishlist items from cache (shared globally)
	const { data: wishlist = [] } = useQuery({
		queryKey: ["wishlist"],
		queryFn: async () => {
			const res = await api.get("/api/wishlist");
			return res.data?.wishlist || [];
		},
		enabled: !!productId,
	});

	// Derive actual backend favorite status
	const isBackendLiked = productId
		? wishlist.some((item) => item.productId === productId)
		: initialLiked;

	const [prevBackendLiked, setPrevBackendLiked] = useState(isBackendLiked);
	// Local optimistic state (null means use backend state)
	const [localLiked, setLocalLiked] = useState(null);

	// Synchronize local optimistic state during the render phase when backend query resolves
	if (isBackendLiked !== prevBackendLiked) {
		setPrevBackendLiked(isBackendLiked);
		setLocalLiked(null);
	}

	// Effective liked state
	const liked = localLiked !== null ? localLiked : isBackendLiked;

	const addMutation = useMutation({
		mutationFn: async () => {
			return await api.post("/api/wishlist", { productId });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});

	const removeMutation = useMutation({
		mutationFn: async () => {
			return await api.delete(`/api/wishlist/${productId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});

	const handleLikeToggle = (e) => {
		e.preventDefault();
		e.stopPropagation();

		const nextLiked = !liked;
		setLocalLiked(nextLiked);

		if (!productId) {
			if (onClick) onClick(e);
			return;
		}

		if (liked) {
			removeMutation.mutate();
		} else {
			addMutation.mutate();
		}

		if (onClick) onClick(e);
	};

	return (
		<button
			type='button'
			onClick={handleLikeToggle}
			className={`${className} w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10 ${
				liked
					? "bg-surface border-tertiary text-tertiary"
					: "bg-surface/80 border-tertiary/30 text-primary hover:text-tertiary hover:border-tertiary hover:bg-surface"
			}`}>
			<span
				className='material-symbols-outlined text-[18px]'
				style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>
				favorite
			</span>
		</button>
	);
}
