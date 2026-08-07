/** @format */

import express from "express";
import {
	createReview,
	getAllReviewsAdmin,
	approveReview,
	deleteReview,
	getGlobalReviews,
	getPendingReviews,
} from "../controllers/review.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { createReviewSchema } from "../validations/review.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validateBody(createReviewSchema), createReview);
router.get("/global", getGlobalReviews);
router.get("/pending", authMiddleware, getPendingReviews);
router.get("/admin/all", authMiddleware, isAdmin, getAllReviewsAdmin);
router.put("/:id/approve", authMiddleware, isAdmin, approveReview);
router.delete("/:id", authMiddleware, isAdmin, deleteReview);

export default router;
