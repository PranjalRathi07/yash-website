/** @format */

import express from "express";
import { verifyRazorpayPayment, getRazorpayKey } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/razorpay/key", authMiddleware, getRazorpayKey);
router.post("/razorpay/verify", authMiddleware, verifyRazorpayPayment);

export default router;