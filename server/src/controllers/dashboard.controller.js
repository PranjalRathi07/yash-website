/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAdminDashboard = async (req, res) => {
	try {
		const [
			totalProducts,
			totalOrders,
			totalCustomers,
			pendingOrders,
			lowStockProducts,
			recentOrders,
			revenueResult,
		] = await Promise.all([
			prisma.product.count(),
			prisma.order.count(),
			prisma.user.count({
				where: {
					role: "CUSTOMER",
				},
			}),
			prisma.order.count({
				where: {
					orderStatus: "PENDING",
				},
			}),
			prisma.product.findMany({
				where: {
					stock: {
						lte: 5,
					},
				},
				select: {
					id: true,
					title: true,
					stock: true,
				},
			}),
			prisma.order.findMany({
				take: 5,
				orderBy: {
					createdAt: "desc",
				},
				include: {
					user: {
						select: {
							name: true,
							email: true,
						},
					},
				},
			}),
			prisma.order.aggregate({
				where: {
					paymentStatus: "PAID",
				},
				_sum: {
					finalAmount: true,
				},
			}),
		]);

		return res.status(200).json({
			success: true,
			stats: {
				totalProducts,
				totalOrders,
				totalCustomers,
				pendingOrders,
				totalRevenue: revenueResult._sum.finalAmount || 0,
				lowStockProducts,
				recentOrders,
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch dashboard data",
			error: error.message,
		});
	}
};
