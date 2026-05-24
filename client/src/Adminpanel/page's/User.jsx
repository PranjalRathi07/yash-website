/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const INITIAL_DEVOTEES = [
	{
		name: "Ananya Iyer",
		email: "ananya.i@vasanam.com",
		orders: 42,
		offering: "₹1,45,200",
		tier: "Eternal",
		avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWCnMOT25dvGtLW3Bz8VfpyUQTl3KfgMYnxZQvGpvBJoBvcw1hbWl_tj-GnfJb6r6PqNHQTo_lXoOMgLPmwSor1lDIegHFC4nS14YTQCKt3Hrc5vJo1SxKOgowuNzz85uRKd6UooKtn0_0QJ8crl0tG-jaH60lyXEaEU7M6n45xRDuNkanzqP8BKEEdBXT9A99qjfLh2l6iGMVorb53T6weYtd9LnW9pLOSuwgnzCU880cx_goa2bNikYHMCBGHd7T9bGia0aMTVQl",
	},
	{
		name: "Rohan Sharma",
		email: "rohan.sharma@essence.in",
		orders: 18,
		offering: "₹68,500",
		tier: "Devoted",
		avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsBhdkz0kyrt31qLl5rdBOxQV103Jfe3b9TUjqTvvIm9d-hW8_wjnQ2qL9It7umTHQzPoTdwy-RTiZeee-f0AO3u-j9sxkZPyJV5faG-I--CeGEVqHnL0rMW92CEGpuGy4nrkxL-4SK1LdTZpbN9d1Ye3OfnA7WFRGHhbwqkaetonEefIRSpraRYSyvvCLyvFSM4m3H2719Qt8o3-VYO7ROj-W7LXhr979RsscmWx3bwSAgwoukaKL7xYkYPrbp0Mr6srw_NqZyZJ8",
	},
	{
		name: "Meera Kapoor",
		email: "meera.k@temple.org",
		orders: 12,
		offering: "₹34,100",
		tier: "Seeker",
		avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7pEhRNTJu2ZPjx3xRhPlOwRgt-3J-JaxGWnpzVENkLrug2HOo2aqJiwFeGA2OCvxD6eXxUzGgu7StbELxpfYpLEGBzqrY93e1raIOHgyFYyqsWsI5iu8uW0aEjNOoql-FquEkKBbgFlaCf5lw1NeNn5c5lbK2dDgRW4dmQ1YHPbBztoW9-zcFJvHYNpVR0X7jNmY3P2tShaPizqls9DVuDpiV0uZs3tozjtJg0HrRvosrNIzaIkqwkzFOO2von2fhXqLChbS2VNxg",
	},
	{
		name: "Arjun Varma",
		email: "arjun.v@spiritual.com",
		orders: 56,
		offering: "₹2,10,400",
		tier: "Eternal",
		avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDABRX5IyH1SI-dTMK463X4Kb_V3JHfnULCjibHg0HAljJMfAX7QslSApdrZC0eCCIerzg63eUQ-GX5UZSnRAkslNb-eUVic5J61GuBPUPUZcXMjoKG7ndS7WL9OP2Zp9ohYDF6bmyEGXTMjATkn0hJ72KNFJ9BoJa_E0DUmELOt9u7VzEapnF1EoiLgiJEz8ERrbZM0f1yKmHCZ07jBYfT_ICY7LNTOiLlx6oIaZJ1wPx8TDXh6wN0ItWuLlHq5V0svDK0mMBUQOfH",
	},
	{
		name: "Saanvi Reddy",
		email: "saanvi@grace.in",
		orders: 29,
		offering: "₹94,000",
		tier: "Devoted",
		avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4hHQi06MqexCBZ6yGhTNYvV9Oxh1Y4FtIB-xmI3EcVoNHukVvWlun1BwXT1igp3EUlr8esTDTLvWrkQNcEVusVDfNnxErd-a9Mxc1MQRmrXJZp9w8JDyBsAhF7eF0q7i14xk4RqwlajQy63-Vp2mbNcbiuM8mvN2B5BJBCVksJmMK6xXSBQLHuZULBGb5r31VvzGC4HDPb1wje3LrKwppnL4_WyKh1q5SQu-YWtUY8h0LLXT2dMfmJeU25jU4Le8XQAWN0TvUzgRU",
	},
];

export default function User() {
	const navigate = useNavigate();
	const [devotees] = useState(INITIAL_DEVOTEES);
	const [searchQuery, setSearchQuery] = useState("");

	const filteredDevotees = devotees.filter((d) =>
		d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		d.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
		d.tier.toLowerCase().includes(searchQuery.toLowerCase())
	);

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
							<button onClick={() => alert("Exporting devotees scroll...")} className='px-6 py-3 border border-outline-variant/30 rounded-xl text-primary font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-2 text-sm'>
								<span className='material-symbols-outlined' data-icon='download'>download</span>
								<span>Export Scroll</span>
							</button>
							<button onClick={() => alert("Inviting devotee...")} className='px-6 py-3 bg-primary text-tertiary-fixed rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 text-sm'>
								<span className='material-symbols-outlined' data-icon='person_add'>person_add</span>
								<span>Invite Devotee</span>
							</button>
						</div>
					</div>

					{/* Metrics Grid */}
					<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
						{[
							{ title: "Total Souls", value: "12,842", icon: "group", change: "+12%", bg: "bg-surface-bright" },
							{ title: "Eternal Members", value: "1,205", icon: "stars", change: "Elite", bg: "bg-surface-bright" },
							{ title: "Avg. Spend", value: "₹4,250", icon: "payments", change: "+5%", bg: "bg-surface-bright" },
							{ title: "Retention Rate", value: "94.2%", icon: "loyalty", change: "High", bg: "bg-surface-bright" },
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

					{/* Devotees Table */}
					<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
						<div className='px-8 py-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container/30'>
							<h4 className='font-serif text-2xl font-bold text-primary'>Devotee Directory</h4>
						</div>
						<div className='overflow-x-auto'>
							<table className='w-full text-left border-collapse'>
								<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
									<tr>
										<th className='px-8 py-4'>Devotee</th>
										<th className='px-8 py-4'>Email Essence</th>
										<th className='px-8 py-4 text-center'>Sacred Orders</th>
										<th className='px-8 py-4'>Total Offering</th>
										<th className='px-8 py-4'>Spiritual Tier</th>
										<th className='px-8 py-4 text-right'>Actions</th>
									</tr>
								</thead>
								<tbody className='divide-y divide-outline-variant/10'>
									{filteredDevotees.map((devotee, idx) => (
										<tr key={idx} className='hover:bg-surface-container-low/40 transition-colors'>
											<td className='px-8 py-5'>
												<div className='flex items-center gap-4'>
													<img className='w-10 h-10 rounded-full object-cover shadow-sm' src={devotee.avatar} alt={devotee.name} />
													<span className='font-semibold text-primary'>{devotee.name}</span>
												</div>
											</td>
											<td className='px-8 py-5 text-on-surface-variant/80 text-sm'>{devotee.email}</td>
											<td className='px-8 py-5 text-center font-medium'>{devotee.orders}</td>
											<td className='px-8 py-5 font-semibold text-primary'>{devotee.offering}</td>
											<td className='px-8 py-5'>
												<span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full ${
													devotee.tier === "Eternal"
														? "bg-primary text-tertiary-fixed"
														: devotee.tier === "Devoted"
														? "bg-secondary-container text-on-secondary-container"
														: "bg-surface-container-highest text-on-surface-variant"
												}`}>
													{devotee.tier}
												</span>
											</td>
											<td className='px-8 py-5 text-right'>
												<button
													onClick={() => alert(`Managing profile for ${devotee.name}`)}
													className='p-2 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded-lg transition-colors focus:outline-none'>
													<span className='material-symbols-outlined'>more_vert</span>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
