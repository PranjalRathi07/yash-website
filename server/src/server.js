/** @format */

import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import bannerRoutes from "./routes/banner.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import settingRoutes from "./routes/setting.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import addressRoutes from "./routes/address.routes.js";
import checkoutRoutes from "./routes/checkout.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(
	cors({
		origin: [process.env.CLIENT_URL],
		credentials: true,
	}),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Backend server is running");
});

app.get("/api/health", (req, res) => {
	res.status(200).json({
		success: true,
		message: "API is working properly",
	});
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Product routes
app.use("/api/products", productRoutes);

// Category routes
app.use("/api/categories", categoryRoutes);

// Cart routes
app.use("/api/cart", cartRoutes);

// Wishlist routes
app.use("/api/wishlist", wishlistRoutes);

// Order routes
app.use("/api/orders", orderRoutes);

// Coupon routes
app.use("/api/coupons", couponRoutes);

// Banner routes
app.use("/api/banners", bannerRoutes);

// Review routes
app.use("/api/reviews", reviewRoutes);

// Setting routes
app.use("/api/settings", settingRoutes);

// Dashboard routes
app.use("/api/admin/dashboard", dashboardRoutes);

// Address routes
app.use("/api/addresses", addressRoutes);

// Checkout routes
app.use("/api/checkout", checkoutRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
