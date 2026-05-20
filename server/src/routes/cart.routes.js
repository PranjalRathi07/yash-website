/** @format */

import express from "express";
import {
	addToCart,
	getMyCart,
	updateCartItem,
	removeCartItem,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getMyCart);
router.put("/:id", authMiddleware, updateCartItem);
router.delete("/:id", authMiddleware, removeCartItem);

export default router;
