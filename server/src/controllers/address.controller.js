/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createAddress = async (req, res) => {
	try {
		const {
			fullName,
			phone,
			line1,
			line2,
			city,
			state,
			postalCode,
			country,
			isDefault,
		} = req.body;

		if (!fullName || !phone || !line1 || !city || !state || !postalCode) {
			return res.status(400).json({
				success: false,
				message:
					"Full name, phone, address, city, state and postal code are required",
			});
		}

		const existingAddressCount = await prisma.address.count({
			where: {
				userId: req.user.id,
			},
		});

		const shouldBeDefault =
			isDefault === true || isDefault === "true" || existingAddressCount === 0;

		if (shouldBeDefault) {
			await prisma.address.updateMany({
				where: {
					userId: req.user.id,
				},
				data: {
					isDefault: false,
				},
			});
		}

		const address = await prisma.address.create({
			data: {
				fullName,
				phone,
				line1,
				line2: line2 || null,
				city,
				state,
				postalCode,
				country: country || "India",
				isDefault: shouldBeDefault,
				userId: req.user.id,
			},
		});

		return res.status(201).json({
			success: true,
			message: "Address created successfully",
			address,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create address",
			error: error.message,
		});
	}
};

export const getMyAddresses = async (req, res) => {
	try {
		const addresses = await prisma.address.findMany({
			where: { userId: req.user.id },
			orderBy: { createdAt: "desc" },
		});

		return res.status(200).json({
			success: true,
			count: addresses.length,
			addresses,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch addresses",
			error: error.message,
		});
	}
};

export const updateAddress = async (req, res) => {
	try {
		const { id } = req.params;

		const address = await prisma.address.findUnique({
			where: { id },
		});

		if (!address || address.userId !== req.user.id) {
			return res.status(404).json({
				success: false,
				message: "Address not found",
			});
		}

		if (req.body.isDefault) {
			await prisma.address.updateMany({
				where: { userId: req.user.id },
				data: { isDefault: false },
			});
		}

		const updatedAddress = await prisma.address.update({
			where: { id },
			data: {
				fullName: req.body.fullName ?? address.fullName,
				phone: req.body.phone ?? address.phone,
				line1: req.body.line1 ?? address.line1,
				line2: req.body.line2 ?? address.line2,
				city: req.body.city ?? address.city,
				state: req.body.state ?? address.state,
				postalCode: req.body.postalCode ?? address.postalCode,
				country: req.body.country ?? address.country,
				isDefault:
					req.body.isDefault !== undefined
						? Boolean(req.body.isDefault)
						: address.isDefault,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Address updated successfully",
			address: updatedAddress,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update address",
			error: error.message,
		});
	}
};

export const deleteAddress = async (req, res) => {
	try {
		const { id } = req.params;

		const address = await prisma.address.findUnique({
			where: { id },
		});

		if (!address || address.userId !== req.user.id) {
			return res.status(404).json({
				success: false,
				message: "Address not found",
			});
		}

		await prisma.address.delete({
			where: { id },
		});

		return res.status(200).json({
			success: true,
			message: "Address deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete address",
			error: error.message,
		});
	}
};