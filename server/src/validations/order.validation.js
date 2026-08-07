/** @format */

import { z } from "zod";

export const createCheckoutOrderSchema = z.object({
	addressId: z.string().min(1, "Delivery address is required"),
	paymentMethod: z.enum(["COD", "RAZORPAY"], {
		errorMap: () => ({ message: "Payment method must be COD or RAZORPAY" }),
	}).default("COD"),
	couponCode: z.string().trim().min(1).optional().nullable(),
});

export const updateOrderStatusSchema = z.object({
	orderStatus: z.enum(
		["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"],
		{ errorMap: () => ({ message: "Invalid order status" }) }
	).optional(),
	paymentStatus: z.enum(
		["PENDING", "PAID", "FAILED", "REFUNDED"],
		{ errorMap: () => ({ message: "Invalid payment status" }) }
	).optional(),
});
