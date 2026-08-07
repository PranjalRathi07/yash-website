/** @format */

import express from "express";
import { createCheckoutOrder } from "../controllers/checkout.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { createCheckoutOrderSchema } from "../validations/order.validation.js";

const router = express.Router();

router.post(
	"/",
	authMiddleware,
	validateBody(createCheckoutOrderSchema),
	createCheckoutOrder,
);

export default router;