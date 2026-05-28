import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export default function ProfileDashboard() {
	const navigate = useNavigate();
	const [localUser] = useState(() => {
		const saved = localStorage.getItem("currentUser");
		return saved ? JSON.parse(saved) : null;
	});

	const { data: currentUser } = useQuery({
		queryKey: ["auth", "me"],
		queryFn: async () => {
			const res = await api.get("/api/auth/me");
			if (res.data?.user) {
				localStorage.setItem("currentUser", JSON.stringify(res.data.user));
			}
			return res.data.user;
		},
		initialData: localUser,
	});

	return (
		<div className='space-y-12'>
			<div className='mb-12'>
				<h1 className='font-serif text-6xl text-primary mb-2'>
					Namaste, {currentUser?.name || "Devotee"}
				</h1>
				<p className='text-on-surface-variant font-sans text-lg'>
					Welcome back to your sacred sanctuary of style.
				</p>
			</div>
			{/* User Overview */}
			<section className='bg-surface-container-lowest rounded-md p-8 border-[0.5px] border-tertiary/20 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden'>
				<div className='relative shrink-0'>
					{currentUser?.profilePic ? (
						<img
							alt='User Profile'
							className='w-32 h-32 rounded-full object-cover border-2 border-tertiary/30 p-1'
							src={currentUser.profilePic}
						/>
					) : (
						<div className='w-32 h-32 rounded-full border-2 border-tertiary/30 p-1 flex items-center justify-center bg-surface-container-low'>
							<div className='w-full h-full rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary'>
								<span className='material-symbols-outlined text-[48px]'>person</span>
							</div>
						</div>
					)}
					<div className='absolute bottom-2 right-2 bg-surface p-1 rounded-full text-tertiary'>
						<span
							className='material-symbols-outlined text-[20px]'
							style={{ fontVariationSettings: "'FILL' 1" }}>
							verified
						</span>
					</div>
				</div>

				<div className='space-y-2 text-center md:text-left grow'>
					<h2 className='font-serif text-3xl text-primary'>{currentUser?.name || "Devotee"}</h2>
					<p className='text-on-surface-variant font-sans flex justify-center md:justify-start items-center gap-2'>
						<span className='material-symbols-outlined text-[18px]'>mail</span>
						{currentUser?.email || "devotee@temple.com"}
					</p>
					<p className='text-on-surface-variant font-sans flex justify-center md:justify-start items-center gap-2'>
						<span className='material-symbols-outlined text-[18px]'>
							calendar_today
						</span>
						Member since Jan 2026
					</p>
				</div>

				<button
					onClick={() => navigate("/profile/account-settings")}
					className='w-full md:w-auto bg-primary text-surface px-6 py-3 font-sans text-xs rounded-md uppercase tracking-widest font-semibold transition-all hover:bg-primary/90 whitespace-nowrap flex items-center justify-center gap-2 md:absolute md:top-8 md:right-8'>
					<span className='material-symbols-outlined text-[18px]'>edit</span>
					Edit Profile
				</button>
			</section>

			{/* Quick Stats Grid */}
			<section className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				{[
					{ icon: "apparel", label: "Divine Pieces Owned", value: "12" },
					{ icon: "local_shipping", label: "Active Orders", value: "02" },
					{
						icon: "token",
						label: "Sacred Rewards Points",
						value: "2,450",
					},
				].map((stat) => (
					<div
						key={stat.label}
						className='bg-surface-container-low rounded-md p-8 text-center border-[0.5px] border-tertiary/20 hover:border-tertiary transition-colors group'>
						<span className='material-symbols-outlined text-[32px] text-tertiary mb-4 group-hover:scale-110 transition-transform'>
							{stat.icon}
						</span>
						<p className='text-on-surface-variant font-sans text-[10px] uppercase tracking-widest font-semibold mb-2'>
							{stat.label}
						</p>
						<p className='font-serif text-4xl text-primary'>{stat.value}</p>
					</div>
				))}
			</section>

			{/* Recent Orders Section */}
			<section className='space-y-6'>
				<div className='flex justify-between items-end border-b-[0.5px] border-tertiary/20 pb-4'>
					<h3 className='font-serif text-3xl text-primary'>
						Recent Divine Acquisitions
					</h3>
					<a
						className='text-primary font-sans text-xs uppercase tracking-[0.15em] font-semibold hover:text-tertiary transition-colors pb-1'
						href='#'>
						View All
					</a>
				</div>

				<div className='space-y-6'>
					{/* Order Card 1 */}
					<div className='bg-surface-container-low rounded-md p-6 border-[0.5px] border-tertiary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-tertiary transition-colors'>
						<div className='flex gap-6 items-center'>
							<div className='w-20 h-24 bg-surface rounded-md overflow-hidden shrink-0'>
								<img
									alt='Product Thumb'
									className='object-cover w-full h-full'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuC9HoxunAenRs3kCR-ZdlzumjSUjXAPhJM3ogngAy4nsn5Ux-BBKIcawyVKshYuoiLCQ4Ep1VOIt4bNUT42VSbHO8kwFTExTMdsKfZLvz3mGaWPKWUGgut833MF0vnBtS_DWpo9d09pqprCXKV9E7LWSqFF3-kxpH-s66ZF2yUj7WhnE5gkToZPwTsazTX7u9n3RriWbPJnGxTA2ALL7-L6Sets2HnFfxGj5koI7R2mzXnjPfWex-nchjStnHtCKOfejjeaFS1rcZDP'
								/>
							</div>
							<div>
								<p className='font-serif text-2xl text-primary mb-1'>
									Order #KV-8924
								</p>
								<p className='text-on-surface-variant font-sans text-sm mb-2'>
									Placed on Oct 12, 2023
								</p>
								<span className='inline-block bg-tertiary/10 text-tertiary border border-tertiary/20 px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold'>
									Processing - Expected Oct 18
								</span>
							</div>
						</div>

						<div className='w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end md:gap-3'>
							<p className='font-sans text-2xl text-primary font-medium'>
								₹ 14,999
							</p>
							<button className='text-tertiary font-sans text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors flex items-center gap-1'>
								Track Order
								<span className='material-symbols-outlined text-[16px]'>
									arrow_right_alt
								</span>
							</button>
						</div>
					</div>

					{/* Order Card 2 */}
					<div className='bg-surface-container-low rounded-md p-6 border-[0.5px] border-tertiary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-tertiary transition-colors'>
						<div className='flex gap-6 items-center'>
							<div className='w-20 h-24 bg-surface rounded-md overflow-hidden shrink-0'>
								<img
									alt='Product Thumb'
									className='object-cover w-full h-full'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuBjxVoKsvxtZUC2T4RejwuEsiJ6P3t_3YgK-16u-l1zziEwRM0rWP3vHcmBaDEDEQruSB87ArUrmzTmd_ihE2BrfFuC-vWhDMA3OCkJW-4h-QEfj5QZbyDWy6VBsa7iqp1DlX_fdm_b9lbnVFYQyidVZRUR2dNRMj8P1K55TDUi6kfrvmnszAW01WTgdBkyv315gbS6xlC2vyYHVmXiR0-jAJdtnB3I8cAJ2pm0yVUZ2D3XvBSOMnfVkgRwOqRvDYEjh4UeRsqpcBMC'
								/>
							</div>
							<div>
								<p className='font-serif text-2xl text-primary mb-1'>
									Order #KV-7210
								</p>
								<p className='text-on-surface-variant font-sans text-sm mb-2'>
									Placed on Sep 28, 2023
								</p>
								<span className='inline-block bg-surface-container-highest text-on-surface-variant px-3 py-1 font-sans text-[10px] uppercase tracking-wider rounded-full font-bold border border-tertiary/10'>
									Delivered - Oct 04
								</span>
							</div>
						</div>

						<div className='w-full md:w-auto flex flex-row md:flex-col justify-between items-center md:items-end md:gap-3'>
							<p className='font-sans text-2xl text-primary font-medium'>
								₹ 8,450
							</p>
							<button className='text-tertiary font-sans text-xs uppercase tracking-widest font-semibold hover:text-primary transition-colors flex items-center gap-1'>
								View Details
								<span className='material-symbols-outlined text-[16px]'>
									arrow_right_alt
								</span>
							</button>
						</div>
					</div>
				</div>
			</section>

			{/* Decorative Divider */}
			<div className='flex items-center justify-center gap-4 py-8 opacity-60'>
				<div className='h-[0.5px] w-full bg-linear-to-r from-transparent to-tertiary/50'></div>
				<span
					className='material-symbols-outlined text-[20px] text-tertiary'
					style={{ fontVariationSettings: "'FILL' 1" }}>
					diamond
				</span>
				<div className='h-[0.5px] w-full bg-linear-to-l from-transparent to-tertiary/50'></div>
			</div>
		</div>
	);
}
