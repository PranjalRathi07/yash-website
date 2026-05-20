/** @format */

import express from "express";
import {
	createAddress,
	getMyAddresses,
	updateAddress,
	deleteAddress,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAddress);
router.get("/", authMiddleware, getMyAddresses);
router.put("/:id", authMiddleware, updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;