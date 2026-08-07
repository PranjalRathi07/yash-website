/** @format */

import express from "express";
import { upload } from "../config/multer.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import {
	createProductSchema,
	updateProductSchema,
} from "../validations/product.validation.js";
import {
	createProduct,
	getAllProducts,
	getSingleProduct,
	updateProduct,
	deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:slug", getSingleProduct);

router.post(
	"/",
	authMiddleware,
	isAdmin,
	upload.array("images", 5),
	validateBody(createProductSchema),
	createProduct,
);

router.put(
	"/:id",
	authMiddleware,
	isAdmin,
	upload.array("images", 5),
	validateBody(updateProductSchema),
	updateProduct,
);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

export default router;
