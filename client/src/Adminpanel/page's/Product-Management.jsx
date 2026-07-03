import { optimizeImage } from "../../utils/optimizeCloudinary";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../../services/api";
import toast from "react-hot-toast";

const PLACEHOLDER_IMAGE = "https://placehold.co/150x200?text=No+Image";

export default function ProductManagement() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	// Add/Edit Product Modal State
	const [showAddModal, setShowAddModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingProductId, setEditingProductId] = useState(null);

	const [newProduct, setNewProduct] = useState({
		title: "",
		description: "",
		price: "",
		oldPrice: "",
		stock: "",
		categoryId: "",
		isFeatured: false,
		isBestSeller: false,
		isNewArrival: false,
		isFestivalWear: false,
		sizes: [],
	});

	// Image upload state
	const [imageFiles, setImageFiles] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [existingImages, setExistingImages] = useState([]);

	const fetchCategories = useCallback(async () => {
		try {
			const response = await api.get("/api/categories");
			if (response.data.success) {
				const allowed = ["daily wear", "premium sets"];
				const filteredCategories = response.data.categories.filter((cat) => 
					allowed.includes(cat.name.toLowerCase())
				);
				setCategories(filteredCategories);
				if (filteredCategories.length > 0) {
					setNewProduct((prev) => {
						if (!prev.categoryId) {
							return {
								...prev,
								categoryId: filteredCategories[0].id,
							};
						}
						return prev;
					});
				}
			}
		} catch (err) {
			console.error("Failed to fetch categories:", err);
		}
	}, []);

	const fetchProducts = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/api/products?admin=true");
			if (response.data.success) {
				setProducts(response.data.products);
			}
		} catch (err) {
			console.error("Failed to fetch products:", err);
			setError("Could not retrieve sacred products from the database.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		const loadData = async () => {
			await Promise.resolve();
			if (isMounted) {
				await fetchProducts();
				await fetchCategories();
			}
		};
		loadData();
		return () => {
			isMounted = false;
		};
	}, [fetchProducts, fetchCategories]);

	// Handle Image File Changes & Preview
	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 0) {
			setImageFiles((prev) => [...prev, ...files]);
			const previews = files.map((file) => URL.createObjectURL(file));
			setImagePreviews((prev) => [...prev, ...previews]);
		}
	};

	// Drag & Drop Handlers
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = Array.from(e.dataTransfer.files);
		if (files.length > 0) {
			setImageFiles((prev) => [...prev, ...files]);
			const previews = files.map((file) => URL.createObjectURL(file));
			setImagePreviews((prev) => [...prev, ...previews]);
		}
	};

	const removeSelectedImage = (index) => {
		setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
		setImagePreviews((prev) => {
			const target = prev[index];
			if (target && target.startsWith("blob:")) {
				URL.revokeObjectURL(target);
			}
			return prev.filter((_, idx) => idx !== index);
		});
	};

	const removeExistingImage = (index) => {
		setExistingImages((prev) => prev.filter((_, idx) => idx !== index));
	};

	const handleOpenAddModal = () => {
		setIsEditing(false);
		setEditingProductId(null);
		setNewProduct({
			title: "",
			description: "",
			price: "",
			oldPrice: "",
			stock: "",
			categoryId: categories.length > 0 ? categories[0].id : "",
			isFeatured: false,
			isBestSeller: false,
			isNewArrival: false,
			isFestivalWear: false,
			sizes: [],
		});
		setImageFiles([]);
		setImagePreviews([]);
		setExistingImages([]);
		setShowAddModal(true);
	};

	const handleEditClick = (product) => {
		setIsEditing(true);
		setEditingProductId(product.id);
		setNewProduct({
			title: product.title,
			description: product.description || "",
			price: product.price ? product.price.toString() : "",
			oldPrice: product.oldPrice ? product.oldPrice.toString() : "",
			stock: product.stock ? product.stock.toString() : "",
			categoryId: product.categoryId || (categories.length > 0 ? categories[0].id : ""),
			isFeatured: product.isFeatured || false,
			isBestSeller: product.isBestSeller || false,
			isNewArrival: product.isNewArrival || false,
			isFestivalWear: product.isFestivalWear || false,
			sizes: product.variants ? product.variants.map((v) => v.size).filter(Boolean) : [],
		});
		if (product.images && product.images.length > 0) {
			setExistingImages(product.images);
		} else {
			setExistingImages([]);
		}
		setImagePreviews([]);
		setImageFiles([]);
		setShowAddModal(true);
	};

	const handleSubmitProduct = async (e) => {
		e.preventDefault();
		if (!newProduct.title || !newProduct.price || !newProduct.stock || !newProduct.categoryId || !newProduct.description) {
			toast.error("Please fill in all required fields (Title, Category, Price, Stock, and Description).");
			return;
		}

		try {
			const formData = new FormData();
			formData.append("title", newProduct.title);
			formData.append("description", newProduct.description);
			formData.append("price", newProduct.price);
			if (newProduct.oldPrice) {
				formData.append("oldPrice", newProduct.oldPrice);
			}
			formData.append("stock", newProduct.stock);
			formData.append("categoryId", newProduct.categoryId);
			formData.append("isFeatured", newProduct.isFeatured);
			formData.append("isBestSeller", newProduct.isBestSeller);
			formData.append("isNewArrival", newProduct.isNewArrival);
			formData.append("isFestivalWear", newProduct.isFestivalWear);
			if (newProduct.sizes && newProduct.sizes.length > 0) {
				formData.append("sizes", JSON.stringify(newProduct.sizes));
			}

			if (imageFiles.length > 0) {
				imageFiles.forEach((file) => {
					formData.append("images", file);
				});
			}
			
			if (isEditing) {
				formData.append("retainedImages", JSON.stringify(existingImages.map(img => img.id)));
			}

			let response;
			if (isEditing) {
				response = await api.put(`/api/products/${editingProductId}`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
			} else {
				response = await api.post("/api/products", formData, {
					headers: { "Content-Type": "multipart/form-data" },
				});
			}

			if (response.data.success) {
				toast.success(isEditing ? "Sacred Deity Product updated successfully!" : "Sacred Deity Product added successfully!");
				setShowAddModal(false);
				fetchProducts();
			} else {
				toast.error("Failed to save product: " + response.data.message);
			}
		} catch (err) {
			console.error("Save product error:", err);
			toast.error("An error occurred while saving the product: " + (err.response?.data?.message || err.message));
		}
	};

	const handleDeleteProduct = async (id) => {
		if (confirm("Are you sure you want to delete this sacred product?")) {
			try {
				const response = await api.delete(`/api/products/${id}`);
				if (response.data.success) {
					toast.success("Deity Product deleted successfully.");
					fetchProducts();
				} else {
					toast.error("Failed to delete product: " + response.data.message);
				}
			} catch (err) {
				console.error("Delete error:", err);
				toast.error("Error deleting product: " + (err.response?.data?.message || err.message));
			}
		}
	};

	const filteredProducts = products.filter((p) =>
		p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(p.category?.name && p.category.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
		p.id.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='min-h-screen bg-surface font-sans text-on-surface flex'>
			<Sidebar activeTab="products" />

			{/* MAIN CONTAINER */}
			<div className='flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest'>
				<Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search sacred inventory..." />

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-10 animate-fadeIn'>
					{/* Page Header */}
					<div className='flex justify-between items-center mb-10'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>
								Sacred Product Inventory
							</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								Manage the divine collection of garments and ornaments.
							</p>
						</div>
						<button
							onClick={handleOpenAddModal}
							className='gradient-btn px-6 py-3.5 rounded-xl flex items-center gap-2 text-primary font-bold shadow-md hover:shadow-lg transition-all scale-100 active:scale-95 group cursor-pointer'>
							<span className='material-symbols-outlined transition-transform duration-300 group-hover:rotate-90' data-icon='add'>
								add
							</span>
							<span>Add New Product</span>
						</button>
					</div>

					{/* Bento Stats section */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
						{[
							{ title: "Total Products", value: products.length.toString(), icon: "inventory", change: "Live DB", bg: "bg-surface-bright" },
							{ title: "Out of Stock", value: products.filter(p => p.stock === 0).length.toString(), icon: "error_outline", change: "Critical", bg: "bg-surface-bright", isError: products.filter(p => p.stock === 0).length > 0 },
							{ title: "Low Inventory", value: products.filter(p => p.stock > 0 && p.stock <= 5).length.toString(), icon: "warning", change: "Action required", bg: "bg-surface-bright", isError: products.filter(p => p.stock > 0 && p.stock <= 5).length > 0 },
							{ title: "Total Categories", value: categories.length.toString(), icon: "category", change: "Managed", bg: "bg-surface-bright" },
						].map((stat, idx) => (
							<div
								key={idx}
								className={`p-6 rounded-2xl border border-outline-variant/20 shadow-sm transition-all duration-300 hover:border-tertiary-fixed ${stat.bg}`}>
								<div className='flex justify-between items-start mb-4'>
									<div className='p-3 bg-tertiary-fixed/15 rounded-xl text-primary'>
										<span className='material-symbols-outlined'>{stat.icon}</span>
									</div>
									<span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"}`}>
										{stat.change}
									</span>
								</div>
								<h4 className='text-on-surface-variant/70 text-xs font-bold uppercase tracking-wider'>{stat.title}</h4>
								<p className='text-3xl font-serif font-bold text-primary mt-2'>{stat.value}</p>
							</div>
						))}
					</div>

					{/* Product Table Control */}
					{loading ? (
						<div className='flex flex-col items-center justify-center p-20 bg-surface rounded-2xl border border-outline-variant/20 shadow-sm'>
							<span className='material-symbols-outlined text-[48px] text-tertiary animate-spin mb-4'>sync</span>
							<p className='text-on-surface-variant font-serif text-lg'>Fetching divine collection from the sanctuary...</p>
						</div>
					) : error ? (
						<div className='flex flex-col items-center justify-center p-20 bg-surface rounded-2xl border border-red-200 shadow-sm'>
							<span className='material-symbols-outlined text-[48px] text-red-600 mb-4'>error</span>
							<p className='text-red-700 font-bold mb-2'>{error}</p>
							<button onClick={fetchProducts} className='px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold cursor-pointer'>Retry Fetch</button>
						</div>
					) : filteredProducts.length === 0 ? (
						<div className='flex flex-col items-center justify-center p-20 bg-surface rounded-2xl border border-outline-variant/20 shadow-sm text-center'>
							<span className='material-symbols-outlined text-[48px] text-tertiary/50 mb-4'>inventory_2</span>
							<h3 className='font-serif text-2xl text-primary font-bold mb-2'>Sanctuary is Empty</h3>
							<p className='text-on-surface-variant max-w-sm mb-6'>No sacred products found in your inventory. Add your first deity product to get started!</p>
							<button onClick={handleOpenAddModal} className='gradient-btn px-6 py-3 rounded-lg text-primary font-bold shadow-md hover:shadow-lg cursor-pointer'>Add First Product</button>
						</div>
					) : (
						<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse'>
									<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
										<tr>
											<th className='px-6 py-4'>Sacred Image</th>
											<th className='px-6 py-4'>Product Name</th>
											<th className='px-6 py-4'>Category</th>
											<th className='px-6 py-4 text-center'>Stock Level</th>
											<th className='px-6 py-4'>Premium Price</th>
											<th className='px-6 py-4'>Tags & Flags</th>
											<th className='px-6 py-4 text-right'>Actions</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-outline-variant/10'>
										{filteredProducts.map((product) => {
											// Calculate discount percentage if oldPrice exists
											let discountPercent = 0;
											if (product.oldPrice && Number(product.oldPrice) > Number(product.price)) {
												discountPercent = Math.round((1 - Number(product.price) / Number(product.oldPrice)) * 100);
											}

											return (
												<tr key={product.id} className='hover:bg-surface-container-low/40 transition-colors group'>
													<td className='px-6 py-5'>
														<div className='w-16 h-20 rounded-lg overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container flex items-center justify-center'>
															<img 
																className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
																src={optimizeImage(product.images?.[0]?.url) || PLACEHOLDER_IMAGE} 
																alt={product.title} 
																onError={(e) => { e.target.src = PLACEHOLDER_IMAGE; }}
															/>
														</div>
													</td>
													<td className='px-6 py-5'>
														<p className='font-bold text-primary'>{product.title}</p>
														<span className='text-[10px] text-on-surface-variant/70 uppercase tracking-wider'>SKU: {product.sku || product.id.substring(0, 8).toUpperCase()}</span>
													</td>
													<td className='px-6 py-5'>
														<span className='px-2.5 py-1 rounded-full bg-secondary-container/10 text-primary text-xs font-semibold border border-outline-variant/10'>
															{product.category?.name || "Sacred Collection"}
														</span>
													</td>
													<td className='px-6 py-5 text-center'>
														<div className='flex flex-col items-center gap-1.5'>
															<div className='w-24 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden'>
																<div
																	className={`h-full ${product.stock <= 5 ? "bg-red-500" : "bg-linear-to-r from-[#E7C96F] to-[#ffdfa0]"}`}
																	style={{ width: `${Math.min(product.stock * 2, 100)}%` }}
																/>
															</div>
															<span className='text-xs font-semibold text-on-surface-variant/80'>{product.stock} units</span>
														</div>
													</td>
													<td className='px-6 py-5'>
														<div className='flex flex-col'>
															<p className='font-serif font-bold text-primary text-lg'>₹{Number(product.price).toLocaleString("en-IN")}</p>
															{product.oldPrice && Number(product.oldPrice) > Number(product.price) && (
																<div className='flex items-center gap-1.5 mt-0.5'>
																	<span className='text-xs text-on-surface-variant/60 line-through'>₹{Number(product.oldPrice).toLocaleString("en-IN")}</span>
																	<span className='text-[9px] font-bold text-tertiary-fixed bg-tertiary-fixed/15 px-1.5 py-0.5 rounded'>
																		{discountPercent}% OFF
																	</span>
																</div>
															)}
														</div>
													</td>
													<td className='px-6 py-5'>
														<div className='flex flex-wrap gap-1.5 max-w-45'>
															{product.isFestivalWear && (
																<span className='px-2 py-0.5 text-[9px] font-bold rounded bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wider'>Festival</span>
															)}
															{product.isNewArrival && (
																<span className='px-2 py-0.5 text-[9px] font-bold rounded bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider'>New</span>
															)}
															{product.isBestSeller && (
																<span className='px-2 py-0.5 text-[9px] font-bold rounded bg-green-50 text-green-700 border border-green-200 uppercase tracking-wider'>Best</span>
															)}
															{product.isFeatured && (
																<span className='px-2 py-0.5 text-[9px] font-bold rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider'>Featured</span>
															)}
															{!product.isFestivalWear && !product.isNewArrival && !product.isBestSeller && !product.isFeatured && (
																<span className='text-xs text-on-surface-variant/50 italic'>Standard Attire</span>
															)}
														</div>
													</td>
													<td className='px-6 py-5 text-right'>
														<div className='flex items-center gap-2 justify-end'>
															<button
																onClick={() => handleEditClick(product)}
																className='p-2 hover:bg-tertiary-fixed/15 rounded-lg text-primary transition-colors focus:outline-none cursor-pointer'>
																<span className='material-symbols-outlined text-[18px]' data-icon='edit'>edit</span>
															</button>
															<button
																onClick={() => handleDeleteProduct(product.id)}
																className='p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors focus:outline-none cursor-pointer'>
																<span className='material-symbols-outlined text-[18px]' data-icon='delete'>delete</span>
															</button>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</main>
			</div>

			{/* Add/Edit Product Modal */}
			{showAddModal && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
					<div className='bg-surface w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh]'>
						{/* Modal Header */}
						<div className='flex justify-between items-center px-6 py-5 border-b border-outline-variant/15 bg-surface-container-low'>
							<h3 className='font-serif text-2xl font-bold text-primary'>
								{isEditing ? "Revise Deity Product" : "Enshrine Deity Product"}
							</h3>
							<button onClick={() => setShowAddModal(false)} className='text-outline-variant hover:text-primary focus:outline-none cursor-pointer'>
								<span className='material-symbols-outlined' data-icon='close'>close</span>
							</button>
						</div>

						{/* Modal Body / Scrollable Form */}
						<form onSubmit={handleSubmitProduct} className='flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8'>
							
							{/* LEFT COLUMN: Image & Flags */}
							<div className='space-y-6'>
								{/* 1. PRODUCT IMAGE UPLOAD COLUMN */}
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Product Image(s) <span className='text-red-500'>*</span>
									</label>
									
									<div 
										onDragOver={handleDragOver}
										onDrop={handleDrop}
										className='border-2 border-dashed border-outline-variant/50 rounded-xl p-6 text-center hover:bg-surface-container-low transition-colors cursor-pointer relative group'
									>
										<input 
											type='file' 
											accept='image/*' 
											multiple
											onChange={handleImageChange}
											className='absolute inset-0 opacity-0 cursor-pointer'
										/>
										<div className='flex flex-col items-center justify-center gap-2'>
											<span className='material-symbols-outlined text-[36px] text-tertiary group-hover:scale-110 transition-transform duration-300'>cloud_upload</span>
											<p className='text-sm font-bold text-primary'>Drag & Drop or Click to Upload</p>
											<p className='text-xs text-on-surface-variant/60'>PNG, JPG or JPEG (Max 5MB per file)</p>
										</div>
									</div>

									{/* Image Previews */}
									{(existingImages.length > 0 || imagePreviews.length > 0) && (
										<div className='grid grid-cols-3 gap-3 mt-4'>
											{existingImages.map((img, index) => (
												<div key={`existing-${index}`} className='aspect-4/5 rounded-lg border border-outline-variant/30 overflow-hidden relative group bg-surface-container shadow-sm'>
													<img src={img.url} alt='Preview' className='w-full h-full object-cover' />
													<button 
														type='button'
														onClick={() => removeExistingImage(index)}
														className='absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow focus:outline-none transition-all scale-0 group-hover:scale-100 flex items-center justify-center'
													>
														<span className='material-symbols-outlined text-xs' style={{ fontSize: "14px" }}>close</span>
													</button>
												</div>
											))}
											{imagePreviews.map((preview, index) => (
												<div key={`new-${index}`} className='aspect-4/5 rounded-lg border border-outline-variant/30 overflow-hidden relative group bg-surface-container shadow-sm'>
													<img src={preview} alt='Preview' className='w-full h-full object-cover' />
													<button 
														type='button'
														onClick={() => removeSelectedImage(index)}
														className='absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 shadow focus:outline-none transition-all scale-0 group-hover:scale-100 flex items-center justify-center'
													>
														<span className='material-symbols-outlined text-xs' style={{ fontSize: "14px" }}>close</span>
													</button>
												</div>
											))}
										</div>
									)}
								</div>

								{/* 3. FLAG/PARAMETER CHECKBOXES (Festival Wear, New Arrival, etc.) */}
								<div className='bg-surface-container-low p-4 rounded-xl border border-outline-variant/15 space-y-4'>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 pb-2 border-b border-outline-variant/10'>
										Special Attire Tags
									</label>
									
									<div className='grid grid-cols-2 gap-4'>
										<label className='flex items-center gap-3 cursor-pointer group relative'>
											<input 
												type='checkbox'
												checked={newProduct.isFestivalWear}
												onChange={(e) => setNewProduct({ ...newProduct, isFestivalWear: e.target.checked })}
												className='peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
											/>
											<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none' style={{ marginLeft: "3px" }}>check</span>
											<span className='text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors ml-1'>Festival Wear</span>
										</label>

										<label className='flex items-center gap-3 cursor-pointer group relative'>
											<input 
												type='checkbox'
												checked={newProduct.isNewArrival}
												onChange={(e) => setNewProduct({ ...newProduct, isNewArrival: e.target.checked })}
												className='peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
											/>
											<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none' style={{ marginLeft: "3px" }}>check</span>
											<span className='text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors ml-1'>New Arrival</span>
										</label>

										<label className='flex items-center gap-3 cursor-pointer group relative'>
											<input 
												type='checkbox'
												checked={newProduct.isBestSeller}
												onChange={(e) => setNewProduct({ ...newProduct, isBestSeller: e.target.checked })}
												className='peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
											/>
											<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none' style={{ marginLeft: "3px" }}>check</span>
											<span className='text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors ml-1'>Best Seller</span>
										</label>

										<label className='flex items-center gap-3 cursor-pointer group relative'>
											<input 
												type='checkbox'
												checked={newProduct.isFeatured}
												onChange={(e) => setNewProduct({ ...newProduct, isFeatured: e.target.checked })}
												className='peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
											/>
											<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none' style={{ marginLeft: "3px" }}>check</span>
											<span className='text-xs font-bold text-on-surface-variant group-hover:text-primary transition-colors ml-1'>Featured Product</span>
										</label>
									</div>
								</div>

								{/* Live Discount Calculator Preview */}
								{newProduct.price && newProduct.oldPrice && Number(newProduct.oldPrice) > Number(newProduct.price) && (
									<div className='p-3 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs flex items-center justify-between font-semibold'>
										<span className='flex items-center gap-1.5'>
											<span className='material-symbols-outlined text-[16px]'>local_offer</span>
											Live Storefront Discount Badge:
										</span>
										<span className='bg-green-700 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider animate-bounce'>
											{Math.round((1 - Number(newProduct.price) / Number(newProduct.oldPrice)) * 100)}% OFF
										</span>
									</div>
								)}
							</div>

							{/* RIGHT COLUMN: Text parameters & details */}
							<div className='space-y-4'>
								{/* Product Name */}
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Product Name <span className='text-red-500'>*</span>
									</label>
									<input
										value={newProduct.title}
										onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
										className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
										placeholder='e.g. Divine Silk Poshak'
										type='text'
										required
									/>
								</div>

								{/* Category Selection */}
								<div>
									<div className='flex justify-between items-center mb-2'>
										<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80'>
											Category <span className='text-red-500'>*</span>
										</label>
									</div>

									<select
										value={newProduct.categoryId}
										onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
										className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface font-sans'
										required
									>
										{categories.length === 0 ? (
											<option value=''>No Categories Available</option>
										) : (
											categories.map((cat) => (
												<option key={cat.id} value={cat.id}>{cat.name}</option>
											))
										)}
									</select>
								</div>

								{/* Sizes Selection */}
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Available Sizes
									</label>
									<div className='flex flex-wrap gap-4'>
										{["4", "6", "8", "10", "12"].map((size) => (
											<label key={size} className='flex items-center gap-2 cursor-pointer group relative'>
												<input
													type='checkbox'
													checked={newProduct.sizes.includes(size)}
													onChange={(e) => {
														if (e.target.checked) {
															setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, size] });
														} else {
															setNewProduct({ ...newProduct, sizes: newProduct.sizes.filter((s) => s !== size) });
														}
													}}
													className='peer appearance-none w-5 h-5 border-[1.5px] border-outline-variant/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
												/>
												<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none' style={{ marginLeft: "3px" }}>check</span>
												<span className='text-sm font-bold text-on-surface-variant group-hover:text-primary transition-colors'>{size}</span>
											</label>
										))}
									</div>
								</div>

								{/* Prices & Stock Grid */}
								<div className='grid grid-cols-3 gap-4'>
									{/* Selling Price */}
									<div>
										<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
											Price (INR) <span className='text-red-500'>*</span>
										</label>
										<input
											value={newProduct.price}
											onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
											className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
											placeholder='Selling (e.g. 3825)'
											type='number'
											required
										/>
									</div>
									
									{/* 2. OLD PRICE INPUT COLUMN */}
									<div>
										<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
											Old Price (INR)
										</label>
										<input
											value={newProduct.oldPrice}
											onChange={(e) => setNewProduct({ ...newProduct, oldPrice: e.target.value })}
											className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
											placeholder='Original (e.g. 4500)'
											type='number'
										/>
									</div>

									{/* Stock */}
									<div>
										<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
											Stock <span className='text-red-500'>*</span>
										</label>
										<input
											value={newProduct.stock}
											onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
											className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
											placeholder='e.g. 42'
											type='number'
											required
										/>
									</div>
								</div>

								{/* 4. PRODUCT DESCRIPTION COLUMN */}
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Product Description <span className='text-red-500'>*</span>
									</label>
									<textarea
										value={newProduct.description}
										onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
										className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface min-h-30'
										placeholder='Describe the divine craftsmanship, materials, size guides, and spiritual narratives of this deity piece...'
										required
									/>
								</div>
							</div>

							{/* Actions (Span 2 Columns) */}
							<div className='col-span-1 md:col-span-2 border-t border-outline-variant/15 pt-5 flex items-center justify-end gap-3'>
								<button
									type='button'
									onClick={() => setShowAddModal(false)}
									className='px-5 py-2.5 rounded-lg border border-outline-variant/30 text-primary font-bold hover:bg-surface-container-low transition-colors cursor-pointer'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='bg-primary text-white font-bold rounded-lg px-6 py-2.5 hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer'
								>
									<span className='material-symbols-outlined text-[18px]'>
										{isEditing ? "check" : "add"}
									</span>
									<span>{isEditing ? "Save Modifications" : "Enshrine Deity Product"}</span>
								</button>
							</div>

						</form>
					</div>
				</div>
			)}
		</div>
	);
}
