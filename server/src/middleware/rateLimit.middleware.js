/** @format */

import rateLimit from "express-rate-limit";

/**
 * General API Limiter
 * 300 requests per 15 minutes per IP
 */
export const globalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 300,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many requests from this IP, please try again after 15 minutes.",
	},
});

/**
 * Strict Auth Limiter
 * 20 attempts per 15 minutes per IP
 * Protects against brute-force login and spam registrations
 */
export const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 20,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many authentication attempts. Please try again after 15 minutes.",
	},
});

/**
 * Checkout & Payment Limiter
 * 10 requests per minute per IP
 * Protects against payment spam, order fraud, and card testing
 */
export const checkoutLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 10,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many checkout/payment attempts. Please wait a minute before trying again.",
	},
});

/**
 * Product Catalog & Search Limiter
 * 60 requests per minute per IP
 * Prevents aggressive scraping and denial of service
 */
export const productSearchLimiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 60,
	standardHeaders: true,
	legacyHeaders: false,
	message: {
		success: false,
		message: "Too many search requests. Please slow down.",
	},
});
