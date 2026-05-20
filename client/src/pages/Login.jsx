/** @format */

import { useState } from "react";
import { motion } from "motion/react";
import Google from "../assets/google.svg";

/* ─── Shared field classes ─── */
const labelCls =
	"block text-[0.72rem] font-semibold tracking-[0.07em] uppercase text-[#6b6b8a] mb-2";

const inputCls =
	"w-full px-4 py-[13px] text-[0.9rem] text-[#1a1a3e] bg-[#ede8dc] border-none rounded-[10px] outline-none font-sans focus:ring-2 focus:ring-[rgba(181,150,90,0.5)] transition-shadow";

export default function LoginPage() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [fadeOpacity, setFadeOpacity] = useState(1);
	const [showPassword, setShowPassword] = useState(false);

	const toggleAuthMode = () => {
		setFadeOpacity(0);
		setTimeout(() => {
			setIsLoginMode((prev) => !prev);
			setFadeOpacity(1);
		}, 300);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='flex w-screen h-screen overflow-hidden font-sans'>
			{/* ══ LEFT PANEL ══ */}
			<div
				className='relative hidden md:flex w-[47%] h-screen shrink-0 items-center justify-center overflow-hidden'
				style={{
					background:
						"linear-gradient(160deg, #0c1a4e 0%, #0a1540 40%, #07112e 100%)",
				}}>
				{/* Gold dot-grid overlay */}
				<div
					className='absolute inset-0 pointer-events-none'
					style={{
						backgroundImage:
							"radial-gradient(rgba(231,201,111,0.35) 0.5px, transparent 0.5px)",
						backgroundSize: "22px 22px",
					}}
				/>

				{/* Silk texture overlay */}
				<motion.div className='absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay'>
					<div
						className='w-full h-full bg-cover bg-center'
						style={{
							backgroundImage:
								"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDPTjIND1SPUtAPws72vp1wUHhKyChLLk-sRA_qiII_NSWxPJQLcCYOUmWb2qmqG-d6xGTkLw4t-4hTqWr6fwOGdKyUQargPPGFp9VawKz0CknCkGfal4wwDw0rHA3wMr47tRpleVQ-XvcZKBumqrIg2pxyht0dfcGCxUhLZe1vRmmkRuDQB60vg46mz_2xSLwDbmTPTjukrtsrut-Qmvozc9jvdunsNvBIKO5x9RPXpmxmPX3JOnf56MW_y2BY5dCDf81U5aPqzF9I')",
						}}
					/>
				</motion.div>

				{/* Content */}
				<div className='relative z-10 text-center max-w-[340px] px-6'>
					{/* Logo */}
					<img
						alt='Krishna Vasanam Logo'
						className='w-40 h-auto mx-auto mb-9 block drop-shadow-2xl rounded-full'
						src='https://lh3.googleusercontent.com/aida-public/AB6AXuDVbgWf9w1oZjEWVY7nNhUoDWTvBK7Moh2wWElpXhTa60JR-c4qM2tN6cZWdkYYnwG3Vnte5f6XvqUfhqdrW9W50gGDl3R_6nX6ySvQNwYCLKcWQscWHtW9jiVsXc8bzisStgqCew0AubQG2e_HH4hx0yYkccOuScZ7WZjUAPDu5RvlXPtaTTzuqexuqDC4ceMVT7rZ-yyBnBxqY5GaxW7llCPvBhr6WdbnMKO8I-B54ejWGNBpc0VHhAxX8uUBOqdPpNxK8t6sXQLL'
					/>

					{/* Heading */}
					<h1 className='font-serif text-[2.5rem] font-bold text-white tracking-[-0.02em] leading-[1.15] mb-5'>
						Divine Elegance
					</h1>

					{/* Subtext */}
					<p className='text-[0.9rem] text-[rgba(200,215,255,0.75)] leading-[1.75] text-center'>
						Step into a sanctuary of sacred textiles and ancient craftsmanship.
						Experience the tranquility of timeless luxury.
					</p>

					{/* Decorative divider */}
					<div className='mt-8 flex items-center justify-center gap-[14px]'>
						<div className='h-px w-12 bg-[rgba(231,201,111,0.35)]' />
						<span className='material-symbols-outlined text-[18px] text-[rgba(231,201,111,0.6)]'>
							spa
						</span>
						<div className='h-px w-12 bg-[rgba(231,201,111,0.35)]' />
					</div>
				</div>
			</div>

			{/* ══ RIGHT PANEL ══ */}
			<div className='relative flex flex-1 h-screen overflow-hidden items-center justify-center bg-[#f5f0e8]'>
				{/* Decorative corner icon */}
				<div className='absolute bottom-10 right-10 opacity-[0.08] pointer-events-none rotate-45 select-none'>
					<span
						className='material-symbols-outlined text-[110px] text-[#b5965a]'
						style={{ fontVariationSettings: "'FILL' 1" }}>
						eco
					</span>
				</div>

				{/* Form container */}
				<div
					className='w-full max-w-[420px] px-9 transition-opacity duration-300'
					style={{ opacity: fadeOpacity }}>
					{/* Header */}
					<div className='text-center mb-8'>
						<h2 className='font-serif text-[2.1rem] font-bold text-[#1a1a3e] tracking-[-0.01em] leading-[1.2] mb-2'>
							{isLoginMode ? "Welcome Back" : "Join the Sanctuarium"}
						</h2>
						<p className='text-[0.88rem] text-[#6b6b8a]'>
							{isLoginMode
								? "Sign in to your sacred account."
								: "Create your profile for exclusive access."}
						</p>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className='flex flex-col gap-[18px]'>
						{isLoginMode ? (
							<>
								{/* Email */}
								<div>
									<label htmlFor='email' className={labelCls}>
										Email or Phone
									</label>
									<input
										id='email'
										name='email'
										type='text'
										placeholder='yourname@divine.com'
										className={inputCls}
									/>
								</div>

								{/* Password */}
								<div>
									<label htmlFor='password' className={labelCls}>
										Password
									</label>
									<div className='relative'>
										<input
											id='password'
											name='password'
											type={showPassword ? "text" : "password"}
											placeholder='••••••••'
											className={`${inputCls} pr-12`}
										/>
										<button
											type='button'
											onClick={() => setShowPassword((p) => !p)}
											className='absolute right-[14px] top-1/2 -translate-y-1/2 flex items-center text-[#9999aa] hover:text-[#1a1a3e] transition-colors cursor-pointer bg-transparent border-none p-0'>
											<span className='material-symbols-outlined text-[18px]'>
												{showPassword ? "visibility_off" : "visibility"}
											</span>
										</button>
									</div>
									<div className='text-right mt-[6px]'>
										<a
											href='#'
											className='text-[0.78rem] text-[#b5965a] font-medium no-underline hover:underline underline-offset-2 transition-all'>
											Forgot Password?
										</a>
									</div>
								</div>
							</>
						) : (
							<>
								{/* Full Name */}
								<div>
									<label htmlFor='full-name' className={labelCls}>
										Full Name
									</label>
									<input
										id='full-name'
										name='full-name'
										type='text'
										placeholder='Lord Krishna'
										className={inputCls}
									/>
								</div>

								{/* Email */}
								<div>
									<label htmlFor='reg-email' className={labelCls}>
										Email Address
									</label>
									<input
										id='reg-email'
										name='reg-email'
										type='email'
										placeholder='krishna@vasanam.com'
										className={inputCls}
									/>
								</div>

								{/* Password */}
								<div>
									<label htmlFor='reg-password' className={labelCls}>
										Create Password
									</label>
									<input
										id='reg-password'
										name='reg-password'
										type='password'
										placeholder='Minimum 8 characters'
										className={inputCls}
									/>
								</div>
							</>
						)}

						{/* Submit button */}
						<button
							type='submit'
							className='w-full py-[15px] rounded-[10px] text-[#1a0e00] text-[0.95rem] font-bold tracking-[0.04em] cursor-pointer flex items-center justify-center gap-[10px] font-sans shadow-[0_4px_20px_rgba(181,150,90,0.4)] hover:scale-[1.02] hover:shadow-[0_6px_28px_rgba(181,150,90,0.55)] active:scale-95 transition-all duration-150'
							style={{
								background:
									"linear-gradient(135deg, #d4a843 0%, #c49430 40%, #b5801a 100%)",
							}}>
							<span>{isLoginMode ? "Sign In" : "Sign Up"}</span>
							<span className='material-symbols-outlined text-[20px]'>
								arrow_forward
							</span>
						</button>
					</form>

					{/* Divider */}
					<div className='relative my-5 text-center'>
						<div className='absolute top-1/2 left-0 right-0 h-px bg-[#d8d0c0]' />
						<span className='relative bg-[#f5f0e8] px-[14px] text-[0.68rem] font-semibold tracking-widest uppercase text-[#9999aa]'>
							Or continue with
						</span>
					</div>

					{/* Social buttons */}
					<div className='grid grid-cols-2 gap-3'>
						<button
							type='button'
							className='flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#d8d0c0] rounded-[10px] text-[0.85rem] font-semibold text-[#3c3c5a] cursor-pointer font-sans hover:bg-[#f0ece2] transition-colors duration-150'>
							<img src={Google} alt='Google' className='w-5 h-5' />
							Google
						</button>
						<button
							type='button'
							className='flex items-center justify-center gap-2 py-3 px-4 bg-white border border-[#d8d0c0] rounded-[10px] text-[0.85rem] font-semibold text-[#3c3c5a] cursor-pointer font-sans hover:bg-[#f0ece2] transition-colors duration-150'>
							<span className='material-symbols-outlined text-[18px]'>ios</span>
							Apple
						</button>
					</div>

					{/* Footer */}
					<p className='text-center mt-[22px] text-[0.87rem] text-[#6b6b8a]'>
						{isLoginMode
							? "Don't have an account?"
							: "Already have an account?"}{" "}
						<button
							type='button'
							onClick={toggleAuthMode}
							className='bg-transparent border-none cursor-pointer text-[0.87rem] font-bold text-[#1a1a3e] p-0 hover:underline underline-offset-2 transition-all font-sans'>
							{isLoginMode ? "Create an Account" : "Sign In"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
}
