/** @format */
import prisma from "../config/prisma.js"

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
			allPaidOrdersForYear,
			paidOrderItems,
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
			prisma.order.findMany({
				where: {
					paymentStatus: "PAID",
					createdAt: {
						gte: new Date(new Date().getFullYear(), 0, 1),
						lte: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59),
					},
				},
				select: {
					finalAmount: true,
					createdAt: true,
				},
			}),
			prisma.orderItem.findMany({
				where: {
					order: {
						paymentStatus: "PAID",
					},
				},
				include: {
					product: {
						include: {
							category: true,
						},
					},
				},
			}),
		]);

		// Group monthly sales
		const monthlySalesMap = {};
		allPaidOrdersForYear.forEach((order) => {
			const monthIndex = new Date(order.createdAt).getMonth();
			monthlySalesMap[monthIndex] = (monthlySalesMap[monthIndex] || 0) + Number(order.finalAmount);
		});

		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const rawSalesGrowth = monthNames.map((month, idx) => {
			const amount = monthlySalesMap[idx] || 0;
			return {
				month,
				rawAmount: amount,
				amount: amount >= 1000 ? `₹${(amount / 1000).toFixed(1)}k` : `₹${amount}`,
			};
		});

		const maxAmount = Math.max(...rawSalesGrowth.map((s) => s.rawAmount), 1);
		const salesGrowth = rawSalesGrowth.map((s) => ({
			month: s.month,
			amount: s.amount,
			heightPercent: Math.round((s.rawAmount / maxAmount) * 100),
			rawAmount: s.rawAmount,
		}));

		// Group category sales
		const categorySalesMap = {};
		paidOrderItems.forEach((item) => {
			const categoryName = item.product?.category?.name || "Divine Attire";
			categorySalesMap[categoryName] = (categorySalesMap[categoryName] || 0) + Number(item.totalPrice);
		});

		const categorySales = Object.entries(categorySalesMap)
			.map(([name, total]) => ({
				label: name,
				rawAmount: total,
				value: total >= 1000 ? `₹${(total / 1000).toFixed(1)}K` : `₹${total}`,
			}))
			.sort((a, b) => b.rawAmount - a.rawAmount);

		const topCategories = categorySales.slice(0, 3);
		const totalSalesSum = topCategories.reduce((acc, cat) => acc + cat.rawAmount, 0) || 1;
		const categoryPillars = topCategories.map((cat, idx) => ({
			...cat,
			percent: Math.round((cat.rawAmount / totalSalesSum) * 100),
		}));

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
				salesGrowth,
				categoryPillars,
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
