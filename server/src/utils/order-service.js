/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateOrderNumber = () => {
	return `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
};

export const getCheckoutData = async ({ userId, addressId, couponCode }) => {
	const address = await prisma.address.findUnique({
		where: { id: addressId },
	});

	if (!address || address.userId !== userId) {
		throw new Error("Address not found");
	}

	const cart = await prisma.cart.findUnique({
		where: { userId },
		include: {
			items: {
				include: {
					product: {
						include: { images: true },
					},
					variant: true,
				},
			},
		},
	});

	if (!cart || cart.items.length === 0) {
		throw new Error("Cart is empty");
	}

	let totalAmount = 0;

	for (const item of cart.items) {
		if (!item.product || !item.product.isActive) {
			throw new Error("Some products in your cart are unavailable");
		}

		if (item.variantId && item.variant) {
			if (item.variant.stock < item.quantity) {
				throw new Error(`${item.product.title} selected variant is out of stock`);
			}
		} else if (item.product.stock < item.quantity) {
			throw new Error(`${item.product.title} is out of stock`);
		}

		const price = item.variant?.price || item.product.price;
		totalAmount += Number(price) * item.quantity;
	}

	let coupon = null;
	let discountAmount = 0;

	if (couponCode) {
		coupon = await prisma.coupon.findUnique({
			where: { code: couponCode.toUpperCase() },
		});

		if (!coupon || !coupon.isActive) {
			throw new Error("Invalid coupon");
		}

		if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
			throw new Error("Coupon expired");
		}

		if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
			throw new Error("Coupon usage limit reached");
		}

		if (totalAmount < Number(coupon.minOrderValue)) {
			throw new Error(`Minimum order value should be ₹${coupon.minOrderValue}`);
		}

		if (coupon.discountType === "PERCENTAGE") {
			discountAmount = (totalAmount * Number(coupon.discountValue)) / 100;

			if (coupon.maxDiscount) {
				discountAmount = Math.min(discountAmount, Number(coupon.maxDiscount));
			}
		} else {
			discountAmount = Number(coupon.discountValue);
		}
	}

	const shippingCharge = totalAmount >= 999 ? 0 : 99;
	const finalAmount = totalAmount - discountAmount + shippingCharge;

	return {
		address,
		cart,
		coupon,
		totalAmount,
		discountAmount,
		shippingCharge,
		finalAmount,
	};
};

export const createOrderFromCart = async ({
	userId,
	addressId,
	couponCode,
	paymentMethod,
	razorpayOrderId = null,
	razorpayPaymentId = null,
	razorpaySignature = null,
}) => {
	const {
		address,
		cart,
		coupon,
		totalAmount,
		discountAmount,
		shippingCharge,
		finalAmount,
	} = await getCheckoutData({
		userId,
		addressId,
		couponCode,
	});

	const orderNumber = generateOrderNumber();

	const order = await prisma.$transaction(async (tx) => {
		const createdOrder = await tx.order.create({
			data: {
				orderNumber,
				userId,
				addressId: address.id,
				couponId: coupon?.id || null,

				totalAmount,
				discountAmount,
				shippingCharge,
				finalAmount,

				orderStatus: paymentMethod === "RAZORPAY" ? "CONFIRMED" : "PENDING",
				paymentStatus: paymentMethod === "RAZORPAY" ? "PAID" : "PENDING",

				fullName: address.fullName,
				phone: address.phone,
				addressLine: `${address.line1}${address.line2 ? ", " + address.line2 : ""}`,
				city: address.city,
				state: address.state,
				pincode: address.postalCode,
				country: address.country,
			},
		});

		for (const item of cart.items) {
			const price = item.variant?.price || item.product.price;

			await tx.orderItem.create({
				data: {
					orderId: createdOrder.id,
					productId: item.productId,
					variantId: item.variantId || null,

					productTitle: item.product.title,
					productImage: item.product.images[0]?.url || null,
					size: item.variant?.size || null,
					color: item.variant?.color || null,

					quantity: item.quantity,
					price,
					totalPrice: Number(price) * item.quantity,
				},
			});

			if (item.variantId) {
				await tx.productVariant.update({
					where: { id: item.variantId },
					data: {
						stock: {
							decrement: item.quantity,
						},
					},
				});
			} else {
				await tx.product.update({
					where: { id: item.productId },
					data: {
						stock: {
							decrement: item.quantity,
						},
					},
				});
			}
		}

		await tx.payment.create({
			data: {
				orderId: createdOrder.id,
				amount: finalAmount,
				method: paymentMethod,
				paymentGateway: paymentMethod === "RAZORPAY" ? "Razorpay" : "COD",
				gatewayOrderId: razorpayOrderId,
				gatewayPaymentId: razorpayPaymentId,
				gatewaySignature: razorpaySignature,
				status: paymentMethod === "RAZORPAY" ? "PAID" : "PENDING",
				paidAt: paymentMethod === "RAZORPAY" ? new Date() : null,
			},
		});

		if (coupon) {
			await tx.coupon.update({
				where: { id: coupon.id },
				data: {
					usedCount: {
						increment: 1,
					},
				},
			});
		}

		return createdOrder;
	});

	const finalOrder = await prisma.order.findUnique({
		where: { id: order.id },
		include: {
			items: true,
			payment: true,
			coupon: true,
		},
	});

	return finalOrder;
};