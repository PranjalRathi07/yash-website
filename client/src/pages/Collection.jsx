/** @format */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "../components/LikeButton";

export default function ShopKrishnaVastra() {
	const navigate = useNavigate();
	const categories = [
		{ label: "Daily Wear", checked: false },
		{ label: "Mukut", checked: false },
		{ label: "Jewelry", checked: false },
		{ label: "Bansuri", checked: false },
		{ label: "Combo Sets", checked: false },
		{ label: "Winter Wear", checked: false },
		{ label: "Premium Sets", checked: false },
	];

	return (
		<div className='bg-surface text-on-surface min-h-screen flex flex-col font-sans antialiased selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow w-full px-8 md:px-16 lg:px-24 py-stack-xl'>
				{/* Page Header */}
				<div className='mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 border-b-[0.5px] border-tertiary/20 pb-6'>
					<h1 className='font-serif text-6xl text-primary leading-none whitespace-nowrap shrink-0'>
						Shop Krishna Vastra
					</h1>
					<p className='font-sans text-lg text-on-surface-variant max-w-2xl text-left xl:text-right leading-relaxed'>
						Explore our premium collection of divine attire, meticulously
						crafted with reverence and luxury to adorn your beloved deity.
					</p>
				</div>

				<div className='flex flex-col lg:flex-row gap-12 items-start'>
					{/* Sidebar */}
					<aside className='w-full lg:w-64 shrink-0 bg-surface-container-low border-[0.5px] border-tertiary/20 rounded-md p-8 sticky top-28'>
						<div className='mb-8 pb-8 border-b-[0.5px] border-tertiary/20'>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Categories
							</h3>

							<ul className='space-y-4'>
								{categories.map((c) => (
									<li key={c.label}>
										<label className='flex items-center gap-4 cursor-pointer group'>
											<div className='relative flex items-center justify-center'>
												<input
													type='checkbox'
													defaultChecked={c.checked}
													className='peer appearance-none w-5 h-5 border-[1.5px] border-tertiary/40 rounded-sm checked:bg-primary checked:border-primary transition-all cursor-pointer'
												/>
												<span className='material-symbols-outlined absolute text-[14px] text-surface opacity-0 peer-checked:opacity-100 pointer-events-none'>
													check
												</span>
											</div>
											<span className='font-sans text-sm text-on-surface-variant group-hover:text-primary transition-colors'>
												{c.label}
											</span>
										</label>
									</li>
								))}
							</ul>
						</div>

						<div className='mb-8 pb-8 border-b-[0.5px] border-tertiary/20'>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Price
							</h3>

							<div className='space-y-6'>
								<input
									type='range'
									className='w-full h-[2px] bg-tertiary/20 rounded-full appearance-none cursor-pointer accent-primary'
								/>
								<div className='flex items-center justify-between gap-4'>
									<input
										type='text'
										placeholder='Min'
										className='w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50'
									/>
									<span className='text-on-surface-variant/50'>-</span>
									<input
										type='text'
										placeholder='Max'
										className='w-full bg-surface border-b border-tertiary/30 font-sans text-sm text-on-surface focus:outline-none focus:border-primary py-2 px-1 transition-colors placeholder:text-on-surface-variant/50'
									/>
								</div>
							</div>
						</div>

						<div>
							<h3 className='font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-6'>
								Size (Inches)
							</h3>
							<div className='flex flex-wrap gap-3'>
								{["0-2", "3-5", "6-8", "9-12", "12+"].map((size, idx) => (
									<button
										key={size}
										type='button'
										className={`px-4 py-2 border-[0.5px] rounded-full font-sans text-xs transition-colors ${
											idx === 1
												? "border-primary bg-primary text-surface"
												: "border-tertiary/30 text-on-surface-variant hover:border-primary hover:text-primary"
										}`}>
										{size}
									</button>
								))}
							</div>
						</div>
					</aside>

					{/* Main Content Area */}
					<div className='grow w-full'>
						{/* Toolbar */}
						<div className='flex flex-col sm:flex-row justify-between items-center mb-10 pb-4 border-b-[0.5px] border-tertiary/20 gap-4'>
							<div className='flex items-center gap-4'>
								<label
									className='font-sans text-xs text-on-surface-variant uppercase tracking-widest whitespace-nowrap'
									htmlFor='sort'>
									Sort by:
								</label>
								<select
									id='sort'
									className='bg-transparent border-none font-sans text-sm text-primary focus:outline-none focus:ring-0 cursor-pointer font-semibold'>
									<option>Recommended</option>
									<option>Price: Low to High</option>
									<option>Price: High to Low</option>
									<option>Newest Arrivals</option>
								</select>
							</div>
						</div>

						{/* Product Grid */}
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16'>
							{/* Product Card 1 */}
							<div onClick={() => navigate('/product/1')} className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
								<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
									<div className='absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold z-10'>
										New Arrival
									</div>
									<img
										alt='Product Image'
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuDxnQaBSciQLuxnJ06BC0Znz6CmpdTDHJDprPtQoMETW0-o_Mj59ZXt1uiKIvl9ScHcuKeIK55odmzwQfzbya0uXMFQ2a3Yn9mzBRORRcssL1ukEQCUAHVc7_6Ptpek2DUYihMKr2vXBkQ8XJAWO92f9YaOyadQZTnIEzrwQOEqZunt25U5UDd-g7fsvyvQtZMcEcTPxlL0wKaNr8VQ4nvS7fO2APffG6e7x55WPUoKBT0VVm64TfCNBwDMPnZA3By9dXyGwsK3oxpl'
									/>
									{/* Hover overlay */}
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
									<LikeButton />
								</div>

								<div className='grow flex flex-col'>
									<p className='font-sans text-[10px] text-tertiary mb-2 uppercase tracking-widest font-semibold'>
										Festive Wear
									</p>
									<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
										Crimson Zari Poshak Set
									</h3>
									<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
										Intricately woven silk with heavy gold threadwork, complete
										with matching patka.
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<span className='font-sans text-xl font-medium text-primary'>
											₹4,500
										</span>
										<button
											type='button'
											onClick={(e) => e.stopPropagation()}
											className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform'>
											<span className='material-symbols-outlined text-[20px]'>
												add_shopping_cart
											</span>
										</button>
									</div>
								</div>
							</div>

							{/* Product Card 2 */}
							<div onClick={() => navigate('/product/1')} className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
								<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
									<img
										alt='Product Image'
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuBRjijKr8UE6dBndNh4FTDLJSLEcYUsv2vIBhfcFZaTshN0N7SNnJDIQhDgWXNQcgHkaRIyBri_ZpSd6Vg_sTkX4pWV15NY4eXAwj6n1ebCp0MXFN63Mvx5TYuPBBYZatNBXik2AZ47y7mNNh2-f1yPM9FQgOni62oLbBYgBrvcX55moIL92HnEVLFCIKGFiwNQU_0Q77xlXXUiX6Dc9ZKuFHZNrfdt7YlAqcQO3BlrXjzRu0dBbuFuHTd44lPBoacpSJffrJ3ZoJ3n'
									/>
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
									<LikeButton />
								</div>

								<div className='grow flex flex-col'>
									<p className='font-sans text-[10px] text-tertiary mb-2 uppercase tracking-widest font-semibold'>
										Bansuri
									</p>
									<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
										Swarna Peacock Flute
									</h3>
									<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
										Golden flute accented with Austrian crystals and detailed
										peacock enamel work.
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<span className='font-sans text-xl font-medium text-primary'>
											₹1,200
										</span>
										<button
											type='button'
											onClick={(e) => e.stopPropagation()}
											className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform'>
											<span className='material-symbols-outlined text-[20px]'>
												add_shopping_cart
											</span>
										</button>
									</div>
								</div>
							</div>

							{/* Product Card 3 */}
							<div onClick={() => navigate('/product/1')} className='flex flex-col group relative overflow-hidden bg-transparent cursor-pointer'>
								<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
									<div className='absolute top-4 left-4 bg-tertiary/10 text-tertiary backdrop-blur-md border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold z-10'>
										15% OFF
									</div>
									<img
										alt='Product Image'
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuDpgm-VJ4RSekVfcdo6dJ1efxKoFXY6kMKTpVzd8yOZEWK5De-Itduk2IoCG9Fi4TE1nKlQeCl0s0m9A1m5q5CLptzqOsM3DNJvlmtt88P7xAiHAa4qdHArPkH_GD6LQGA7T3kHBMIMJOIZ-0y4RgBO9cNXHlHRnnADvtr_bkSQEDzEQmHVjQ1r32ku9BVVPGfhxy4d_Vb8prP4nem5GeWn4CEP9G0mEi7FsR0tGJ_p0E7O5yN7eCygAfPSo9oszUB_-e9nZHJphGkB'
									/>
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
									<LikeButton />
								</div>

								<div className='grow flex flex-col'>
									<p className='font-sans text-[10px] text-tertiary mb-2 uppercase tracking-widest font-semibold'>
										Jewelry
									</p>
									<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
										Navratna Haar Set
									</h3>
									<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
										Nine precious stones embedded in a traditional gold-plated
										brass base.
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<div className='flex items-baseline gap-3'>
											<span className='font-sans text-xl font-medium text-primary'>
												₹3,825
											</span>
											<span className='text-xs text-on-surface-variant line-through'>
												₹4,500
											</span>
										</div>
										<button
											type='button'
											onClick={(e) => e.stopPropagation()}
											className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform'>
											<span className='material-symbols-outlined text-[20px]'>
												add_shopping_cart
											</span>
										</button>
									</div>
								</div>
							</div>

							{/* Product Card 4 */}
							<div className='flex flex-col group relative overflow-hidden bg-transparent'>
								<div className='aspect-4/5 bg-surface-container-low rounded-md mb-6 overflow-hidden relative'>
									<img
										alt='Product Image'
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
										src='https://lh3.googleusercontent.com/aida-public/AB6AXuAtw8CYVGGcxfsBGv0HF7LPve437sUbAceQYQhHj6AXkvEFU_q8Fgl6_UwVjSGZNMMdEIINjmFbnoEJ-imxO7U4oryRykjiQiIp7oibMkV10cHlW3m6QU-_wbPcML_M-cPDImAlYB_5vNg5N9RluE92_lnV89iss302C5eHpSHhMYlLeYfAheu6rHtdCB94dHtdPiubO6wLOLF7dyI9l-uKfMUvJNgmhhGtSU6MjvR-fIaTjezauDDfN9lxpj4a5X4ap59pfTKddBh2'
									/>
									<div className='absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none'></div>
									<LikeButton />
								</div>

								<div className='grow flex flex-col'>
									<p className='font-sans text-[10px] text-tertiary mb-2 uppercase tracking-widest font-semibold'>
										Mukut
									</p>
									<h3 className='font-serif text-2xl text-on-surface mb-2 font-medium'>
										Pitambar Pearl Crown
									</h3>
									<p className='font-sans text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed'>
										Yellow silk base decorated with faux pearls and a central
										ruby-colored stone.
									</p>

									<div className='mt-auto flex items-center justify-between'>
										<span className='font-sans text-xl font-medium text-primary'>
											₹1,800
										</span>
										<button
											type='button'
											className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-primary hover:bg-linear-to-r hover:from-tertiary/80 hover:via-tertiary/90 hover:to-tertiary/80 hover:text-primary transition-all duration-300 transform'>
											<span className='material-symbols-outlined text-[20px]'>
												add_shopping_cart
											</span>
										</button>
									</div>
								</div>
							</div>

							{/* Placeholders */}
							{Array.from({ length: 2 }).map((_, i) => (
								<div
									key={i}
									className='flex flex-col justify-center items-center text-center opacity-60 bg-surface-container-low aspect-4/5 rounded-md border-[0.5px] border-tertiary/20 border-dashed'>
									<span className='material-symbols-outlined text-[48px] text-tertiary/50 mb-6'>
										auto_awesome
									</span>
									<h3 className='font-serif text-xl text-primary mb-2'>
										More Divine Attire
									</h3>
									<p className='font-sans text-sm text-on-surface-variant'>
										Loading collection...
									</p>
								</div>
							))}
						</div>

						{/* Pagination */}
						<div className='mt-stack-xl flex justify-center items-center gap-4'>
							<button
								type='button'
								className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors'>
								<span className='material-symbols-outlined'>chevron_left</span>
							</button>

							<button
								type='button'
								className='h-10 w-10 rounded-full bg-primary text-surface font-sans text-sm flex items-center justify-center shadow-[0_4px_14px_rgba(79,55,138,0.3)]'>
								1
							</button>

							<button
								type='button'
								className='h-10 w-10 rounded-full flex items-center justify-center text-on-surface-variant font-sans text-sm hover:text-primary transition-colors'>
								2
							</button>

							<button
								type='button'
								className='h-10 w-10 rounded-full flex items-center justify-center text-on-surface-variant font-sans text-sm hover:text-primary transition-colors'>
								3
							</button>

							<span className='text-on-surface-variant px-2'>...</span>

							<button
								type='button'
								className='h-10 w-10 rounded-full border border-tertiary/30 flex items-center justify-center text-on-surface-variant hover:border-primary hover:text-primary transition-colors'>
								<span className='material-symbols-outlined'>chevron_right</span>
							</button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

