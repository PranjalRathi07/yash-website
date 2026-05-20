/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createReview = async (req, res) => {
	try {
		const { productId, rating, comment } = req.body;

		if (!productId || !rating) {
			return res.status(400).json({
				success: false,
				message: "Product ID and rating are required",
			});
		}

		const review = await prisma.review.create({
			data: {
				productId,
				userId: req.user.id,
				rating: Number(rating),
				comment: comment || null,
				isApproved: false,
			},
		});

		return res.status(201).json({
			success: true,
			message: "Review submitted successfully. Waiting for approval.",
			review,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create review",
			error: error.message,
		});
	}
};

export const getAllReviewsAdmin = async (req, res) => {
	try {
		const reviews = await prisma.review.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				product: {
					select: {
						id: true,
						title: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			reviews,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch reviews",
			error: error.message,
		});
	}
};

export const approveReview = async (req, res) => {
	try {
		const { id } = req.params;

		const review = await prisma.review.update({
			where: { id },
			data: {
				isApproved: true,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Review approved successfully",
			review,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to approve review",
			error: error.message,
		});
	}
};

export const deleteReview = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.review.delete({
			where: { id },
		});

		return res.status(200).json({
			success: true,
			message: "Review deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete review",
			error: error.message,
		});
	}
};
