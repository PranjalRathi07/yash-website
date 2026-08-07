/** @format */

import { z } from "zod";

export const createReviewSchema = z.object({
	productId: z.string().min(1, "Product ID is required"),
	rating: z.coerce
		.number()
		.int("Rating must be an integer")
		.min(1, "Rating must be between 1 and 5")
		.max(5, "Rating must be between 1 and 5"),
	comment: z
		.string()
		.trim()
		.max(1000, "Review comment cannot exceed 1000 characters")
		.optional()
		.nullable(),
});
