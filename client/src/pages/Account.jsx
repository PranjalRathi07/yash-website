/** @format */
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../services/api";
import { supabase } from "../lib/supabase";

export default function AccountSettings() {
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

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

	const [saveSuccess, setSaveSuccess] = useState(false);
	const [saveError, setSaveError] = useState("");

	const updateProfileMutation = useMutation({
		mutationFn: async (payload) => {
			const res = await api.put("/api/auth/profile", payload);
			return res.data;
		},
		onSuccess: (data) => {
			setSaveSuccess(true);
			setSaveError("");
			if (data.user) {
				localStorage.setItem("currentUser", JSON.stringify(data.user));
			}
			setTimeout(() => setSaveSuccess(false), 3000);
		},
		onError: (err) => {
			setSaveError(err.response?.data?.message || "Failed to save sacred changes.");
			setTimeout(() => setSaveError(""), 5000);
		}
	});

	const handleSaveChanges = () => {
		const name = document.getElementById("full_name").value;
		const email = document.getElementById("email").value;
		const phone = document.getElementById("phone").value;

		updateProfileMutation.mutate({ name, email, phone });
	};

	const uploadProfilePicMutation = useMutation({
		mutationFn: async (file) => {
			const formData = new FormData();
			formData.append("profilePic", file);
			const res = await api.put("/api/auth/profile/picture", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			return res.data;
		},
		onSuccess: (data) => {
			setSaveSuccess(true);
			setSaveError("");
			if (data.user) {
				localStorage.setItem("currentUser", JSON.stringify(data.user));
			}
			setTimeout(() => setSaveSuccess(false), 3000);
		},
		onError: (err) => {
			setSaveError(err.response?.data?.message || "Failed to upload portrait.");
			setTimeout(() => setSaveError(""), 5000);
		}
	});

	const handleProfilePicUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			uploadProfilePicMutation.mutate(file);
		}
	};

	const triggerUpload = () => {
		document.getElementById("profile_pic_input").click();
	};

	const [securitySuccess, setSecuritySuccess] = useState(false);
	const [securityError, setSecurityError] = useState("");

	const updatePasswordMutation = useMutation({
		mutationFn: async (newPassword) => {
			const { data, error } = await supabase.auth.updateUser({
				password: newPassword,
			});
			if (error) throw error;
			return data;
		},
		onSuccess: () => {
			setSecuritySuccess(true);
			setSecurityError("");
			document.getElementById("current_password").value = "";
			document.getElementById("new_password").value = "";
			document.getElementById("confirm_password").value = "";
			setTimeout(() => setSecuritySuccess(false), 3000);
		},
		onError: (err) => {
			setSecurityError(err.message || "Failed to update sacred password.");
			setTimeout(() => setSecurityError(""), 5000);
		}
	});

	const handleUpdateSecurity = () => {
		const newPassword = document.getElementById("new_password").value;
		const confirmPassword = document.getElementById("confirm_password").value;

		if (!newPassword || newPassword.length < 8) {
			setSecurityError("New password must be at least 8 characters.");
			setTimeout(() => setSecurityError(""), 5000);
			return;
		}

		if (newPassword !== confirmPassword) {
			setSecurityError("New passwords do not match.");
			setTimeout(() => setSecurityError(""), 5000);
			return;
		}

		updatePasswordMutation.mutate(newPassword);
	};

	const [notifications, setNotifications] = useState({
		email: true,
		sms: false,
		whatsapp: true,
	});

	const toggleNotificationMutation = useMutation({
		mutationFn: async (key) => {
			// Simulating API latency
			await new Promise((resolve) => setTimeout(resolve, 600));
			return key;
		},
		onSuccess: (key) => {
			setNotifications((prev) => ({
				...prev,
				[key]: !prev[key],
			}));
		},
	});

	return (
		<div className='bg-surface text-on-surface font-sans antialiased min-h-screen flex flex-col'>
			<main className='grow w-full max-w-container-max-width mx-auto px-edge-margin py-12 flex gap-8'>
				{/* Content Area */}
				<div className='grow space-y-12'>
					{/* Heading */}
					<div className='mb-8'>
						<h1 className='font-serif text-5xl text-primary'>
							Account Settings
						</h1>
						<p className='font-sans text-base text-on-surface-variant mt-2'>
							Tailor your experience and secure your journey with Divine Minimalist Couture.
						</p>
					</div>

					{/* Personal Information Section */}
					<section className='bg-surface border-[0.5px] border-tertiary/20 rounded-md p-8 shadow-sm relative'>
						<div className='flex items-center gap-4 mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='person_outline'>
								person_outline
							</span>
							<h2 className='font-serif text-3xl font-bold text-primary tracking-wide'>
								Personal Information
							</h2>
						</div>

						{saveSuccess && (
							<div className='mb-6 p-4 bg-green-50 text-green-700 text-sm font-sans rounded-md border border-green-200 flex items-center gap-2 animate-fadeIn'>
								<span className='material-symbols-outlined text-[18px]'>check_circle</span>
								Sacred changes saved successfully in the sanctuary registry.
							</div>
						)}
						{saveError && (
							<div className='mb-6 p-4 bg-red-50 text-red-700 text-sm font-sans rounded-md border border-red-200 flex items-center gap-2 animate-fadeIn'>
								<span className='material-symbols-outlined text-[18px]'>error</span>
								{saveError}
							</div>
						)}

						<div className='flex flex-col md:flex-row gap-12'>
							<div className='shrink-0 flex flex-col items-center gap-4'>
								<div className='relative group cursor-pointer' onClick={triggerUpload}>
									{currentUser?.profilePic ? (
										<img
											alt='Profile'
											className='w-32 h-32 rounded-full object-cover border-[3px] border-surface shadow-md'
											src={currentUser.profilePic}
										/>
									) : (
										<div className='w-32 h-32 rounded-full border-[3px] border-surface shadow-md p-1 flex items-center justify-center bg-surface-container-low'>
											<div className='w-full h-full rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary'>
												<span className='material-symbols-outlined text-[48px]'>person</span>
											</div>
										</div>
									)}
									<button
										type='button'
										className='absolute bottom-0 right-0 bg-tertiary text-surface p-2 rounded-full shadow-lg hover:bg-tertiary/90 transition-all flex items-center justify-center cursor-pointer'>
										<span className='material-symbols-outlined text-[16px]'>
											edit
										</span>
									</button>
									<input
										id='profile_pic_input'
										type='file'
										accept='image/*'
										className='hidden'
										onChange={handleProfilePicUpload}
									/>
								</div>
								<span
									onClick={triggerUpload}
									className='font-sans text-xs font-medium text-primary hover:underline cursor-pointer'>
									{uploadProfilePicMutation.isPending ? "Uploading..." : "Update Portrait"}
								</span>
							</div>

							<div className='grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6'>
								<div className='space-y-2'>
									<label
										className='font-sans text-sm font-semibold text-primary/80'
										htmlFor='full_name'>
										Full Name
									</label>
									<input
										id='full_name'
										key={currentUser?.id ? `name-${currentUser.id}` : "name-loading"}
										className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
										type='text'
										defaultValue={currentUser?.name || ""}
									/>
								</div>
								<div className='space-y-2'>
									<label
										className='font-sans text-sm font-semibold text-primary/80'
										htmlFor='email'>
										Email Address
									</label>
									<input
										id='email'
										key={currentUser?.id ? `email-${currentUser.id}` : "email-loading"}
										className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
										type='email'
										defaultValue={currentUser?.email || ""}
									/>
								</div>
								<div className='space-y-2'>
									<label
										className='font-sans text-sm font-semibold text-primary/80'
										htmlFor='phone'>
										Phone Number
									</label>
									<input
										id='phone'
										key={currentUser?.id ? `phone-${currentUser.id}` : "phone-loading"}
										className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
										type='tel'
										defaultValue={currentUser?.phone || ""}
									/>
								</div>
								<div className='space-y-2'>
									<label
										className='font-sans text-sm font-semibold text-primary/80'
										htmlFor='dob'>
										Date of Birth
									</label>
									<input
										id='dob'
										className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors relative'
										type='date'
										defaultValue='1990-08-15'
									/>
								</div>
							</div>
						</div>

						<div className='mt-8 flex justify-end'>
							<button
								type='button'
								onClick={handleSaveChanges}
								disabled={updateProfileMutation.isPending}
								className='bg-linear-to-r from-tertiary/90 via-tertiary to-tertiary/90 text-primary font-sans text-xs font-bold px-8 py-3 rounded-md uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer'>
								{updateProfileMutation.isPending ? "Saving Changes..." : "Save Personal Changes"}
							</button>
						</div>
					</section>

					{/* Security Section */}
					<section className='bg-surface border-[0.5px] border-tertiary/20 rounded-md p-8 shadow-sm'>
						<div className='flex items-center gap-4 mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='security'>
								security
							</span>
							<h2 className='font-serif text-3xl font-bold text-primary tracking-wide'>
								Security &amp; Access
							</h2>
						</div>

						{securitySuccess && (
							<div className='mb-6 p-4 bg-green-50 text-green-700 text-sm font-sans rounded-md border border-green-200 flex items-center gap-2 animate-fadeIn'>
								<span className='material-symbols-outlined text-[18px]'>check_circle</span>
								Sacred password updated successfully.
							</div>
						)}
						{securityError && (
							<div className='mb-6 p-4 bg-red-50 text-red-700 text-sm font-sans rounded-md border border-red-200 flex items-center gap-2 animate-fadeIn'>
								<span className='material-symbols-outlined text-[18px]'>error</span>
								{securityError}
							</div>
						)}

						<div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
							<div className='space-y-6'>
								<h3 className='font-serif text-xl font-medium text-primary'>
									Change Password
								</h3>
								<div className='space-y-4'>
									<div className='space-y-2'>
										<label
											className='font-sans text-sm font-semibold text-primary/80'
											htmlFor='current_password'>
											Current Password
										</label>
										<input
											id='current_password'
											className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
											placeholder='••••••••'
											type='password'
										/>
									</div>
									<div className='space-y-2'>
										<label
											className='font-sans text-sm font-semibold text-primary/80'
											htmlFor='new_password'>
											New Password
										</label>
										<input
											id='new_password'
											className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
											placeholder='Minimum 8 characters'
											type='password'
										/>
									</div>
									<div className='space-y-2'>
										<label
											className='font-sans text-sm font-semibold text-primary/80'
											htmlFor='confirm_password'>
											Confirm New Password
										</label>
										<input
											id='confirm_password'
											className='w-full bg-[#fdfaf5] border-[0.5px] border-tertiary/30 rounded-md p-3 text-primary font-sans text-sm focus:outline-none focus:border-tertiary transition-colors'
											placeholder='Confirm selection'
											type='password'
										/>
									</div>
								</div>
							</div>

							<div className='space-y-6'>
								<h3 className='font-serif text-xl font-medium text-primary'>
									Authenticity Protection
								</h3>
								<div className='bg-surface p-6 rounded-md border-[0.5px] border-tertiary/20'>
									<div className='flex justify-between items-start mb-4'>
										<div>
											<p className='font-sans text-sm font-bold text-primary'>
												Two-Factor Authentication
											</p>
											<p className='font-sans text-xs text-on-surface-variant mt-1'>
												Add an extra layer of security to your sacred account.
											</p>
										</div>
										<button
											type='button'
											onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
											className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${twoFactorEnabled ? "bg-tertiary/40" : "bg-tertiary/10"}`}>
											<span className={`inline-block h-4 w-4 transform rounded-full bg-tertiary transition-transform ${twoFactorEnabled ? "translate-x-6" : "translate-x-1"}`} />
										</button>
									</div>
									<div className='flex items-center gap-2 text-tertiary text-xs font-semibold uppercase tracking-widest'>
										<span
											className='material-symbols-outlined text-[16px]'
											data-icon='verified_user'>
											verified_user
										</span>
										<span>Highly Recommended</span>
									</div>
								</div>
							</div>
						</div>

						<div className='mt-8 flex justify-end'>
							<button
								type='button'
								onClick={handleUpdateSecurity}
								disabled={updatePasswordMutation.isPending}
								className='bg-linear-to-r from-tertiary/90 via-tertiary to-tertiary/90 text-primary font-sans text-xs font-bold px-8 py-3 rounded-md uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer'>
								{updatePasswordMutation.isPending ? "Updating Security..." : "Update Security"}
							</button>
						</div>
					</section>

					{/* Notifications Section */}
					<section className='bg-surface border-[0.5px] border-tertiary/20 rounded-md p-8 shadow-sm'>
						<div className='flex items-center gap-4 mb-8 border-b-[0.5px] border-tertiary/20 pb-4'>
							<span
								className='material-symbols-outlined text-tertiary'
								data-icon='notifications'>
								notifications
							</span>
							<h2 className='font-serif text-3xl font-bold text-primary tracking-wide'>
								Notification Preferences
							</h2>
						</div>

						<div className='divide-y divide-tertiary/20'>
							<div className='py-4 flex justify-between items-center'>
								<div>
									<p className='font-sans text-sm font-bold text-primary'>
										Email Updates
									</p>
									<p className='font-sans text-sm text-on-surface-variant'>
										Receive newsletters and order confirmations via email.
									</p>
								</div>
								<button
									type='button'
									onClick={() => toggleNotificationMutation.mutate('email')}
									disabled={toggleNotificationMutation.isPending}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.email ? 'bg-tertiary' : 'bg-tertiary/20'} ${toggleNotificationMutation.isPending ? 'opacity-50' : ''}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className='py-4 flex justify-between items-center'>
								<div>
									<p className='font-sans text-sm font-bold text-primary'>
										SMS Alerts
									</p>
									<p className='font-sans text-sm text-on-surface-variant'>
										Get instant delivery updates and flash sale alerts.
									</p>
								</div>
								<button
									type='button'
									onClick={() => toggleNotificationMutation.mutate('sms')}
									disabled={toggleNotificationMutation.isPending}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.sms ? 'bg-tertiary' : 'bg-tertiary/20'} ${toggleNotificationMutation.isPending ? 'opacity-50' : ''}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>

							<div className='py-4 flex justify-between items-center'>
								<div>
									<p className='font-sans text-sm font-bold text-primary'>
										WhatsApp Concierge
									</p>
									<p className='font-sans text-sm text-on-surface-variant'>
										Personalized styling advice and support via WhatsApp.
									</p>
								</div>
								<button
									type='button'
									onClick={() => toggleNotificationMutation.mutate('whatsapp')}
									disabled={toggleNotificationMutation.isPending}
									className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications.whatsapp ? 'bg-tertiary' : 'bg-tertiary/20'} ${toggleNotificationMutation.isPending ? 'opacity-50' : ''}`}>
									<span className={`inline-block h-4 w-4 transform rounded-full bg-surface transition-transform ${notifications.whatsapp ? 'translate-x-6' : 'translate-x-1'}`} />
								</button>
							</div>
						</div>
					</section>

					{/* Danger Zone Section */}
					<section className='bg-error/5 border-[0.5px] border-error/20 rounded-md p-8 shadow-sm'>
						<div className='flex items-center justify-between'>
							<div>
								<h2 className='font-serif text-2xl font-medium text-error'>
									Deactivate Account
								</h2>
								<p className='font-sans text-sm text-on-surface-variant mt-1'>
									Temporarily disable your account. Your data will be preserved
									but your profile will be hidden.
								</p>
							</div>
							<button
								type='button'
								className='text-error font-sans text-sm font-bold uppercase tracking-widest hover:underline transition-all'>
								Deactivate Account
							</button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
