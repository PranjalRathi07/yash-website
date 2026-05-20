/** @format */

import express from "express";
import { verifyRazorpayPayment } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/razorpay/verify", authMiddleware, verifyRazorpayPayment);

export default router;