/** @format */

import { PrismaClient } from "@prisma/client";
import { supabaseAdmin } from "../config/supabase.js";

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			return res.status(401).json({
				success: false,
				message: "Not authorized. Please login.",
			});
		}

		const token = authHeader.split(" ")[1];

		const {
			data: { user: supabaseUser },
			error,
		} = await supabaseAdmin.auth.getUser(token);

		if (error || !supabaseUser) {
			return res.status(401).json({
				success: false,
				message: "Invalid or expired token.",
			});
		}

		let user = await prisma.user.findUnique({
			where: {
				supabaseAuthId: supabaseUser.id,
			},
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					supabaseAuthId: supabaseUser.id,
					name:
						supabaseUser.user_metadata?.full_name ||
						supabaseUser.user_metadata?.name ||
						supabaseUser.email?.split("@")[0] ||
						supabaseUser.phone ||
						"Customer",
					email: supabaseUser.email || null,
					phone: supabaseUser.phone || null,
					role: "CUSTOMER",
				},
			});
		}

		if (!user.isActive) {
			return res.status(403).json({
				success: false,
				message: "Your account is deactivated.",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Supabase auth error:", error);

		return res.status(401).json({
			success: false,
			message: "Authentication failed.",
		});
	}
};