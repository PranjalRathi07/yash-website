/** @format */

import express from "express";
import { upload } from "../config/multer.js";
import {
	createBanner,
	getActiveBanners,
	getAllBannersAdmin,
	updateBanner,
	deleteBanner,
} from "../controllers/banner.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getActiveBanners);
router.get("/admin/all", authMiddleware, isAdmin, getAllBannersAdmin);

router.post("/", authMiddleware, isAdmin, upload.single("image"), createBanner);
router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	upload.single("image"),
	updateBanner,
);
router.delete("/:id", authMiddleware, isAdmin, deleteBanner);

export default router;
