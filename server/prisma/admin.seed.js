/** @format */

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("admin123", 10);

	const admin = await prisma.user.upsert({
		where: {
			email: "admin@yashwebsite.com",
		},
		update: {
			role: "ADMIN",
		},
		create: {
			name: "Admin",
			email: "admin@yashwebsite.com",
			password: hashedPassword,
			role: "ADMIN",
			phone: "9999999999",
		},
	});

	console.log("Admin created:", {
		id: admin.id,
		email: admin.email,
		role: admin.role,
	});
}

main()
	.catch((error) => {
		console.error(error);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
