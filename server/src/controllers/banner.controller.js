/** @format */
/** @format */

import prisma from "../config/prisma.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import { getCache, setCache, deleteCache, setHttpCacheHeaders } from "../config/redis.js";

export const createBanner = async (req, res) => {
	try {
		const { page, section, linkUrl, priority, isActive } = req.body;

		if (!page || !section) {
			return res.status(400).json({
				success: false,
				message: "Banner page and section are required",
			});
		}

		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "Banner image is required",
			});
		}

		const result = await uploadToCloudinary(
			req.file.buffer,
			"yash-website/banners",
		);

		const banner = await prisma.banner.create({
			data: {
				page,
				section,
				imageUrl: result.secure_url,
				publicId: result.public_id,
				linkUrl: linkUrl || null,
				priority: priority ? Number(priority) : 0,
				isActive: isActive === "false" ? false : true,
			},
		});

		// Invalidate banners cache
		await deleteCache("banners*");

		return res.status(201).json({
			success: true,
			message: "Banner created successfully",
			banner,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to create banner",
			error: error.message,
		});
	}
};

export const getActiveBanners = async (req, res) => {
	try {
		const cacheKey = "banners:active";
		const cachedData = await getCache(cacheKey);

		if (cachedData) {
			setHttpCacheHeaders(res, 300);
			return res.status(200).json(cachedData);
		}

		const banners = await prisma.banner.findMany({
			where: {
				isActive: true,
			},
			orderBy: {
				priority: "asc",
			},
		});

		const responseData = {
			success: true,
			banners,
		};

		// Cache for 10 minutes (600s)
		await setCache(cacheKey, responseData, 600);
		setHttpCacheHeaders(res, 300);

		return res.status(200).json(responseData);
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch banners",
			error: error.message,
		});
	}
};

export const getAllBannersAdmin = async (req, res) => {
	try {
		const banners = await prisma.banner.findMany({
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			banners,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to fetch banners",
			error: error.message,
		});
	}
};

export const updateBanner = async (req, res) => {
	try {
		const { id } = req.params;
		const { page, section, linkUrl, priority, isActive } = req.body;

		const banner = await prisma.banner.findUnique({
			where: { id },
		});

		if (!banner) {
			return res.status(404).json({
				success: false,
				message: "Banner not found",
			});
		}

		let imageUrl = banner.imageUrl;
		let publicId = banner.publicId;

		if (req.file) {
			const result = await uploadToCloudinary(
				req.file.buffer,
				"yash-website/banners",
			);

			imageUrl = result.secure_url;
			publicId = result.public_id;
		}

		const updatedBanner = await prisma.banner.update({
			where: { id },
			data: {
				page: page ?? banner.page,
				section: section ?? banner.section,
				linkUrl: linkUrl ?? banner.linkUrl,
				priority: priority ? Number(priority) : banner.priority,
				isActive:
					isActive !== undefined
						? isActive === "true" || isActive === true
						: banner.isActive,
				imageUrl,
				publicId,
			},
		});

		// Invalidate banners cache
		await deleteCache("banners*");

		return res.status(200).json({
			success: true,
			message: "Banner updated successfully",
			banner: updatedBanner,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to update banner",
			error: error.message,
		});
	}
};

export const deleteBanner = async (req, res) => {
	try {
		const { id } = req.params;

		await prisma.banner.delete({
			where: { id },
		});

		// Invalidate banners cache
		await deleteCache("banners*");

		return res.status(200).json({
			success: true,
			message: "Banner deleted successfully",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to delete banner",
			error: error.message,
		});
	}
};

