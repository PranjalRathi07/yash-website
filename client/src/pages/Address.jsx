/** @format */

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import gsap from "gsap";
import api from "../services/api";
import toast from "react-hot-toast";

export default function SavedAddresses() {
	const queryClient = useQueryClient();
	const saveBtnRef = useRef(null);

	const [formData, setFormData] = useState({
		fullName: "",
		phone: "",
		line1: "",
		line2: "",
		city: "",
		state: "",
		postalCode: "",
		isDefault: false,
	});

	const [editingAddressId, setEditingAddressId] = useState(null);

	const { data: addresses = [], isLoading, isError } = useQuery({
		queryKey: ["addresses"],
		queryFn: async () => {
			const res = await api.get("/api/addresses");
			return res.data?.addresses || [];
		},
	});

	const createMutation = useMutation({
		mutationFn: async (data) => {
			return await api.post("/api/addresses", data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
			resetForm();
		},
	});

	const updateMutation = useMutation({
		mutationFn: async ({ id, data }) => {
			return await api.put(`/api/addresses/${id}`, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
			resetForm();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			return await api.delete(`/api/addresses/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] });
		},
	});

	const resetForm = () => {
		setFormData({
			fullName: "",
			phone: "",
			line1: "",
			line2: "",
			city: "",
			state: "",
			postalCode: "",
			isDefault: false,
		});
		setEditingAddressId(null);
	};

	const handleEdit = (addr) => {
		setFormData({
			fullName: addr.fullName,
			phone: addr.phone,
			line1: addr.line1,
			line2: addr.line2 || "",
			city: addr.city,
			state: addr.state,
			postalCode: addr.postalCode,
			isDefault: addr.isDefault,
		});
		setEditingAddressId(addr.id);
		document.getElementById("address-form-section")?.scrollIntoView({ behavior: "smooth" });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formData.fullName || !formData.phone || !formData.line1 || !formData.city || !formData.state || !formData.postalCode) {
			toast.error("All required fields must be completed.");
			return;
		}

		if (editingAddressId) {
			updateMutation.mutate({ id: editingAddressId, data: formData });
		} else {
			createMutation.mutate(formData);
		}
	};

	const handleSaveEnter = () => {
		if (saveBtnRef.current) {
			gsap.to(saveBtnRef.current, {
				scale: 1.02,
				y: -2,
				boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
				duration: 0.4,
				ease: "power2.out",
			});
		}
	};

	const handleSaveLeave = () => {
		if (saveBtnRef.current) {
			gsap.to(saveBtnRef.current, {
				scale: 1,
				y: 0,
				boxShadow: "none",
				duration: 0.4,
				ease: "power2.out",
			});
		}
	};

	return (
		<div className='bg-surface text-on-surface font-sans antialiased'>
			<div className='max-w-container-max-width mx-auto flex min-h-screen relative'>
				{/* Main Content Area */}
				<main className='flex-1 p-edge-margin'>
					<header className='mb-section-gap'>
						<h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-primary mb-1'>
							Your Sacred Addresses
						</h1>
						<div className='w-24 h-1 bg-linear-to-r from-tertiary/80 via-tertiary/90 to-tertiary/80 rounded-full' />
					</header>

					{/* Saved Addresses Grid */}
					<section className='mb-section-gap'>
						<div className='flex items-center gap-4 mb-stack-lg mt-8'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='home_pin'>
								home_pin
							</span>
							<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface'>
								Stored Destinations
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-gutter'>
							{isLoading ? (
								<div className='col-span-full py-16 text-center text-on-surface-variant font-sans bg-surface-container-low rounded-md'>
									<span className='material-symbols-outlined text-[48px] animate-spin text-primary mb-3 block'>
										progress_activity
									</span>
									Retrieving your sacred addresses...
								</div>
							) : isError ? (
								<div className='col-span-full py-16 text-center text-red-500 font-sans bg-surface-container-low rounded-md'>
									Failed to load your addresses. Please reload.
								</div>
							) : addresses.length === 0 ? (
								<div className='col-span-full py-16 text-center text-on-surface-variant font-sans bg-surface-container-low rounded-md border border-dashed border-tertiary/20'>
									<span className='material-symbols-outlined text-[48px] text-tertiary/40 mb-3 block'>
										home_pin
									</span>
									No stored addresses yet. Add one below to complete your setup.
								</div>
							) : (
								addresses.map((addr) => (
									<div key={addr.id} className={`bg-surface card-soft-border rounded-[20px] p-6 transition-all relative ${addr.isDefault ? 'border-primary shadow-sm' : ''}`}>
										{addr.isDefault && (
											<span className='absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold'>
												Primary
											</span>
										)}
										<h3 className='font-serif text-2xl font-medium text-primary mb-2'>
											{addr.fullName}
										</h3>
										<p className='text-on-surface-variant font-sans text-base mb-1'>
											{addr.line1}
										</p>
										{addr.line2 && (
											<p className='text-on-surface-variant font-sans text-base mb-1'>
												{addr.line2}
											</p>
										)}
										<p className='text-on-surface-variant font-sans text-base mb-4'>
											{addr.city}, {addr.state} - {addr.postalCode}
										</p>
										<div className='flex items-center gap-2 text-on-surface-variant mb-6'>
											<span className='material-symbols-outlined text-tertiary'>
												call
											</span>
											<span className='font-sans text-sm font-medium'>
												{addr.phone}
											</span>
										</div>
										<div className='flex gap-4 border-t border-secondary-container/20 pt-4'>
											<button 
												onClick={() => handleEdit(addr)}
												className='flex items-center gap-2 text-primary font-sans text-sm font-medium hover:text-tertiary transition-colors cursor-pointer bg-transparent border-none'>
												<span className='material-symbols-outlined text-[18px]'>
													edit
												</span>{" "}
												Edit
											</button>
											<button 
												disabled={deleteMutation.isPending}
												onClick={() => deleteMutation.mutate(addr.id)}
												className='flex items-center gap-2 text-error font-sans text-sm font-medium hover:opacity-70 transition-all cursor-pointer bg-transparent border-none disabled:opacity-30'>
												<span className='material-symbols-outlined text-[18px]'>
													delete
												</span>{" "}
												Remove
											</button>
										</div>
									</div>
								))
							)}
						</div>
					</section>

					{/* Decorative Divider */}
					<div className='flex items-center justify-center gap-4 mb-section-gap m-8'>
						<div className='flex-1 h-px bg-secondary-container/30' />
						<span
							className='material-symbols-outlined text-tertiary'
							data-icon='eco'>
							eco
						</span>
						<div className='flex-1 h-px bg-secondary-container/30' />
					</div>

					{/* Add New Address Form Section */}
					<section id='address-form-section' className='min-w-full '>
						<div className='flex items-center gap-4 mb-stack-lg m-8'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='add_location_alt'>
								add_location_alt
							</span>
							<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface'>
								{editingAddressId ? "Edit Stored Address" : "Add New Sacred Address"}
							</h2>
						</div>

						<div className='bg-surface-container-lowest card-soft-border rounded-[20px] p-10'>
							<form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='full_name'>
										Full Name
									</label>
									<input
										id='full_name'
										required
										value={formData.fullName}
										onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Devotee Name'
										type='text'
									/>
								</div>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='phone'>
										Phone Number
									</label>
									<input
										id='phone'
										required
										value={formData.phone}
										onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='+91 00000 00000'
										type='tel'
									/>
								</div>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='pincode'>
										Pincode
									</label>
									<input
										id='pincode'
										required
										value={formData.postalCode}
										onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='6-digit code'
										type='text'
									/>
								</div>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='locality'>
										Locality
									</label>
									<input
										id='locality'
										value={formData.line2}
										onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Area or Neighborhood (Optional)'
										type='text'
									/>
								</div>
								<div className='md:col-span-2 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='address'>
										Address (House No, Building, Street)
									</label>
									<textarea
										id='address'
										required
										value={formData.line1}
										onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Detailed Address'
										rows={3}
									/>
								</div>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='city'>
										City
									</label>
									<input
										id='city'
										required
										value={formData.city}
										onChange={(e) => setFormData({ ...formData, city: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Enter City'
										type='text'
									/>
								</div>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='state'>
										State
									</label>
									<select
										id='state'
										required
										value={formData.state}
										onChange={(e) => setFormData({ ...formData, state: e.target.value })}
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
										defaultValue=''>
										<option value=''>Select State</option>
										<option value='Uttar Pradesh'>Uttar Pradesh</option>
										<option value='Maharashtra'>Maharashtra</option>
										<option value='Karnataka'>Karnataka</option>
										<option value='Delhi'>Delhi</option>
										<option value='Gujarat'>Gujarat</option>
										<option value='Rajasthan'>Rajasthan</option>
									</select>
								</div>
								<div className='md:col-span-2 flex items-center gap-3 mt-2'>
									<input
										className='w-5 h-5 rounded card-soft-border text-tertiary focus:ring-tertiary cursor-pointer'
										id='set_default'
										type='checkbox'
										checked={formData.isDefault}
										onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
									/>
									<label
										className='font-sans text-base text-on-surface-variant cursor-pointer'
										htmlFor='set_default'>
										Set as Primary sacred address
									</label>
								</div>
								<div className='md:col-span-2 flex flex-col sm:flex-row gap-4 mt-8'>
									<button
										ref={saveBtnRef}
										disabled={createMutation.isPending || updateMutation.isPending}
										onMouseEnter={handleSaveEnter}
										onMouseLeave={handleSaveLeave}
										className='flex-1 bg-linear-to-r from-tertiary/80 via-tertiary/90 to-tertiary/80 text-primary py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase shadow-lg hover:opacity-90 disabled:opacity-50 cursor-pointer'
										type='submit'>
										{editingAddressId ? "Update Address" : "Save Address"}
									</button>
									{editingAddressId && (
										<button
											type='button'
											onClick={resetForm}
											className='flex-1 bg-transparent border border-tertiary/30 text-on-surface-variant py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase hover:bg-surface-container-low transition-colors cursor-pointer'>
											Cancel Edit
										</button>
									)}
								</div>
							</form>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
