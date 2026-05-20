/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addToCart = async (req, res) => {
	try {
		const { productId, variantId, quantity } = req.body;

		if (!productId) {
			return res.status(400).json({
				success: false,
				message: "Product ID is required",
			});
		}

		let cart = await prisma.cart.findUnique({
			where: {
				userId: req.user.id,
			},
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: {
					userId: req.user.id,
				},
			});
		}

		const existingItem = await prisma.cartItem.findFirst({
			where: {
				cartId: cart.id,
				productId,
				variantId: variantId || null,
			},
		});

		if (existingItem) {
			await prisma.cartItem.update({
				where: {
					id: existingItem.id,
				},
				data: {
					quantity: existingItem.quantity + Number(quantity || 1),
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: cart.id,
					productId,
					variantId: variantId || null,
					quantity: Number(quantity || 1),
				},
			});
		}

		const updatedCart = await prisma.cart.findUnique({
			where: {
				id: cart.id,
			},
			include: {
				items: {
					include: {
						product: {
							include: {
								images: true,
							},
						},
						variant: true,
					},
				},
			},
		});

		return res.status(200).json({
			success: true,
			message: "Product added to cart",
			cart: updatedCart,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to add product to cart",
			error: error.message,
		});
	}
};

export const getMyCart = async (req, res) => {
	try {
		const cart = await prisma.cart.findUnique({
			where: {
				userId: req.user.id,
			},
			include: {
				items: {
					include: {
						product: {
							include: {
								images: true,
								category: true,
							},
						},
						variant: true,
					},
				},
			},
		});

		return res.status(200).json({
			success: true,
			cart: cart || {
				items: [],
			},
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch cart",
			error: error.message,
		});
	}
};

export const updateCartItem = async (req, res) => {
	try {
		const { id } = req.params;
		const { quantity } = req.body;

		if (!quantity || Number(quantity) < 1) {
			return res.status(400).json({
				success: false,
				message: "Quantity must be at least 1",
			});
		}

		const cartItem = await prisma.cartItem.findUnique({
			where: {
				id,
			},
			include: {
				cart: true,
			},
		});

		if (!cartItem || cartItem.cart.userId !== req.user.id) {
			return res.status(404).json({
				success: false,
				message: "Cart item not found",
			});
		}

		const updatedItem = await prisma.cartItem.update({
			where: {
				id,
			},
			data: {
				quantity: Number(quantity),
			},
		});

		return res.status(200).json({
			success: true,
			message: "Cart item updated",
			item: updatedItem,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update cart item",
			error: error.message,
		});
	}
};

export const removeCartItem = async (req, res) => {
	try {
		const { id } = req.params;

		const cartItem = await prisma.cartItem.findUnique({
			where: {
				id,
			},
			include: {
				cart: true,
			},
		});

		if (!cartItem || cartItem.cart.userId !== req.user.id) {
			return res.status(404).json({
				success: false,
				message: "Cart item not found",
			});
		}

		const cartId = cartItem.cartId;

		await prisma.cartItem.delete({
			where: {
				id,
			},
		});

		const remainingItems = await prisma.cartItem.count({
			where: {
				cartId,
			},
		});

		if (remainingItems === 0) {
			await prisma.cart.delete({
				where: {
					id: cartId,
				},
			});
		}

		return res.status(200).json({
			success: true,
			message: "Product removed from cart",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to remove cart item",
			error: error.message,
		});
	}
};
