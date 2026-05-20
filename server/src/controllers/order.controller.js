/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllOrdersAdmin = async (req, res) => {
	try {
		const orders = await prisma.order.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
					},
				},
				items: true,
				payment: true,
				coupon: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			count: orders.length,
			orders,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch orders",
			error: error.message,
		});
	}
};

export const getSingleOrderAdmin = async (req, res) => {
	try {
		const { id } = req.params;

		const order = await prisma.order.findUnique({
			where: { id },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						phone: true,
					},
				},
				items: true,
				payment: true,
				coupon: true,
			},
		});

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}

		return res.status(200).json({
			success: true,
			order,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch order",
			error: error.message,
		});
	}
};

export const updateOrderStatusAdmin = async (req, res) => {
	try {
		const { id } = req.params;
		const { orderStatus, paymentStatus, trackingId, courierName } = req.body;

		const order = await prisma.order.findUnique({
			where: { id },
		});

		if (!order) {
			return res.status(404).json({
				success: false,
				message: "Order not found",
			});
		}

		const updatedOrder = await prisma.order.update({
			where: { id },
			data: {
				orderStatus: orderStatus ?? order.orderStatus,
				paymentStatus: paymentStatus ?? order.paymentStatus,
				trackingId: trackingId ?? order.trackingId,
				courierName: courierName ?? order.courierName,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Order updated successfully",
			order: updatedOrder,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update order",
			error: error.message,
		});
	}
};
