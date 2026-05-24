/** @format */

import { useRef } from "react";
import gsap from "gsap";

export default function SavedAddresses() {
	const saveBtnRef = useRef(null);

	const handleSaveEnter = () => {
		gsap.to(saveBtnRef.current, {
			scale: 1.02,
			y: -2,
			boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
			duration: 0.4,
			ease: "power2.out",
		});
	};

	const handleSaveLeave = () => {
		gsap.to(saveBtnRef.current, {
			scale: 1,
			y: 0,
			boxShadow: "none",
			duration: 0.4,
			ease: "power2.out",
		});
	};

	return (
		<div className='bg-surface text-on-surface font-sans antialiased'>
			<div className='max-w-container-max-width mx-auto flex min-h-screen relative'>
				{/* Main Content Area */}
				<main className='flex-1 p-edge-margin'>
					<header className='mb-section-gap'>
						<h1 className='font-serif text-6xl text-primary mb-1'>
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
							<h2 className='font-serif text-4xl font-bold text-on-surface'>
								Stored Destinations
							</h2>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-gutter'>
							{/* Primary Address Card */}
							<div className='bg-surface card-soft-border rounded-[20px] p-6 transition-all relative'>
								<h3 className='font-serif text-2xl font-medium text-primary mb-2'>
									Aditya Sharma
								</h3>
								<p className='text-on-surface-variant font-sans text-base mb-1'>
									C-42, Vaikunth Residency, 4th Floor
								</p>
								<p className='text-on-surface-variant font-sans text-base mb-1'>
									Lotus Valley Road, Sector 62
								</p>
								<p className='text-on-surface-variant font-sans text-base mb-4'>
									Noida, Uttar Pradesh - 201309
								</p>
								<div className='flex items-center gap-2 text-on-surface-variant mb-6'>
									<span
										className='material-symbols-outlined text-tertiary'
										data-icon='call'>
										call
									</span>
									<span className='font-sans text-sm font-medium'>
										+91 98765 43210
									</span>
								</div>
								<div className='flex gap-4 border-t border-secondary-container/20 pt-4'>
									<button className='flex items-center gap-2 text-primary font-sans text-sm font-medium hover:text-tertiary transition-colors'>
										<span
											className='material-symbols-outlined text-[18px]'
											data-icon='edit'>
											edit
										</span>{" "}
										Edit
									</button>
									<button className='flex items-center gap-2 text-error font-sans text-sm font-medium hover:opacity-70 transition-all'>
										<span
											className='material-symbols-outlined text-[18px]'
											data-icon='delete'>
											delete
										</span>{" "}
										Remove
									</button>
								</div>
							</div>

							{/* Secondary Address Card */}
							<div className='bg-surface card-soft-border rounded-[20px] p-6 transition-all'>
								<h3 className='font-serif text-2xl font-medium text-primary mb-2'>
									Priya Gupta
								</h3>
								<p className='text-on-surface-variant font-sans text-base mb-1'>
									Apt 102, Shanti Kunj Apartments
								</p>
								<p className='text-on-surface-variant font-sans text-base mb-1'>
									Marine Drive, Nariman Point
								</p>
								<p className='text-on-surface-variant font-sans text-base mb-4'>
									Mumbai, Maharashtra - 400021
								</p>
								<div className='flex items-center gap-2 text-on-surface-variant mb-6'>
									<span
										className='material-symbols-outlined text-tertiary'
										data-icon='call'>
										call
									</span>
									<span className='font-sans text-sm font-medium'>
										+91 91234 56789
									</span>
								</div>
								<div className='flex gap-4 border-t border-secondary-container/20 pt-4'>
									<button className='flex items-center gap-2 text-primary font-sans text-sm font-medium hover:text-tertiary transition-colors'>
										<span
											className='material-symbols-outlined text-[18px]'
											data-icon='edit'>
											edit
										</span>{" "}
										Edit
									</button>
									<button className='flex items-center gap-2 text-error font-sans text-sm font-medium hover:opacity-70 transition-all'>
										<span
											className='material-symbols-outlined text-[18px]'
											data-icon='delete'>
											delete
										</span>{" "}
										Remove
									</button>
								</div>
							</div>
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
					<section className='min-w-full '>
						<div className='flex items-center gap-4 mb-stack-lg m-8'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='add_location_alt'>
								add_location_alt
							</span>
							<h2 className='font-serif text-4xl font-bold text-on-surface'>
								Add New Sacred Address
							</h2>
						</div>

						<div className='bg-surface-container-lowest card-soft-border rounded-[20px] p-10'>
							<form className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<div className='md:col-span-1 flex flex-col gap-2'>
									<label
										className='font-sans text-sm font-medium text-on-surface'
										htmlFor='full_name'>
										Full Name
									</label>
									<input
										id='full_name'
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
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Area or Neighborhood'
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
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant'
										placeholder='Select City'
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
										className='bg-surface card-soft-border rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none'
										defaultValue=''>
										<option value=''>Select State</option>
										<option value='up'>Uttar Pradesh</option>
										<option value='mh'>Maharashtra</option>
										<option value='ka'>Karnataka</option>
										<option value='dl'>Delhi</option>
									</select>
								</div>
								<div className='md:col-span-2 flex items-center gap-3 mt-2'>
									<input
										className='w-5 h-5 rounded card-soft-border text-tertiary focus:ring-tertiary cursor-pointer'
										id='set_default'
										type='checkbox'
									/>
									<label
										className='font-sans text-base text-on-surface-variant cursor-pointer'
										htmlFor='set_default'>
										Set as Primary sacred address
									</label>
								</div>
								<div className='md:col-span-2 mt-8'>
									<button
										ref={saveBtnRef}
										onMouseEnter={handleSaveEnter}
										onMouseLeave={handleSaveLeave}
										className='w-full bg-linear-to-r from-tertiary/80 via-tertiary/90 to-tertiary/80 text-primary py-4 rounded-full font-sans text-sm font-bold tracking-widest uppercase shadow-lg hover:opacity-90'
										type='submit'>
										Save Address
									</button>
								</div>
							</form>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
