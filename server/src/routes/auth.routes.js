/** @format */

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { upload } from "../config/multer.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { updateProfileSchema } from "../validations/auth.validation.js";
import {
	getAllUsersAdmin,
	toggleUserStatusAdmin,
	updateProfile,
	updateProfilePicture,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
	return res.status(200).json({
		success: true,
		user: req.user,
	});
});

router.put("/profile", authMiddleware, validateBody(updateProfileSchema), updateProfile);
router.put("/profile/picture", authMiddleware, upload.single("profilePic"), updateProfilePicture);

// Admin User Directory
router.get("/admin/users", authMiddleware, isAdmin, getAllUsersAdmin);
router.put("/admin/users/:id/status", authMiddleware, isAdmin, toggleUserStatusAdmin);

export default router;