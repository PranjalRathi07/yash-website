/** @format */

import { z } from "zod";

export const createProductSchema = z.object({
	title: z
		.string()
		.trim()
		.min(2, "Title must be at least 2 characters")
		.max(200, "Title is too long"),
	description: z
		.string()
		.trim()
		.min(5, "Description must be at least 5 characters"),
	price: z.coerce
		.number()
		.positive("Price must be a positive number greater than 0"),
	oldPrice: z.coerce
		.number()
		.nonnegative("Old price cannot be negative")
		.optional()
		.nullable(),
	stock: z.coerce
		.number()
		.int("Stock must be an integer")
		.nonnegative("Stock cannot be negative")
		.default(0),
	categoryId: z.string().min(1, "Category is required"),
	isFeatured: z
		.union([z.boolean(), z.string().transform((v) => v === "true")])
		.optional(),
	isBestSeller: z
		.union([z.boolean(), z.string().transform((v) => v === "true")])
		.optional(),
	isNewArrival: z
		.union([z.boolean(), z.string().transform((v) => v === "true")])
		.optional(),
	isFestivalWear: z
		.union([z.boolean(), z.string().transform((v) => v === "true")])
		.optional(),
	sizes: z.string().optional(),
});

export const updateProductSchema = createProductSchema.partial();
