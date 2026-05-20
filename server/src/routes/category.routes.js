/** @format */

import express from "express";
import {
	createCategory,
	getAllCategories,
	getSingleCategory,
	updateCategory,
	deleteCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:slug", getSingleCategory);

// Admin routes
router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);

export default router;
