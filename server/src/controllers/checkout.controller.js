/** @format */

import razorpay from "../config/razorpay.js";
import {
	createOrderFromCart,
	generateOrderNumber,
	getCheckoutData,
} from "../utils/order-service.js";

export const createCheckoutOrder = async (req, res) => {
	try {
		const { addressId, couponCode, paymentMethod = "COD" } = req.body;

		if (!addressId) {
			return res.status(400).json({
				success: false,
				message: "Address ID is required",
			});
		}

		if (!["COD", "RAZORPAY"].includes(paymentMethod)) {
			return res.status(400).json({
				success: false,
				message: "Invalid payment method",
			});
		}

		// COD order is considered successful immediately.
		if (paymentMethod === "COD") {
			const order = await createOrderFromCart({
				userId: req.user.id,
				addressId,
				couponCode,
				paymentMethod: "COD",
			});

			return res.status(201).json({
				success: true,
				message: "COD order placed successfully",
				order,
			});
		}

		// Razorpay: do NOT create database order here.
		// Only create Razorpay order.
		const { finalAmount } = await getCheckoutData({
			userId: req.user.id,
			addressId,
			couponCode,
		});

		const receipt = generateOrderNumber();

		const razorpayOrder = await razorpay.orders.create({
			amount: Math.round(finalAmount * 100),
			currency: "INR",
			receipt,
		});

		return res.status(200).json({
			success: true,
			message: "Razorpay order created. Complete payment to place order.",
			razorpayOrder,
			checkout: {
				addressId,
				couponCode: couponCode || null,
				paymentMethod: "RAZORPAY",
				amount: finalAmount,
			},
		});
	} catch (error) {
		console.error("Checkout error:", error);

		return res.status(500).json({
			success: false,
			message: "Checkout failed",
			error: error.message,
		});
	}
};