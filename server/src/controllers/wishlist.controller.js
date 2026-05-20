/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addToWishlist = async (req, res) => {
	try {
		const { productId } = req.body;

		if (!productId) {
			return res.status(400).json({
				success: false,
				message: "Product ID is required",
			});
		}

		const existingWishlist = await prisma.wishlist.findUnique({
			where: {
				userId_productId: {
					userId: req.user.id,
					productId,
				},
			},
		});

		if (existingWishlist) {
			return res.status(409).json({
				success: false,
				message: "Product already in wishlist",
			});
		}

		const wishlist = await prisma.wishlist.create({
			data: {
				userId: req.user.id,
				productId,
			},
			include: {
				product: {
					include: {
						images: true,
						category: true,
					},
				},
			},
		});

		return res.status(201).json({
			success: true,
			message: "Product added to wishlist",
			wishlist,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to add to wishlist",
			error: error.message,
		});
	}
};

export const getMyWishlist = async (req, res) => {
	try {
		const wishlist = await prisma.wishlist.findMany({
			where: {
				userId: req.user.id,
			},
			include: {
				product: {
					include: {
						images: true,
						category: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			count: wishlist.length,
			wishlist,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch wishlist",
			error: error.message,
		});
	}
};

export const removeFromWishlist = async (req, res) => {
	try {
		const { productId } = req.params;

		const wishlist = await prisma.wishlist.findUnique({
			where: {
				userId_productId: {
					userId: req.user.id,
					productId,
				},
			},
		});

		if (!wishlist) {
			return res.status(404).json({
				success: false,
				message: "Wishlist item not found",
			});
		}

		await prisma.wishlist.delete({
			where: {
				userId_productId: {
					userId: req.user.id,
					productId,
				},
			},
		});

		return res.status(200).json({
			success: true,
			message: "Product removed from wishlist",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to remove from wishlist",
			error: error.message,
		});
	}
};
