/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCoupon = async (req, res) => {
	try {
		const {
			code,
			discountType,
			discountValue,
			minOrderValue,
			maxDiscount,
			expiresAt,
			usageLimit,
		} = req.body;

		if (!code || !discountType || !discountValue) {
			return res.status(400).json({
				success: false,
				message: "Code, discount type and discount value are required",
			});
		}

		const coupon = await prisma.coupon.create({
			data: {
				code: code.toUpperCase(),
				discountType,
				discountValue: Number(discountValue),
				minOrderValue: minOrderValue ? Number(minOrderValue) : 0,
				maxDiscount: maxDiscount ? Number(maxDiscount) : null,
				expiresAt: expiresAt ? new Date(expiresAt) : null,
				usageLimit: usageLimit ? Number(usageLimit) : null,
			},
		});

		return res.status(201).json({
			success: true,
			message: "Coupon created successfully",
			coupon,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create coupon",
			error: error.message,
		});
	}
};

export const getAllCoupons = async (req, res) => {
	try {
		const coupons = await prisma.coupon.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			count: coupons.length,
			coupons,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch coupons",
			error: error.message,
		});
	}
};

export const updateCoupon = async (req, res) => {
	try {
		const { id } = req.params;

		const coupon = await prisma.coupon.findUnique({
			where: { id },
		});

		if (!coupon) {
			return res.status(404).json({
				success: false,
				message: "Coupon not found",
			});
		}

		const updatedCoupon = await prisma.coupon.update({
			where: { id },
			data: req.body,
		});

		return res.status(200).json({
			success: true,
			message: "Coupon updated successfully",
			coupon: updatedCoupon,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update coupon",
			error: error.message,
		});
	}
};

export const deleteCoupon = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.coupon.delete({
			where: { id },
		});

		return res.status(200).json({
			success: true,
			message: "Coupon deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete coupon",
			error: error.message,
		});
	}
};
