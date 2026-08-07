/** @format */

import { z } from "zod";

export const createAddressSchema = z.object({
	fullName: z
		.string()
		.trim()
		.min(2, "Full name must be at least 2 characters")
		.max(100, "Full name is too long"),
	phone: z
		.string()
		.trim()
		.min(10, "Phone number must be at least 10 digits")
		.max(15, "Phone number is too long"),
	line1: z
		.string()
		.trim()
		.min(3, "Address line 1 must be at least 3 characters")
		.max(200, "Address line 1 is too long"),
	line2: z.string().trim().max(200).optional().nullable(),
	city: z
		.string()
		.trim()
		.min(2, "City must be at least 2 characters")
		.max(100, "City name is too long"),
	state: z
		.string()
		.trim()
		.min(2, "State must be at least 2 characters")
		.max(100, "State name is too long"),
	postalCode: z
		.string()
		.trim()
		.min(4, "Postal code must be at least 4 digits")
		.max(10, "Postal code is too long"),
	country: z.string().trim().default("India").optional(),
	isDefault: z
		.union([z.boolean(), z.string().transform((v) => v === "true")])
		.optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
