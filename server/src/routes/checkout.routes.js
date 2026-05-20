/** @format */

import express from "express";
import { createCheckoutOrder } from "../controllers/checkout.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCheckoutOrder);

export default router;