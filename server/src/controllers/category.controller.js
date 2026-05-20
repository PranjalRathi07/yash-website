/** @format */

import slugify from "slugify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const generateUniqueCategorySlug = async (name, categoryId = null) => {
	const baseSlug = slugify(name, {
		lower: true,
		strict: true,
	});

	let slug = baseSlug;
	let count = 1;

	while (
		await prisma.category.findFirst({
			where: {
				slug,
				...(categoryId && {
					id: {
						not: categoryId,
					},
				}),
			},
		})
	) {
		slug = `${baseSlug}-${count}`;
		count++;
	}

	return slug;
};

export const createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		if (!name) {
			return res.status(400).json({
				success: false,
				message: "Category name is required",
			});
		}

		const slug = await generateUniqueCategorySlug(name);

		const category = await prisma.category.create({
			data: {
				name,
				slug,
			},
		});

		return res.status(201).json({
			success: true,
			message: "Category created successfully",
			category,
		});
	} catch (error) {
		console.error("Create category error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to create category",
			error: error.message,
		});
	}
};

export const getAllCategories = async (req, res) => {
	try {
		const categories = await prisma.category.findMany({
			include: {
				products: {
					where: {
						isActive: true,
					},
					include: {
						images: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return res.status(200).json({
			success: true,
			count: categories.length,
			categories,
		});
	} catch (error) {
		console.error("Get categories error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch categories",
			error: error.message,
		});
	}
};

export const getSingleCategory = async (req, res) => {
	try {
		const { slug } = req.params;

		const category = await prisma.category.findUnique({
			where: {
				slug,
			},
			include: {
				products: {
					where: {
						isActive: true,
					},
					include: {
						images: true,
						variants: true,
					},
					orderBy: {
						createdAt: "desc",
					},
				},
			},
		});

		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}

		return res.status(200).json({
			success: true,
			category,
		});
	} catch (error) {
		console.error("Get single category error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch category",
			error: error.message,
		});
	}
};

export const updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const { name } = req.body;

		const existingCategory = await prisma.category.findUnique({
			where: {
				id,
			},
		});

		if (!existingCategory) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}

		let slug = existingCategory.slug;

		if (name && name !== existingCategory.name) {
			slug = await generateUniqueCategorySlug(name, id);
		}

		const updatedCategory = await prisma.category.update({
			where: {
				id,
			},
			data: {
				name: name ?? existingCategory.name,
				slug,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Category updated successfully",
			category: updatedCategory,
		});
	} catch (error) {
		console.error("Update category error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to update category",
			error: error.message,
		});
	}
};

export const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;

		const category = await prisma.category.findUnique({
			where: {
				id,
			},
			include: {
				products: true,
			},
		});

		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}

		if (category.products.length > 0) {
			return res.status(400).json({
				success: false,
				message:
					"Cannot delete category because products are linked with this category",
			});
		}

		await prisma.category.delete({
			where: {
				id,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Category deleted successfully",
		});
	} catch (error) {
		console.error("Delete category error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to delete category",
			error: error.message,
		});
	}
};
