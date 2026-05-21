/** @format */

import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, (req, res) => {
	return res.status(200).json({
		success: true,
		user: req.user,
	});
});

export default router;