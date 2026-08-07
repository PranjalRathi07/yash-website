/** @format */

import { z } from "zod";

export const addToCartSchema = z.object({
	productId: z.string().min(1, "Product ID is required"),
	variantId: z.string().optional().nullable(),
	quantity: z.coerce
		.number()
		.int("Quantity must be an integer")
		.min(1, "Quantity must be at least 1")
		.max(50, "Maximum allowed quantity per item is 50")
		.default(1),
});

export const updateCartItemSchema = z.object({
	quantity: z.coerce
		.number()
		.int("Quantity must be an integer")
		.min(1, "Quantity must be at least 1")
		.max(50, "Maximum allowed quantity per item is 50"),
});
