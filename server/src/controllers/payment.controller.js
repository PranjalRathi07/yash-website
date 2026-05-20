/** @format */

import crypto from "crypto";
import { createOrderFromCart } from "../utils/order-service.js";

export const verifyRazorpayPayment = async (req, res) => {
	try {
		const {
			addressId,
			couponCode,
			razorpay_order_id,
			razorpay_payment_id,
			razorpay_signature,
		} = req.body;

		if (
			!addressId ||
			!razorpay_order_id ||
			!razorpay_payment_id ||
			!razorpay_signature
		) {
			return res.status(400).json({
				success: false,
				message: "Payment verification details are required",
			});
		}

		const body = `${razorpay_order_id}|${razorpay_payment_id}`;

		const expectedSignature = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(body)
			.digest("hex");

		if (expectedSignature !== razorpay_signature) {
			return res.status(400).json({
				success: false,
				message: "Invalid payment signature",
			});
		}

		// Only after payment success, create DB order.
		const order = await createOrderFromCart({
			userId: req.user.id,
			addressId,
			couponCode,
			paymentMethod: "RAZORPAY",
			razorpayOrderId: razorpay_order_id,
			razorpayPaymentId: razorpay_payment_id,
			razorpaySignature: razorpay_signature,
		});

		return res.status(201).json({
			success: true,
			message: "Payment verified and order placed successfully",
			order,
		});
	} catch (error) {
		console.error("Payment verification error:", error);

		return res.status(500).json({
			success: false,
			message: "Payment verification failed",
			error: error.message,
		});
	}
};