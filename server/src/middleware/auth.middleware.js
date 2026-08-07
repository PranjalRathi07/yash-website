import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { supabaseAdmin } from "../config/supabase.js";

const tokenCache = new Map();
const CACHE_TTL_MS = 3 * 60 * 1000;

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

		const cached = tokenCache.get(token);
		if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
			if (!cached.user.isActive) {
				return res.status(403).json({
					success: false,
					message: "Your account is deactivated.",
				});
			}
			req.user = cached.user;
			return next();
		}

		let supabaseAuthId = null;
		let userMetadata = null;
		let userEmail = null;
		let userPhone = null;

		const jwtSecret = process.env.SUPABASE_JWT_SECRET || process.env.JWT_SECRET;

		if (jwtSecret) {
			try {
				const decoded = jwt.verify(token, jwtSecret);
				supabaseAuthId = decoded.sub;
				userEmail = decoded.email || null;
				userPhone = decoded.phone || null;
				userMetadata = decoded.user_metadata || {};
			} catch (jwtErr) {
				console.warn("Local JWT verification failed, trying remote fallback:", jwtErr.message);
			}
		}

		if (!supabaseAuthId) {
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

			supabaseAuthId = supabaseUser.id;
			userEmail = supabaseUser.email || null;
			userPhone = supabaseUser.phone || null;
			userMetadata = supabaseUser.user_metadata || {};
		}

		let user = await prisma.user.findUnique({
			where: {
				supabaseAuthId: supabaseAuthId,
			},
			select: {
				id: true,
				supabaseAuthId: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
				profilePic: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					supabaseAuthId: supabaseAuthId,
					name:
						userMetadata?.full_name ||
						userMetadata?.name ||
						userEmail?.split("@")[0] ||
						userPhone ||
						"Customer",
					email: userEmail,
					phone: userPhone,
					role: "CUSTOMER",
				},
				select: {
					id: true,
					supabaseAuthId: true,
					name: true,
					email: true,
					phone: true,
					role: true,
					isActive: true,
					profilePic: true,
					createdAt: true,
					updatedAt: true,
				},
			});
		}

		if (!user.isActive) {
			return res.status(403).json({
				success: false,
				message: "Your account is deactivated.",
			});
		}

		tokenCache.set(token, { user, timestamp: Date.now() });

		if (tokenCache.size > 500) {
			const now = Date.now();
			for (const [k, v] of tokenCache.entries()) {
				if (now - v.timestamp > CACHE_TTL_MS) {
					tokenCache.delete(k);
				}
			}
		}

		req.user = user;
		next();
	} catch (error) {
		console.error("Auth middleware error:", error);

		return res.status(401).json({
			success: false,
			message: "Authentication failed.",
		});
	}
};