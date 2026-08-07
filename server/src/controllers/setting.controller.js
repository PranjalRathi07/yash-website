/** @format */

import prisma from "../config/prisma.js";
import { getCache, setCache, deleteCache, setHttpCacheHeaders } from "../config/redis.js";

export const getSettings = async (req, res) => {
	try {
		const cacheKey = "settings:all";
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			setHttpCacheHeaders(res, 300);
			return res.status(200).json(cachedData);
		}

		const settings = await prisma.websiteSetting.findMany();

		const responseData = {
			success: true,
			settings,
		};

		// Cache for 15 minutes (900s)
		await setCache(cacheKey, responseData, 900);
		setHttpCacheHeaders(res, 300);

		return res.status(200).json(responseData);
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

		// Invalidate settings cache
		await deleteCache("settings*");

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

		// Invalidate settings cache
		await deleteCache("settings*");

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

