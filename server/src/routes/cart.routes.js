/** @format */

import express from "express";
import {
	addToCart,
	getMyCart,
	updateCartItem,
	removeCartItem,
} from "../controllers/cart.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import {
	addToCartSchema,
	updateCartItemSchema,
} from "../validations/cart.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validateBody(addToCartSchema), addToCart);
router.get("/", authMiddleware, getMyCart);
router.put("/:id", authMiddleware, validateBody(updateCartItemSchema), updateCartItem);
router.delete("/:id", authMiddleware, removeCartItem);

export default router;
