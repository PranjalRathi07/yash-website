/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const INITIAL_PRODUCTS = [
	{
		id: "KV-SILK-001",
		name: "Divine Silk Poshak",
		category: "Sacred Attire",
		price: "₹8,499",
		stock: 42,
		status: "Available",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmZ9KivkJ2Wue7XjLv4dZtaHpHY2YB2YAePwXlp70iVXIbFE69vhczsBRsfKTdBVTxcC8W8NkywGpEf3QI8uVG-6fHFIMbDmxDbM5WVE3Dc4rylKAcgdlcfilCajJyMIfCrFMvCj7Jsm3Aeinem4zpChw2fzHeeq5gE5kPeXhSLYnhuapnrcKPYs9A9HOxdE-g4ZylTIukZSZhqrFQ4NR-JwPBZSskAlOUJcOjymEq8MoZFPV2Hp1kM7JK74AFf9cwaz_KNR2oEEdv",
	},
	{
		id: "KV-MUK-042",
		name: "Vrindavan Mukut",
		category: "Ornaments",
		price: "₹12,750",
		stock: 3,
		status: "Low Stock",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVrQYvaRtlfAGXgbE_nSRxzehz_v0s9QI7dAHhTrIR9P_4jYnFtJrv0_2aPMzbubFp3amuo-BpVpgx1o4iwdFXhytbRBrDO3ZsqKhwocBvuGUjUdujEpwjWPyEerAiZnYwWqTavaHUxzz0Rx6je3bPoKRtOmHZWj5ootE747XE31SPVf47cyjveLMEhtcPKuEMp7NoEpXIbqRGDtrt5lljO9X9Wbds_GoeicU3xJBR7coSrmynfuUnXZHI8WWwVvCIHEC-N7SZt3XA",
	},
	{
		id: "KV-ACC-099",
		name: "Sandalwood Varmala",
		category: "Accessories",
		price: "₹3,200",
		stock: 120,
		status: "Available",
		image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWkYQhqK1ZsDbbS47V2-J2ZwLMyh3wyyJgQcXR3MR7gnKqK32LLWL14ctbgUks50nUVvMYdsMW-ojc75gd4N1JTiTmswAt_n9AS7FKNBTDjrksZSMCADMawoFZULaxo0vx6Yq2v6YQ6fFrRJRd8lNkAr9PsH_oFBXgsdMjC25Or4QBCDFOLPoYMFKwK8pFN02lcbmYdzfXZtWYd0VQxRnI1_U6U3PPPd7WmCd-ncGtzf3zEwtQB10BHJ9tEprgZsT-BsDo8S2jKry7",
	},
];

export default function ProductManagement() {
	const navigate = useNavigate();
	const [products, setProducts] = useState(INITIAL_PRODUCTS);
	const [searchQuery, setSearchQuery] = useState("");
	
	// Add Product modal state
	const [showAddModal, setShowAddModal] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "Sacred Attire",
		price: "",
		stock: "",
	});

	const handleAddProduct = (e) => {
		e.preventDefault();
		if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

		const added = {
			id: `KV-PROD-${Math.floor(Math.random() * 900) + 100}`,
			name: newProduct.name,
			category: newProduct.category,
			price: `₹${parseFloat(newProduct.price).toLocaleString("en-IN")}`,
			stock: parseInt(newProduct.stock),
			status: parseInt(newProduct.stock) > 5 ? "Available" : "Low Stock",
			image: INITIAL_PRODUCTS[0].image, // default image
		};

		setProducts([added, ...products]);
		setNewProduct({ name: "", category: "Sacred Attire", price: "", stock: "" });
		setShowAddModal(false);
	};

	const handleDeleteProduct = (id) => {
		if (confirm("Are you sure you want to delete this sacred product?")) {
			setProducts(products.filter((p) => p.id !== id));
		}
	};

	const filteredProducts = products.filter((p) =>
		p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
							onClick={() => setShowAddModal(true)}
							className='gradient-btn px-6 py-3.5 rounded-xl flex items-center gap-2 text-primary font-bold shadow-md hover:shadow-lg transition-all scale-100 active:scale-95 group'>
							<span className='material-symbols-outlined transition-transform duration-300 group-hover:rotate-90' data-icon='add'>
								add
							</span>
							<span>Add New Product</span>
						</button>
					</div>

					{/* Bento Stats section */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
						{[
							{ title: "Total Products", value: "1,284", icon: "inventory", change: "+12%", bg: "bg-surface-bright" },
							{ title: "Sacred Silk", value: "452", icon: "shopping_bag", change: "Active", bg: "bg-surface-bright" },
							{ title: "Low Inventory", value: `${products.filter(p => p.stock <= 5).length}`, icon: "warning", change: "Action required", bg: "bg-surface-bright", isError: true },
							{ title: "Top Category", value: "Mukut", icon: "trending_up", change: "Trending", bg: "bg-surface-bright" },
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
										<th className='px-6 py-4'>Status</th>
										<th className='px-6 py-4 text-right'>Actions</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-outline-variant/10'>
									{filteredProducts.map((product) => (
										<tr key={product.id} className='hover:bg-surface-container-low/40 transition-colors group'>
											<td className='px-6 py-5'>
												<div className='w-16 h-20 rounded-lg overflow-hidden border border-outline-variant/30 shadow-sm bg-surface-container'>
													<img className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' src={product.image} alt={product.name} />
												</div>
											</td>
											<td className='px-6 py-5'>
												<p className='font-bold text-primary'>{product.name}</p>
												<span className='text-[10px] text-on-surface-variant/70 uppercase tracking-wider'>SKU: {product.id}</span>
											</td>
											<td className='px-6 py-5'>
												<span className='px-2.5 py-1 rounded-full bg-secondary-container/10 text-primary text-xs font-semibold border border-outline-variant/10'>
													{product.category}
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
												<p className='font-serif font-bold text-primary text-lg'>{product.price}</p>
											</td>
											<td className='px-6 py-5'>
												<span
													className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
														product.stock > 5
															? "bg-green-50 text-green-700 border border-green-200"
															: "bg-red-50 text-red-700 border border-red-200"
													}`}>
													<span className={`w-1.5 h-1.5 rounded-full ${product.stock > 5 ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
													{product.stock > 5 ? "Available" : "Low Stock"}
												</span>
											</td>
											<td className='px-6 py-5 text-right'>
												<div className='flex items-center gap-2 justify-end'>
													<button
														onClick={() => alert(`Edit product ${product.id}`)}
														className='p-2 hover:bg-tertiary-fixed/15 rounded-lg text-primary transition-colors focus:outline-none'>
														<span className='material-symbols-outlined text-[18px]' data-icon='edit'>edit</span>
													</button>
													<button
														onClick={() => handleDeleteProduct(product.id)}
														className='p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors focus:outline-none'>
														<span className='material-symbols-outlined text-[18px]' data-icon='delete'>delete</span>
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>

			{/* Add Product Modal */}
			{showAddModal && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
					<div className='bg-surface w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 border border-outline-variant/30'>
						<div className='flex justify-between items-center mb-6'>
							<h3 className='font-serif text-2xl font-bold text-primary'>Enshrine Deity Product</h3>
							<button onClick={() => setShowAddModal(false)} className='text-outline-variant hover:text-primary focus:outline-none'>
								<span className='material-symbols-outlined' data-icon='close'>close</span>
							</button>
						</div>

						<form onSubmit={handleAddProduct} className='space-y-4'>
							<div>
								<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
									Product Name
								</label>
								<input
									value={newProduct.name}
									onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
									className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
									placeholder='e.g. Divine Silk Poshak'
									type='text'
									required
								/>
							</div>

							<div>
								<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
									Category
								</label>
								<select
									value={newProduct.category}
									onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
									className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'>
									<option value='Sacred Attire'>Sacred Attire</option>
									<option value='Ornaments'>Ornaments</option>
									<option value='Accessories'>Accessories</option>
								</select>
							</div>

							<div className='grid grid-cols-2 gap-4'>
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Price (INR)
									</label>
									<input
										value={newProduct.price}
										onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
										className='w-full bg-surface-container border border-outline-variant/20 rounded-lg p-2.5 text-sm focus:ring-1 focus:ring-tertiary-fixed text-on-surface'
										placeholder='e.g. 8499'
										type='number'
										required
									/>
								</div>
								<div>
									<label className='block text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 mb-2'>
										Stock level
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

							<button
								type='submit'
								className='w-full bg-primary text-tertiary-fixed font-bold rounded-lg py-3 hover:bg-primary-container transition-all shadow-md transform active:scale-95 flex items-center justify-center gap-2 mt-6'>
								<span className='material-symbols-outlined text-[18px]'>add</span>
								<span>Add Deity Product</span>
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
