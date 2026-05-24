import { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import api from "../../services/api";

export default function User() {
	const [devotees, setDevotees] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");

	const fetchDevotees = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/api/auth/admin/users");
			if (response.data.success) {
				setDevotees(response.data.users);
			}
		} catch (err) {
			console.error("Failed to fetch devotees:", err);
			setError("Failed to retrieve devotees scroll from the database sanctuary.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		const load = async () => {
			await Promise.resolve();
			if (isMounted) {
				await fetchDevotees();
			}
		};
		load();
		return () => { isMounted = false; };
	}, [fetchDevotees]);

	const handleToggleStatus = async (id, currentStatus) => {
		const actionWord = currentStatus ? "deactivate" : "activate";
		if (confirm(`Are you sure you want to ${actionWord} this devotee's access?`)) {
			try {
				const response = await api.put(`/api/auth/admin/users/${id}/status`, {
					isActive: !currentStatus,
				});
				if (response.data.success) {
					alert(`Devotee account successfully ${!currentStatus ? "activated" : "deactivated"}.`);
					fetchDevotees();
				} else {
					alert("Failed to modify account: " + response.data.message);
				}
			} catch (err) {
				console.error("User status toggle error:", err);
				alert("Error toggling status: " + (err.response?.data?.message || err.message));
			}
		}
	};

	const filteredDevotees = devotees.filter((d) =>
		d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(d.email && d.email.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	// Calculate overall metrics
	const totalSpendings = devotees.reduce((acc, d) => acc + Number(d.totalSpend || 0), 0);
	const eternalCount = devotees.filter(d => Number(d.totalSpend || 0) >= 100000).length;

	return (
		<div className='min-h-screen bg-surface font-sans text-on-surface flex'>
			<Sidebar activeTab="users" />

			{/* MAIN CONTAINER */}
			<div className='flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest'>
				<Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search devotees by name or soul essence..." />

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-10 animate-fadeIn'>
					{/* Page Header */}
					<div className='mb-10 flex justify-between items-end'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>Sacred Devotees</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								Managing the souls who find sanctuary in our collections.
							</p>
						</div>
						<div className='flex gap-4'>
							<button onClick={() => alert("Exporting devotees scroll...")} className='px-6 py-3 border border-outline-variant/30 rounded-xl text-primary font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2 text-sm cursor-pointer'>
								<span className='material-symbols-outlined' data-icon='download'>download</span>
								<span>Export Scroll</span>
							</button>
						</div>
					</div>

					{/* Metrics Grid */}
					{!loading && !error && (
						<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
							{[
								{ title: "Total Souls", value: devotees.length.toString(), icon: "group", change: "Live DB", bg: "bg-surface-bright" },
								{ title: "Eternal Members", value: eternalCount.toString(), icon: "stars", change: "₹1L+ Offering", bg: "bg-surface-bright" },
								{ title: "Total Offerings", value: `₹${totalSpendings.toLocaleString("en-IN")}`, icon: "payments", change: "Gross", bg: "bg-surface-bright" },
								{ title: "Active Accounts", value: devotees.filter(d => d.isActive).length.toString(), icon: "loyalty", change: `${devotees.filter(d => !d.isActive).length} Blocked`, bg: "bg-surface-bright" },
							].map((metric, idx) => (
								<div
									key={idx}
									className={`p-6 rounded-2xl border border-outline-variant/20 shadow-sm transition-all duration-300 hover:border-tertiary-fixed ${metric.bg} group cursor-pointer`}>
									<div className='flex justify-between items-start mb-4'>
										<div className='p-3 bg-primary-container rounded-xl text-tertiary-fixed group-hover:bg-primary transition-colors duration-300'>
											<span className='material-symbols-outlined'>{metric.icon}</span>
										</div>
										<span className='text-on-tertiary-container text-[10px] font-bold bg-tertiary-fixed px-2 py-0.5 rounded-full'>
											{metric.change}
										</span>
									</div>
									<p className='text-on-surface-variant/70 text-xs font-semibold uppercase tracking-widest'>{metric.title}</p>
									<h3 className='font-serif text-3xl font-bold text-primary mt-2'>{metric.value}</h3>
								</div>
							))}
						</div>
					)}

					{/* Devotees Table */}
					<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
						<div className='px-8 py-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30'>
							<h4 className='font-serif text-2xl font-bold text-primary'>Devotee Directory</h4>
						</div>

						{loading ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center'>
								<span className='material-symbols-outlined text-[48px] text-tertiary animate-spin mb-4'>sync</span>
								<p className='text-on-surface-variant font-serif text-lg'>Retrieving devotee directory from database sanctuary...</p>
							</div>
						) : error ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center border border-red-100'>
								<span className='material-symbols-outlined text-[48px] text-red-600 mb-4'>error</span>
								<p className='text-red-700 font-bold mb-2'>{error}</p>
							</div>
						) : filteredDevotees.length === 0 ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center'>
								<span className='material-symbols-outlined text-[48px] text-tertiary/50 mb-4'>person</span>
								<h3 className='font-serif text-2xl text-primary font-bold mb-2'>No Devotees Found</h3>
								<p className='text-on-surface-variant max-w-sm'>No customer accounts are registered in the system yet.</p>
							</div>
						) : (
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse'>
									<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
										<tr>
											<th className='px-8 py-4'>Devotee</th>
											<th className='px-8 py-4'>Email Essence</th>
											<th className='px-8 py-4 text-center'>Sacred Orders</th>
											<th className='px-8 py-4'>Total Offering</th>
											<th className='px-8 py-4'>Spiritual Tier</th>
											<th className='px-8 py-4'>Account Status</th>
											<th className='px-8 py-4 text-right'>Actions</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-outline-variant/10'>
										{filteredDevotees.map((devotee, idx) => {
											const initials = devotee.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) || "KV";
											
											// Dynamic Tier Calculation
											let tier = "Seeker";
											if (Number(devotee.totalSpend) >= 100000) {
												tier = "Eternal";
											} else if (Number(devotee.totalSpend) >= 20000) {
												tier = "Devoted";
											}

											return (
												<tr key={devotee.id || idx} className='hover:bg-surface-container-low/40 transition-colors'>
													<td className='px-8 py-5'>
														<div className='flex items-center gap-4'>
															<div className='w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary border border-tertiary-fixed/30 shadow-sm'>
																{initials}
															</div>
															<span className='font-semibold text-primary'>{devotee.name}</span>
														</div>
													</td>
													<td className='px-8 py-5 text-on-surface-variant/80 text-sm'>{devotee.email || "No email registered"}</td>
													<td className='px-8 py-5 text-center font-medium'>{devotee.ordersCount}</td>
													<td className='px-8 py-5 font-semibold text-primary'>₹{Number(devotee.totalSpend).toLocaleString("en-IN")}</td>
													<td className='px-8 py-5'>
														<span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
															tier === "Eternal"
																? "bg-primary text-tertiary-fixed"
																: tier === "Devoted"
																? "bg-secondary-container text-on-secondary-container"
																: "bg-surface-container-highest text-on-surface-variant"
														}`}>
															{tier}
														</span>
													</td>
													<td className='px-8 py-5'>
														<span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
															devotee.isActive 
																? "bg-green-50 text-green-700 border border-green-200" 
																: "bg-red-50 text-red-700 border border-red-200"
														}`}>
															<span className={`w-1.5 h-1.5 rounded-full ${devotee.isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
															{devotee.isActive ? "Active" : "Suspended"}
														</span>
													</td>
													<td className='px-8 py-5 text-right'>
														<button
															onClick={() => handleToggleStatus(devotee.id, devotee.isActive)}
															className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
																devotee.isActive 
																	? "border-red-200 text-red-600 hover:bg-red-50" 
																	: "border-green-200 text-green-700 hover:bg-green-50"
															} cursor-pointer`}
														>
															{devotee.isActive ? "Deactivate" : "Activate"}
														</button>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
