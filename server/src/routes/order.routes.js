/** @format */

import express from "express";
import {
	getAllOrdersAdmin,
	getSingleOrderAdmin,
	updateOrderStatusAdmin,
	getMyOrders,
	getMySingleOrder,
} from "../controllers/order.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();
// Customer order routes
router.get("/my-orders", authMiddleware, getMyOrders);
router.get("/my-order/:id", authMiddleware, getMySingleOrder);

// Admin order routes
router.get("/admin/all", authMiddleware, isAdmin, getAllOrdersAdmin);
router.get("/admin/:id", authMiddleware, isAdmin, getSingleOrderAdmin);
router.put(
	"/admin/:id/status",
	authMiddleware,
	isAdmin,
	updateOrderStatusAdmin,
);

export default router;
