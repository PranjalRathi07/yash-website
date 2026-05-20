/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Ourstory() {
	const navigate = useNavigate();

	return (
		<div className='bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col selection:bg-tertiary/20 selection:text-primary'>
			<main className='grow'>
				{/* Hero Section */}
				<section className='w-full px-8 md:px-16 lg:px-24 py-20'>
					<div className='flex flex-col md:flex-row items-center gap-16'>
						<div className='w-full md:w-1/2 flex flex-col items-start'>
							<div className='flex items-center justify-start w-full max-w-stack-xl mb-8'>
								<div className='flex-1 h-[0.5px] bg-tertiary/50'></div>
							</div>
							<h2 className='font-serif text-6xl text-primary mb-8 leading-tight'>
								Crafted with Devotion <br />
								for Kanha Ji
							</h2>
							<p className='font-sans text-base text-on-surface-variant leading-relaxed mb-10 max-w-lg'>
								Every thread woven, every jewel placed, is an act of love. At
								Krishna Vasanam, we believe that dressing the Divine is the
								highest form of art—a silent prayer translated into exquisite
								garments.
							</p>
							<button
								type='button'
								onClick={() => navigate("/our-story")}
								className='bg-primary text-surface font-sans text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:shadow-[0_4px_20px_rgba(79,55,138,0.2)] hover:scale-[1.02] transition-all duration-300'>
								Discover Our Story
							</button>
						</div>

						<div className='w-full md:w-1/2 relative group'>
							<div className='absolute inset-0 bg-tertiary/10 blur-3xl rounded-full transform -translate-x-10 translate-y-10 group-hover:bg-tertiary/20 transition-all duration-700' />
							<div className='w-full aspect-4/5 overflow-hidden rounded-md border-[0.5px] border-tertiary/30 shadow-[0_8px_30px_rgba(0,0,0,0.05)] relative z-10'>
								<img
									alt='Divine Garment'
									className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuAtLTf8gdZgUPN10poU1s6o4eIrH-KN3o7sJYuFyuRdBvPfWqYMMNAHGUWhqdVI297XXG14KV2rrQmC1PhnHTQCOJ2fMbtDLgmE3ZpNkWKCgTnTO7v4t_g818hSomB2d_IN-nOZpXPXO1asRHT-H8wU29sB4ZDjLBmGhNoGnfbKQAX_9Ywb8To0GqtH-gqGaNlx018LT8kfiBIvrfj0gXnYl7W9xHJKmBFVWcVBWCRFAvzgJeQOqhVQWgp3f4ozn9ObGRifFTfRSVtx'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Brand Story: Bento Grid */}
				<section className='bg-surface border-t-[0.5px] border-tertiary/20 py-24'>
					<div className='w-full px-8 md:px-16 lg:px-24'>
						<div className='text-center mb-16'>
							<h3 className='font-serif text-4xl text-primary mb-6'>
								The Origin of Reverence
							</h3>
							<div className='mt-8 flex justify-center'>
								<div className='flex items-center justify-center w-full max-w-[120px]'>
									<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
									<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
									<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
								</div>
							</div>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							{/* Large Image Card */}
							<div className='md:col-span-2 rounded-md border-[0.5px] border-tertiary/20 overflow-hidden relative group h-[400px]'>
								<img
									alt='Artisan Craftsmanship'
									className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuAipZVbRbFMrvLVa14zmka8Pn_ajzZVNEGeHRRaj9Le4tWkFHjtxvE3T6Kf7RmtfHitEROiWbVfBKYVqhEac3bh2PKQtspHOr-ZwWWUkKVIPqqbA67tXmtkg-OZMHYaTAyzDW34UPzw-YfQBhX5FKLQ_8VfnjEczXc0yJxtO_ClSU4o8GSL8FOwoOMCBXGX4dCt5QxxkjWfbD6JXBVovZRhW815dzjRO6PAityIVBq8AWDf5ViYAHteWxuFtB2Iz4ZUJ7u93jAYqMjA'
								/>
								<div className='absolute inset-0 bg-linear-to-t from-primary/90 via-primary/30 to-transparent' />
								<div className='absolute bottom-0 left-0 p-10'>
									<h4 className='font-serif text-3xl text-surface mb-3'>
										Generations of Artistry
									</h4>
									<p className='font-sans text-sm text-surface/80 max-w-md leading-relaxed'>
										Our lineage of weavers brings centuries of temple traditions
										into every modern masterpiece.
									</p>
								</div>
							</div>

							{/* Highlight Text Card */}
							<div className='bg-primary rounded-md p-10 flex flex-col justify-center relative overflow-hidden'>
								<div className='absolute -right-10 -top-10 w-40 h-40 bg-tertiary/20 rounded-full blur-2xl' />
								<span className='material-symbols-outlined text-tertiary mb-6 text-3xl'>
									auto_awesome
								</span>
								<h4 className='font-serif text-2xl text-surface mb-4'>
									The Essence of Tejas
								</h4>
								<p className='font-sans text-sm text-surface/80 leading-relaxed'>
									We seek to capture the 'Tejas'—the divine radiance—in our
									garments, using pure silks and authentic zari that reflect a
									higher light.
								</p>
							</div>

							{/* Small Info Card */}
							<div className='bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 p-10 flex flex-col justify-center'>
								<h4 className='font-serif text-2xl text-primary mb-4'>
									Pure Ingredients
								</h4>
								<p className='font-sans text-sm text-on-surface-variant leading-relaxed'>
									From cruelty-free silks to organic dyes, our materials are
									selected with the same purity required for a temple offering.
								</p>
							</div>

							{/* Small Image Card */}
							<div className='md:col-span-2 rounded-md border-[0.5px] border-tertiary/20 overflow-hidden h-[300px] group'>
								<img
									alt='Opulent Details'
									className='w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuCbWNNWv8osk4DeMyFMZrr-lC69mosp-7zPYySVO2WBUl9fzqyIVe3dxtAyBv1icGOKVSM_MH6h6kU84wAsVqp6sT45fXtS4IGpVKN4yMlE5l51YO9oGTsB7te9kgtqGpZl1_cYSalZo9QYjYagJj1y6UEKBDtDh-OCGkgDXEfI661rnj_kCoWBxH_NWqs8Hf2tCI6tU5yXG1orwtL4M1UoB75PFbI0fSOemsDMRLkhWhyRzA1yFs5cK5CMm2QlZme87riTHzlTNhEW'
								/>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
