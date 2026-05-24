/** @format */

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import {
	getAllUsersAdmin,
	toggleUserStatusAdmin,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
	return res.status(200).json({
		success: true,
		user: req.user,
	});
});

// Admin User Directory
router.get("/admin/users", authMiddleware, isAdmin, getAllUsersAdmin);
router.put("/admin/users/:id/status", authMiddleware, isAdmin, toggleUserStatusAdmin);

export default router;