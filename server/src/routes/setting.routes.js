/** @format */

import express from "express";
import {
	getSettings,
	upsertSetting,
	deleteSetting,
} from "../controllers/setting.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getSettings);
router.post("/", authMiddleware, isAdmin, upsertSetting);
router.delete("/:key", authMiddleware, isAdmin, deleteSetting);

export default router;
