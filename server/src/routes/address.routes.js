/** @format */

import express from "express";
import {
	createAddress,
	getMyAddresses,
	updateAddress,
	deleteAddress,
} from "../controllers/address.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import {
	createAddressSchema,
	updateAddressSchema,
} from "../validations/address.validation.js";

const router = express.Router();

router.post("/", authMiddleware, validateBody(createAddressSchema), createAddress);
router.get("/", authMiddleware, getMyAddresses);
router.put("/:id", authMiddleware, validateBody(updateAddressSchema), updateAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;