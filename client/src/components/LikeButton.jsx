/** @format */

import React, { useState } from "react";

export default function LikeButton({
	initialLiked = false,
	className = "absolute top-4 right-4",
}) {
	const [liked, setLiked] = useState(initialLiked);

	return (
		<button
			type='button'
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				setLiked(!liked);
			}}
			className={`${className} w-10 h-10 rounded-full backdrop-blur-md  flex items-center justify-center transition-all shadow-[0_4px_20px_rgba(0,0,0,0.05)] z-10 ${
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
