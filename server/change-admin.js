import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function changeAdminCredentials() {
  // 1. Set your new Admin Email (ID) and Password here:
  const newEmail = "admin@example.com"; 
  const newPassword = "YourNewPassword123";

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Find if there is an existing admin
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    if (existingAdmin) {
      // Update the existing admin
      const updatedAdmin = await prisma.user.update({
        where: { id: existingAdmin.id },
        data: {
          email: newEmail,
          password: hashedPassword,
        }
      });
      console.log("✅ Admin credentials successfully updated!");
      console.log(`👤 New Admin ID (Email): ${updatedAdmin.email}`);
    } else {
      // If no admin exists, create one
      const newAdmin = await prisma.user.create({
        data: {
          name: "Admin",
          email: newEmail,
          password: hashedPassword,
          role: "ADMIN"
        }
      });
      console.log("✅ New Admin created successfully!");
      console.log(`👤 Admin ID (Email): ${newAdmin.email}`);
    }
  } catch (error) {
    console.error("❌ Error updating admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

changeAdminCredentials();
