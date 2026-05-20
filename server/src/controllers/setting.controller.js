/** @format */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getSettings = async (req, res) => {
	try {
		const settings = await prisma.websiteSetting.findMany();

		return res.status(200).json({
			success: true,
			settings,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch settings",
			error: error.message,
		});
	}
};

export const upsertSetting = async (req, res) => {
	try {
		const { key, value, description } = req.body;

		if (!key || value === undefined) {
			return res.status(400).json({
				success: false,
				message: "Key and value are required",
			});
		}

		const setting = await prisma.websiteSetting.upsert({
			where: {
				key,
			},
			update: {
				value,
				description: description || null,
			},
			create: {
				key,
				value,
				description: description || null,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Setting saved successfully",
			setting,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to save setting",
			error: error.message,
		});
	}
};

export const deleteSetting = async (req, res) => {
	try {
		const { key } = req.params;

		await prisma.websiteSetting.delete({
			where: {
				key,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Setting deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete setting",
			error: error.message,
		});
	}
};
