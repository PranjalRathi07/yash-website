/** @format */

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";


const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN || "7d",
	});
};

const cookieOptions = {
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
	try {
		const { name, email, password, phone } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Name, email and password are required",
			});
		}

		const existingUser = await prisma.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User already exists with this email",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone: phone || null,
				role: "CUSTOMER",
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
				createdAt: true,
			},
		});

		const token = generateToken(user.id);

		res.cookie("token", token, cookieOptions);

		return res.status(201).json({
			success: true,
			message: "User registered successfully",
			user,
			token,
		});
	} catch (error) {
		console.error("Register error:", error);

		return res.status(500).json({
			success: false,
			message: "Registration failed",
			error: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Email and password are required",
			});
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		if (!user.isActive) {
			return res.status(403).json({
				success: false,
				message: "Your account is deactivated",
			});
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		const token = generateToken(user.id);

		res.cookie("token", token, cookieOptions);

		return res.status(200).json({
			success: true,
			message: "Login successful",
			user: {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
				isActive: user.isActive,
			},
			token,
		});
	} catch (error) {
		console.error("Login error:", error);

		return res.status(500).json({
			success: false,
			message: "Login failed",
			error: error.message,
		});
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie("token", cookieOptions);

		return res.status(200).json({
			success: true,
			message: "Logout successful",
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Logout failed",
			error: error.message,
		});
	}
};

export const getMe = async (req, res) => {
	try {
		return res.status(200).json({
			success: true,
			user: req.user,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to get user",
			error: error.message,
		});
	}
};

export const getAllUsersAdmin = async (req, res) => {
	try {
		const users = await prisma.user.findMany({
			where: {
				role: "CUSTOMER",
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
				profilePic: true,
				createdAt: true,
				orders: {
					select: {
						id: true,
						finalAmount: true,
						paymentStatus: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const formattedUsers = users.map((user) => {
			const totalSpend = user.orders
				.filter((o) => o.paymentStatus === "PAID")
				.reduce((acc, order) => acc + Number(order.finalAmount), 0);

			return {
				id: user.id,
				name: user.name,
				email: user.email,
				phone: user.phone,
				role: user.role,
				isActive: user.isActive,
				profilePic: user.profilePic,
				ordersCount: user.orders.length,
				totalSpend: totalSpend,
				createdAt: user.createdAt,
			};
		});

		return res.status(200).json({
			success: true,
			count: formattedUsers.length,
			users: formattedUsers,
		});
	} catch (error) {
		console.error("Get all users admin error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to fetch users",
			error: error.message,
		});
	}
};

export const toggleUserStatusAdmin = async (req, res) => {
	try {
		const { id } = req.params;
		const { isActive } = req.body;

		const user = await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				isActive: true,
			},
		});

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "Devotee account not found",
			});
		}

		const updatedUser = await prisma.user.update({
			where: { id },
			data: {
				isActive: isActive === undefined ? !user.isActive : isActive,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
			},
		});

		return res.status(200).json({
			success: true,
			message: `Devotee account ${updatedUser.isActive ? "activated" : "deactivated"} successfully`,
			user: updatedUser,
		});
	} catch (error) {
		console.error("Toggle user status error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to toggle devotee account status",
			error: error.message,
		});
	}
};

export const updateProfile = async (req, res) => {
	try {
		const userId = req.user.id;
		const { name, email, phone } = req.body;

		if (!name) {
			return res.status(400).json({
				success: false,
				message: "Name is required",
			});
		}

		if (email && email !== req.user.email) {
			const existingEmail = await prisma.user.findUnique({
				where: { email },
			});
			if (existingEmail) {
				return res.status(400).json({
					success: false,
					message: "Email is already in use by another devotee",
				});
			}
		}

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				name,
				email: email || null,
				phone: phone || null,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Sacred profile updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Update profile error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to update profile",
			error: error.message,
		});
	}
};

export const updateProfilePicture = async (req, res) => {
	try {
		const userId = req.user.id;

		if (!req.file) {
			return res.status(400).json({
				success: false,
				message: "Profile image file is required",
			});
		}

		const result = await uploadToCloudinary(
			req.file.buffer,
			"yash-website/profiles",
		);

		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: {
				profilePic: result.secure_url,
			},
			select: {
				id: true,
				name: true,
				email: true,
				phone: true,
				role: true,
				isActive: true,
				profilePic: true,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Sacred profile picture updated successfully",
			user: updatedUser,
		});
	} catch (error) {
		console.error("Update profile picture error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to upload profile picture",
			error: error.message,
		});
	}
};
