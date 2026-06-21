/** @format */

import { useNavigate } from "react-router-dom";

export default function FAQKrishnaVasanam() {
	const navigate = useNavigate();

	const sections = [
		{
			icon: "shopping_bag",
			title: "Orders & Payment",
			items: [
				{
					q: "How do I place an order?",
					a: "Simply browse our collections, select your desired size, and click 'Add to Cart'. Proceed to checkout to complete your purchase securely.",
				},
				{
					q: "What payment methods do you accept?",
					a: "We accept all major credit cards, PayPal, and secure bank transfers for your convenience and peace of mind.",
				},
			],
		},
		{
			icon: "local_shipping",
			title: "Shipping & Delivery",
			items: [
				{
					q: "Do you ship internationally?",
					a: "Yes, we deliver our divine elegance globally. International shipping rates and times vary by location.",
				},
				{
					q: "How can I track my order?",
					a: "Once your order is dispatched, you will receive a tracking link via email to monitor its journey to your doorstep.",
				},
			],
		},
		{
			icon: "dry_cleaning",
			title: "Garment Care",
			items: [
				{
					q: "How should I care for silk garments?",
					a: "We recommend dry cleaning only for our premium silk pieces to preserve their luster, intricate embroidery, and divine essence.",
				},
			],
		},
	];

	return (
		<div className='bg-surface text-on-surface font-sans min-h-screen flex flex-col antialiased selection:bg-tertiary/20 selection:text-primary'>
			{/* Main Content */}
			<main className='grow w-full px-4 md:px-8 lg:px-16 xl:px-24 py-20 flex flex-col gap-20'>
				{/* Page Header */}
				<section className='text-center flex flex-col items-center gap-6'>
					<h1 className='font-serif text-4xl md:text-5xl lg:text-6xl text-primary'>
						Frequently Asked Questions
					</h1>
					<p className='font-sans text-base text-on-surface-variant max-w-2xl mx-auto'>
						Find answers to common questions about our divine collections,
						shipping, and care. If you need further assistance, our spiritual
						concierge is ready to help.
					</p>
					<div className='mt-8 flex justify-center'>
						<div className='flex items-center justify-center w-full max-w-30'>
							<div className='flex-1 h-[0.5px] bg-linear-to-r from-transparent to-tertiary/50'></div>
							<div className='w-1.5 h-1.5 rotate-45 bg-tertiary mx-3'></div>
							<div className='flex-1 h-[0.5px] bg-linear-to-l from-transparent to-tertiary/50'></div>
						</div>
					</div>
				</section>

				{/* FAQ Sections */}
				<section className='w-full max-w-4xl mx-auto flex flex-col gap-12'>
					{sections.map((sec) => (
						<div key={sec.title} className='bg-transparent'>
							<div className='flex items-center gap-4 mb-6 border-b-[0.5px] border-tertiary/20 pb-4'>
								<span className='material-symbols-outlined text-tertiary text-2xl'>
									{sec.icon}
								</span>
								<h2 className='font-sans text-sm uppercase tracking-widest text-primary font-semibold'>
									{sec.title}
								</h2>
							</div>

							<div className='flex flex-col gap-4'>
								{sec.items.map((it) => (
									<details
										key={it.q}
										className='group bg-surface-container-low rounded-md border-[0.5px] border-tertiary/20 overflow-hidden'>
										<summary className='flex items-center justify-between p-6 cursor-pointer hover:bg-surface-container-low/80 transition-colors list-none'>
											<h3 className='font-serif text-xl text-primary group-open:text-tertiary transition-colors'>
												{it.q}
											</h3>
											<span className='material-symbols-outlined text-tertiary group-open:rotate-180 transition-transform'>
												expand_more
											</span>
										</summary>
										<div className='p-6 pt-0 text-sm font-sans text-on-surface-variant leading-relaxed'>
											{it.a}
										</div>
									</details>
								))}
							</div>
						</div>
					))}
				</section>

				{/* Contact CTA */}
				<section className='mt-8 text-center bg-primary rounded-md p-16 relative overflow-hidden'>
					<div className='absolute -right-20 -top-20 w-80 h-80 bg-tertiary/20 rounded-full blur-[80px]' />
					<div className='absolute -left-20 -bottom-20 w-80 h-80 bg-tertiary/10 rounded-full blur-[80px]' />

					<h2 className='font-serif text-3xl md:text-4xl lg:text-5xl text-surface relative z-10 mb-4'>
						Still have questions?
					</h2>
					<p className='font-sans text-sm text-surface/80 max-w-lg mx-auto relative z-10 mb-10'>
						Our dedicated support team is available to assist you with any
						inquiries regarding our collections or your spiritual journey with
						our attire.
					</p>
					<button
						onClick={() => navigate("/contact")}
						type='button'
						className='relative z-10 bg-surface text-primary font-sans text-sm uppercase tracking-widest px-10 py-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.2)] hover:scale-[1.02] transition-all duration-300'>
						Contact Support
					</button>
				</section>
			</main>
		</div>
	);
}
