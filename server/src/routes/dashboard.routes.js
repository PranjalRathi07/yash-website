/** @format */

import express from "express";
import { getAdminDashboard } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAdminDashboard);

export default router;
