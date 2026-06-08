/** @format */


import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Logo from "../assets/Logo.png";
import gsap from "gsap";
import api from "../services/api";

const Navbar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const searchContainerRef = useRef(null);
	const searchInputRef = useRef(null);

	const isAuthenticated = !!localStorage.getItem("supabaseToken");

	const { data: cartData } = useQuery({
		queryKey: ["cart"],
		queryFn: async () => {
			const res = await api.get("/api/cart");
			return res.data?.cart || { items: [] };
		},
		enabled: isAuthenticated,
	});

	const cartItems = cartData?.items || [];
	const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

	const toggleSearch = (e) => {
		e.preventDefault();
		setIsSearchOpen(!isSearchOpen);
	};

	useEffect(() => {
		if (isSearchOpen) {
			gsap.to(searchContainerRef.current, {
				width: "220px",
				duration: 0.5,
				ease: "power3.out",
			});
			gsap.to(searchInputRef.current, {
				opacity: 1,
				duration: 0.3,
				delay: 0.2,
				pointerEvents: "auto",
			});
			searchInputRef.current.focus();
		} else {
			gsap.to(searchInputRef.current, {
				opacity: 0,
				duration: 0.2,
				pointerEvents: "none",
			});
			gsap.to(searchContainerRef.current, {
				width: "22px",
				duration: 0.5,
				ease: "power3.inOut",
			});
		}
	}, [isSearchOpen]);

	const navLinkClass = ({ isActive }) =>
		isActive
			? "text-tertiary font-bold border-b-[1.5px] border-tertiary pb-1 font-sans text-sm uppercase tracking-[0.1em]"
			: "text-surface/80 font-medium hover:text-tertiary transition-colors font-sans text-sm uppercase tracking-[0.1em]";

	return (
		<>
			{/* Top Marquee */}
			<div className='bg-[#051234] py-2 text-center overflow-hidden whitespace-nowrap border-b border-tertiary/10'>
				<div className='inline-flex items-center gap-16 animate-scroll'>
					{[...Array(4)].map((_, i) => (
						<span
							key={i}
							className='text-tertiary font-sans text-xs uppercase tracking-[0.15em]'>
							Free Shipping on Orders Above ₹999{" "}
							<span className='mx-8 text-tertiary/50'>•</span> Handcrafted
							Krishna Vastra Made with Devotion{" "}
							<span className='mx-8 text-tertiary/50'>•</span> Festive
							Collection Available Now{" "}
							<span className='mx-8 text-tertiary/50'>•</span>
						</span>
					))}
				</div>
			</div>

			<div className='w-full sticky top-0 z-50 bg-primary/95 backdrop-blur-xl border-b-[0.5px] border-tertiary/30 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300'>
				<header className='w-full px-8 md:px-16 lg:px-24 py-4 flex justify-between items-center'>
					<div className='flex-1 flex justify-start items-center space-x-8'>
						<nav className='hidden md:flex space-x-6'>
							<NavLink className={navLinkClass} to='/'>
								Home
							</NavLink>

							<NavLink className={navLinkClass} to='/collection'>
								Shop
							</NavLink>

							<NavLink className={navLinkClass} to='/new-arrivals'>
								New Arrivals
							</NavLink>

							<NavLink className={navLinkClass} to='/festive-wear'>
								Festive Wear
							</NavLink>
						</nav>
					</div>

					<div className='shrink-0 flex items-center justify-center'>
						<Link to='/' className='flex items-center justify-center'>
							<img
								alt='Krishna Vasanam Logo'
								className='h-12 md:h-16 scale-120 active:scale-95 transition-transform object-contain rounded-full'
								src={Logo}
							/>
						</Link>
					</div>

					<div className='flex-1 flex justify-end items-center space-x-6'>
						<nav className='hidden lg:flex space-x-6 mr-6'>
							<NavLink className={navLinkClass} to='/about'>
								About Us
							</NavLink>

							<NavLink className={navLinkClass} to='/contact'>
								Contact
							</NavLink>
						</nav>

						<div className='flex items-center space-x-5'>
							{/* Animated Expandable Search */}
							<div
								ref={searchContainerRef}
								className={`flex items-center h-8.5 rounded-full transition-colors duration-300 ${
									isSearchOpen
										? "bg-surface-container-low/10 border-[0.5px] border-tertiary/50 pl-2"
										: "bg-transparent border-transparent"
								}`}
								style={{ width: "22px", overflow: "hidden" }}>
								<button
									onClick={toggleSearch}
									className='text-tertiary/80 hover:text-tertiary transition-colors flex items-center justify-center shrink-0 w-5.5 h-full'
									aria-label='Toggle Search'>
									<span className='material-symbols-outlined text-[22px]'>
										{isSearchOpen ? "close" : "search"}
									</span>
								</button>

								<input
									ref={searchInputRef}
									type='text'
									placeholder='Search collection...'
									className='bg-transparent border-none outline-none text-surface placeholder:text-surface/60 font-sans text-sm w-45 pl-2 opacity-0'
								/>
							</div>

							<Link
								className='text-tertiary/80 hover:text-tertiary transition-all flex items-center'
								to='/profile'>
								<span className='material-symbols-outlined text-[22px]'>
									account_circle
								</span>
							</Link>


							<Link
								className='text-tertiary/80 hover:text-tertiary transition-all relative flex items-center'
								to='/cart'>
								<span className='material-symbols-outlined text-[22px]'>
									shopping_bag
								</span>

								<span className='absolute -top-1.5 -right-2 bg-tertiary text-primary text-[9px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border border-primary'>
									{cartItemsCount}
								</span>
							</Link>
						</div>
					</div>
				</header>
			</div>
		</>
	);
};

export default Navbar;
