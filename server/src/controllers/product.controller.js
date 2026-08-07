/** @format */

import slugify from "slugify";
import prisma from "../config/prisma.js"
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";


export const createProduct = async (req, res) => {
	try {
		console.log("BODY:", req.body);
		console.log("FILES:", req.files);
		const {
			title,
			description,
			price,
			oldPrice,
			stock,
			categoryId,
			isFeatured,
			isBestSeller,
			isNewArrival,
			isFestivalWear,
			sizes,
		} = req.body;

		if (!title || !description || !price || !categoryId) {
			return res.status(400).json({
				success: false,
				message: "Title, description, price, and category are required",
			});
		}

		const baseSlug = slugify(title, {
			lower: true,
			strict: true,
		});

		let slug = baseSlug;
		let count = 1;

		while (await prisma.product.findUnique({ where: { slug } })) {
			slug = `${baseSlug}-${count}`;
			count++;
		}

		const product = await prisma.product.create({
			data: {
				title,
				slug,
				description,
				price: Number(price),
				oldPrice: oldPrice ? Number(oldPrice) : null,
				stock: stock ? Number(stock) : 0,
				categoryId,
				isFeatured: isFeatured === "true" || isFeatured === true,
				isBestSeller: isBestSeller === "true" || isBestSeller === true,
				isNewArrival: isNewArrival === "true" || isNewArrival === true,
				isFestivalWear: isFestivalWear === "true" || isFestivalWear === true,
			},
		});

		if (sizes) {
			try {
				const parsedSizes = JSON.parse(sizes);
				if (Array.isArray(parsedSizes) && parsedSizes.length > 0) {
					await prisma.productVariant.createMany({
						data: parsedSizes.map((size) => ({
							productId: product.id,
							size: size,
							stock: stock ? Number(stock) : 0,
							price: Number(price),
						})),
					});
				}
			} catch (e) {
				console.error("Error parsing sizes:", e);
			}
		}

		if (req.files && req.files.length > 0) {
			const imageData = [];

			for (const file of req.files) {
				const result = await uploadToCloudinary(
					file.buffer,
					"yash-website/products",
				);

				imageData.push({
					url: result.secure_url,
					publicId: result.public_id,
					productId: product.id,
				});
			}

			await prisma.productImage.createMany({
				data: imageData,
			});
		}

		const finalProduct = await prisma.product.findUnique({
			where: { id: product.id },
			include: {
				images: true,
				category: true,
			},
		});

		return res.status(201).json({
			success: true,
			message: "Product created successfully",
			product: finalProduct,
		});
	} catch (error) {
		console.error("Create product error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to create product",
			error: error.message,
		});
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const { admin, isNewArrival, isFestivalWear, search, categories, sizes, minPrice, maxPrice, sort } = req.query;
		const page = req.query.page ? parseInt(req.query.page) : null;
		const limit = req.query.limit ? parseInt(req.query.limit) : null;
		
		const whereClause = admin === "true" ? {} : { isActive: true };

		if (isNewArrival === "true") {
			whereClause.isNewArrival = true;
		}
		if (isFestivalWear === "true") {
			whereClause.isFestivalWear = true;
		}
		if (search) {
			whereClause.OR = [
				{ title: { contains: search, mode: "insensitive" } },
				{ description: { contains: search, mode: "insensitive" } },
			];
		}
		if (categories) {
			const categoryNames = categories.split(",");
			whereClause.category = {
				OR: categoryNames.map(name => ({
					name: { equals: name, mode: "insensitive" }
				}))
			};
		}
		if (sizes) {
			whereClause.variants = {
				some: {
					size: { in: sizes.split(",") }
				}
			};
		}
		if (minPrice || maxPrice) {
			whereClause.price = {};
			if (minPrice) whereClause.price.gte = parseFloat(minPrice);
			if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
		}

		let orderBy = { createdAt: "desc" };
		if (sort === "Price: Low to High") {
			orderBy = { price: "asc" };
		} else if (sort === "Price: High to Low") {
			orderBy = { price: "desc" };
		} else if (sort === "Newest Arrivals") {
			orderBy = { createdAt: "desc" };
		}

		let queryOptions = {
			where: whereClause,
			include: {
				category: true,
				images: true,
				variants: true,
				reviews: true,
			},
			orderBy,
		};

		if (page && limit) {
			queryOptions.skip = (page - 1) * limit;
			queryOptions.take = limit;
		}

		const [products, totalProducts] = await Promise.all([
			prisma.product.findMany(queryOptions),
			prisma.product.count({ where: whereClause }),
		]);

		return res.status(200).json({
			success: true,
			count: products.length,
			totalProducts,
			totalPages: limit ? Math.ceil(totalProducts / limit) : 1,
			currentPage: page || 1,
			products,
		});
	} catch (error) {
		console.error("Get products error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch products",
			error: error.message,
		});
	}
};

export const getSingleProduct = async (req, res) => {
	try {
		const { slug } = req.params;

		const product = await prisma.product.findUnique({
			where: {
				slug,
			},
			include: {
				category: true,
				images: true,
				variants: true,
				reviews: {
					where: {
						isApproved: true,
					},
					include: {
						user: {
							select: {
								id: true,
								name: true,
							},
						},
					},
				},
			},
		});

		if (!product || !product.isActive) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		return res.status(200).json({
			success: true,
			product,
		});
	} catch (error) {
		console.error("Get single product error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to fetch product",
			error: error.message,
		});
	}
};

export const updateProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const {
			title,
			description,
			price,
			oldPrice,
			stock,
			categoryId,
			isFeatured,
			isBestSeller,
			isNewArrival,
			isFestivalWear,
			isActive,
			retainedImages,
			sizes,
		} = req.body;

		const existingProduct = await prisma.product.findUnique({
			where: { id },
		});

		if (!existingProduct) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		let updatedSlug = existingProduct.slug;

		if (title && title !== existingProduct.title) {
			const baseSlug = slugify(title, {
				lower: true,
				strict: true,
			});

			let slug = baseSlug;
			let count = 1;

			while (
				await prisma.product.findFirst({
					where: {
						slug,
						id: {
							not: id,
						},
					},
				})
			) {
				slug = `${baseSlug}-${count}`;
				count++;
			}

			updatedSlug = slug;
		}

		const updatedProduct = await prisma.product.update({
			where: { id },
			data: {
				title: title ?? existingProduct.title,
				slug: updatedSlug,
				description: description ?? existingProduct.description,
				price: price ? Number(price) : existingProduct.price,
				oldPrice: oldPrice ? Number(oldPrice) : existingProduct.oldPrice,
				stock: stock ? Number(stock) : existingProduct.stock,
				categoryId: categoryId ?? existingProduct.categoryId,
				isFeatured:
					isFeatured !== undefined
						? isFeatured === "true" || isFeatured === true
						: existingProduct.isFeatured,
				isBestSeller:
					isBestSeller !== undefined
						? isBestSeller === "true" || isBestSeller === true
						: existingProduct.isBestSeller,
				isNewArrival:
					isNewArrival !== undefined
						? isNewArrival === "true" || isNewArrival === true
						: existingProduct.isNewArrival,
				isFestivalWear:
					isFestivalWear !== undefined
						? isFestivalWear === "true" || isFestivalWear === true
						: existingProduct.isFestivalWear,
				isActive:
					isActive !== undefined
						? isActive === "true" || isActive === true
						: existingProduct.isActive,
			},
		});

		if (sizes !== undefined) {
			try {
				const parsedSizes = JSON.parse(sizes);
				if (Array.isArray(parsedSizes)) {
					const existingVariants = await prisma.productVariant.findMany({
						where: { productId: id },
					});

					const sizesToAdd = parsedSizes.filter((s) => !existingVariants.some((v) => v.size === s));
					const variantsToRemove = existingVariants.filter((v) => !parsedSizes.includes(v.size));

					if (variantsToRemove.length > 0) {
						await prisma.productVariant.deleteMany({
							where: { id: { in: variantsToRemove.map((v) => v.id) } },
						});
					}

					if (sizesToAdd.length > 0) {
						await prisma.productVariant.createMany({
							data: sizesToAdd.map((size) => ({
								productId: id,
								size: size,
								stock: stock ? Number(stock) : existingProduct.stock,
								price: price ? Number(price) : existingProduct.price,
							})),
						});
					}
				}
			} catch (e) {
				console.error("Error updating sizes:", e);
			}
		}

		if (req.files && req.files.length > 0) {
			const imageData = [];

			for (const file of req.files) {
				const result = await uploadToCloudinary(
					file.buffer,
					"yash-website/products",
				);

				imageData.push({
					url: result.secure_url,
					publicId: result.public_id,
					productId: updatedProduct.id,
				});
			}

			await prisma.productImage.createMany({
				data: imageData,
			});
		}

		if (retainedImages !== undefined) {
			try {
				const retainedImageIds = JSON.parse(retainedImages);
				const currentImages = await prisma.productImage.findMany({
					where: { productId: id }
				});
				
				const imagesToDelete = currentImages.filter(img => !retainedImageIds.includes(img.id));
				
				for (const img of imagesToDelete) {
					if (img.publicId) {
						try {
							const cloudinary = (await import("../config/cloudinary.js")).default;
							await cloudinary.uploader.destroy(img.publicId);
						} catch (cloudErr) {
							console.error("Cloudinary delete error:", cloudErr);
						}
					}
					await prisma.productImage.delete({ where: { id: img.id } });
				}
			} catch (err) {
				console.error("Error processing retained images:", err);
			}
		}

		const finalProduct = await prisma.product.findUnique({
			where: { id },
			include: {
				category: true,
				images: true,
				variants: true,
			},
		});

		return res.status(200).json({
			success: true,
			message: "Product updated successfully",
			product: finalProduct,
		});
	} catch (error) {
		console.error("Update product error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to update product",
			error: error.message,
		});
	}
};

export const deleteProduct = async (req, res) => {
	try {
		const { id } = req.params;

		const product = await prisma.product.findUnique({
			where: { id },
			include: {
				images: true,
			},
		});

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		await prisma.product.delete({
			where: { id },
		});

		return res.status(200).json({
			success: true,
			message: "Product deleted successfully",
		});
	} catch (error) {
		console.error("Delete product error:", error);

		return res.status(500).json({
			success: false,
			message: "Failed to delete product",
			error: error.message,
		});
	}
};
