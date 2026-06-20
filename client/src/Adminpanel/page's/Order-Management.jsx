import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import api from "../../services/api";
import toast from "react-hot-toast";

const PLACEHOLDER_IMAGE = "https://placehold.co/100x120?text=No+Image";

export default function OrderManagement() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrder, setSelectedOrder] = useState(null);

	// Status modification state
	const [editStatus, setEditStatus] = useState("PENDING");
	const [editPaymentStatus, setEditPaymentStatus] = useState("PENDING");
	const [editCourierName, setEditCourierName] = useState("");
	const [editTrackingId, setEditTrackingId] = useState("");

	const fetchOrders = useCallback(async () => {
		try {
			setLoading(true);
			const response = await api.get("/api/orders/admin/all");
			if (response.data.success) {
				setOrders(response.data.orders);
			}
		} catch (err) {
			console.error("Failed to fetch admin orders:", err);
			setError("Failed to load orders from database sanctuary.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;
		const load = async () => {
			await Promise.resolve();
			if (isMounted) {
				await fetchOrders();
			}
		};
		load();
		return () => { isMounted = false; };
	}, [fetchOrders]);

	const handleViewDetails = (order) => {
		setSelectedOrder(order);
		setEditStatus(order.orderStatus);
		setEditPaymentStatus(order.paymentStatus);
		setEditCourierName(order.courierName || "");
		setEditTrackingId(order.trackingId || "");
	};

	const orderIdParam = searchParams.get("orderId");

	useEffect(() => {
		if (orderIdParam && orders.length > 0) {
			const found = orders.find(o => o.id === orderIdParam);
			if (found && (!selectedOrder || selectedOrder.id !== found.id)) {
				const timer = setTimeout(() => {
					handleViewDetails(found);
				}, 0);
				return () => clearTimeout(timer);
			}
		}
	}, [orderIdParam, orders, selectedOrder]);

	const handleCloseModal = () => {
		setSelectedOrder(null);
		setSearchParams({});
	};

	const handleUpdateStatus = async (e) => {
		e.preventDefault();
		try {
			const response = await api.put(`/api/orders/admin/${selectedOrder.id}/status`, {
				orderStatus: editStatus,
				paymentStatus: editPaymentStatus,
				trackingId: editTrackingId,
				courierName: editCourierName,
			});
			if (response.data.success) {
				toast.success("Sacred Request timeline updated successfully!");
				handleCloseModal();
				fetchOrders();
			} else {
				toast.error("Failed to update timeline: " + response.data.message);
			}
		} catch (err) {
			console.error("Order status update error:", err);
			toast.error("Error updating order: " + (err.response?.data?.message || err.message));
		}
	};

	const filteredOrders = orders.filter((o) =>
		o.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
		o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(o.id && o.id.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	return (
		<div className='min-h-screen bg-surface font-sans text-on-surface flex'>
			<Sidebar activeTab="orders" />

			{/* MAIN CONTAINER */}
			<div className='flex-1 ml-64 flex flex-col min-h-screen bg-surface-container-lowest'>
				{/* TOP BAR: TopNavBar */}
				<Topbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search orders..." />

				{/* MAIN CONTENT AREA */}
				<main className='flex-1 max-w-7xl w-full mx-auto p-10 animate-fadeIn'>
					{/* Page Header */}
					<div className='flex justify-between items-end mb-10'>
						<div>
							<h2 className='font-serif text-4xl font-bold text-primary'>
								Sacred Orders
							</h2>
							<p className='text-on-surface-variant/80 mt-2 text-base font-sans'>
								Overseeing the flow of divine garments and artisanal crafts.
							</p>
						</div>
						<button
							onClick={() => toast("Exporting scrolls...")}
							className='flex items-center gap-2 px-6 py-3 rounded-xl border border-outline-variant/30 text-primary hover:bg-surface-container transition-all font-semibold text-sm cursor-pointer'>
							<span className='material-symbols-outlined' data-icon='file_download'>file_download</span>
							<span>Export Scroll</span>
						</button>
					</div>

					{/* Orders Table */}
					<div className='bg-surface rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden'>
						{loading ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center'>
								<span className='material-symbols-outlined text-[48px] text-tertiary animate-spin mb-4'>sync</span>
								<p className='text-on-surface-variant font-serif text-lg'>Retrieving orders ledger from database...</p>
							</div>
						) : error ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center border border-red-100'>
								<span className='material-symbols-outlined text-[48px] text-red-600 mb-4'>error</span>
								<p className='text-red-700 font-bold mb-2'>{error}</p>
							</div>
						) : filteredOrders.length === 0 ? (
							<div className='flex flex-col items-center justify-center p-20 bg-surface text-center'>
								<span className='material-symbols-outlined text-[48px] text-tertiary/50 mb-4'>eco</span>
								<h3 className='font-serif text-2xl text-primary font-bold mb-2'>No Orders Yet</h3>
								<p className='text-on-surface-variant max-w-sm'>All clear! No pending orders have been logged in the database sanctuary.</p>
							</div>
						) : (
							<div className='overflow-x-auto'>
								<table className='w-full text-left border-collapse'>
									<thead className='bg-surface-container text-on-surface-variant/80 font-semibold uppercase tracking-wider text-[11px] border-b border-outline-variant/20'>
										<tr>
											<th className='px-8 py-4'>Order Number</th>
											<th className='px-6 py-4'>Devotee Name</th>
											<th className='px-6 py-4'>Date</th>
											<th className='px-6 py-4'>Payment Status</th>
											<th className='px-6 py-4'>Total Amount</th>
											<th className='px-6 py-4'>Shipment Status</th>
											<th className='px-8 py-4 text-right'>Actions</th>
										</tr>
									</thead>
									<tbody className='divide-y divide-outline-variant/10'>
										{filteredOrders.map((order, idx) => {
											const initials = order.fullName.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2) || "KV";
											const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
											
											return (
												<tr key={order.id || idx} className='hover:bg-surface-container-low/40 transition-colors group'>
													<td className='px-8 py-5 font-bold text-primary'>{order.orderNumber}</td>
													<td className='px-6 py-5'>
														<div className='flex items-center gap-3'>
															<div className='w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-xs text-primary border border-tertiary-fixed/30'>
																{initials}
															</div>
															<span className='font-medium'>{order.fullName}</span>
														</div>
													</td>
													<td className='px-6 py-5 text-on-surface-variant/80 text-sm'>{orderDate}</td>
													<td className='px-6 py-5'>
														<span className={`px-2.5 py-0.5 rounded text-[10px] font-bold border uppercase ${
															order.paymentStatus === "PAID"
																? "bg-green-50 text-green-700 border-green-200"
																: "bg-red-50 text-red-700 border-red-200"
														}`}>
															{order.paymentStatus}
														</span>
													</td>
													<td className='px-6 py-5 font-bold text-primary'>₹{Number(order.finalAmount).toLocaleString("en-IN")}</td>
													<td className='px-6 py-5'>
														<span
															className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
																order.orderStatus === "DELIVERED"
																	? "bg-green-50 text-green-700 border border-green-200"
																	: order.orderStatus === "SHIPPED"
																	? "bg-blue-50 text-blue-700 border border-blue-200"
																	: "bg-amber-50 text-amber-700 border border-amber-200"
															}`}>
															<span className={`w-1.5 h-1.5 rounded-full ${order.orderStatus === "DELIVERED" ? "bg-green-500" : order.orderStatus === "SHIPPED" ? "bg-blue-500 animate-pulse" : "bg-amber-500"}`} />
															{order.orderStatus}
														</span>
													</td>
													<td className='px-8 py-5 text-right'>
														<button
															onClick={() => handleViewDetails(order)}
															className='text-primary font-bold text-sm hover:underline flex items-center gap-1 justify-end ml-auto group-hover:translate-x-1 transition-transform cursor-pointer'>
															<span>View Details</span>
															<span className='material-symbols-outlined text-sm'>arrow_forward</span>
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

					{/* Summary Asymmetric row */}
					{!loading && !error && (
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-12'>
							<div className='bg-primary text-tertiary-fixed p-8 rounded-2xl relative overflow-hidden shadow-md flex flex-col justify-between h-48'>
								<div>
									<p className='text-xs uppercase tracking-wider font-bold opacity-75 mb-2'>Total Treasury</p>
									<h4 className='font-serif text-3xl font-bold'>
										₹{orders
											.filter(o => o.paymentStatus === "PAID")
											.reduce((acc, o) => acc + Number(o.finalAmount), 0)
											.toLocaleString("en-IN")}
									</h4>
								</div>
								<div className='flex items-center gap-1 text-[10px] font-bold bg-[#2a1d00] px-3 py-1 rounded-full w-fit text-[#ffdfa0]'>
									<span className='material-symbols-outlined text-[10px]' data-icon='trending_up'>trending_up</span>
									<span>Active Payments Database</span>
								</div>
							</div>
							<div className='bg-surface p-8 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col justify-between h-48'>
								<div>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/70 mb-2'>Active Shipments</p>
									<h4 className='font-serif text-3xl font-bold text-primary'>
										{orders.filter(o => o.orderStatus === "SHIPPED").length} Dispatches
									</h4>
								</div>
								<p className='text-xs text-on-surface-variant/80'>En route via express logistics</p>
							</div>
							<div className='bg-[#F5EEDC] p-8 rounded-2xl border border-[#E7C96F]/30 shadow-sm flex flex-col justify-between h-48'>
								<div>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/70 mb-2'>Pending Blessings</p>
									<h4 className='font-serif text-3xl font-bold text-primary'>
										{orders.filter(o => o.orderStatus === "PENDING" || o.orderStatus === "CONFIRMED").length} Processings
									</h4>
								</div>
								<p className='text-xs text-on-surface-variant/80 italic'>Awaiting packaging & dispatch review.</p>
							</div>
						</div>
					)}
				</main>
			</div>

			{/* Order Detail Modal */}
			{selectedOrder && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn'>
					<div className='bg-surface w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh]'>
						<div className='p-6 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-low'>
							<h3 className='font-serif text-2xl font-bold text-primary'>Sacred Request {selectedOrder.orderNumber}</h3>
							<button onClick={handleCloseModal} className='text-outline-variant hover:text-primary focus:outline-none cursor-pointer'>
								<span className='material-symbols-outlined' data-icon='close'>close</span>
							</button>
						</div>

						{/* Modal Content Scroll */}
						<div className='p-6 space-y-6 overflow-y-auto flex-1'>
							{/* Cart Items List */}
							<div className='space-y-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10'>
								<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 border-b border-outline-variant/10 pb-2 mb-2'>
									Purchased Attire & Offerings ({selectedOrder.items?.length || 0})
								</p>
								<div className='divide-y divide-outline-variant/10 max-h-48 overflow-y-auto pr-2'>
									{(selectedOrder.items || []).map((item) => (
										<div key={item.id} className='flex items-center gap-4 py-3 first:pt-0 last:pb-0'>
											<div className='w-12 h-14 rounded overflow-hidden border border-outline-variant/25 bg-surface-container shrink-0'>
												<img className='w-full h-full object-cover' src={item.productImage || PLACEHOLDER_IMAGE} alt={item.productTitle} />
											</div>
											<div className='flex-1 min-w-0'>
												<h5 className='font-bold text-primary text-sm truncate'>{item.productTitle}</h5>
												<p className='text-xs text-on-surface-variant/70 mt-0.5'>Qty: {item.quantity} | Size: {item.size || "Standard"}</p>
											</div>
											<div className='text-right'>
												<p className='font-bold text-primary text-sm'>₹{Number(item.price).toLocaleString("en-IN")}</p>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Devotee Info & Dispatch Processing Form */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
								{/* Shipping Info */}
								<div className='bg-surface-container-low p-4 rounded-xl border border-outline-variant/10'>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 border-b border-outline-variant/10 pb-2 mb-3'>Patron & Shipping Address</p>
									<p className='font-bold text-primary mb-1'>{selectedOrder.fullName}</p>
									<p className='text-xs text-on-surface-variant/90 mb-2'>Phone: {selectedOrder.phone}</p>
									<p className='text-xs text-on-surface-variant/80 leading-relaxed bg-surface p-2.5 rounded border border-outline-variant/5'>
										{selectedOrder.addressLine}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}
									</p>
									{selectedOrder.trackingId && (
										<div className='mt-3 p-2.5 bg-blue-50 text-blue-800 text-xs rounded border border-blue-150 font-semibold'>
											<p>Courier: {selectedOrder.courierName || "Sacred Express"}</p>
											<p className='mt-0.5'>Tracking: {selectedOrder.trackingId}</p>
										</div>
									)}
								</div>

								{/* Timeline Override Form */}
								<form onSubmit={handleUpdateStatus} className='space-y-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/10'>
									<p className='text-xs uppercase tracking-wider font-bold text-on-surface-variant/80 border-b border-outline-variant/10 pb-2 mb-2'>Update Shipping Timeline</p>
									
									<div className='grid grid-cols-2 gap-3'>
										<div>
											<label className='block text-[10px] uppercase font-bold text-on-surface-variant/70 mb-1.5'>Order Status</label>
											<select 
												value={editStatus} 
												onChange={(e) => setEditStatus(e.target.value)}
												className='w-full bg-surface border border-outline-variant/20 rounded p-1.5 text-xs text-on-surface'
											>
												<option value="PENDING">Pending</option>
												<option value="CONFIRMED">Confirmed</option>
												<option value="PROCESSING">Processing</option>
												<option value="SHIPPED">Shipped</option>
												<option value="DELIVERED">Delivered</option>
												<option value="CANCELLED">Cancelled</option>
											</select>
										</div>
										
										<div>
											<label className='block text-[10px] uppercase font-bold text-on-surface-variant/70 mb-1.5'>Payment</label>
											<select 
												value={editPaymentStatus} 
												onChange={(e) => setEditPaymentStatus(e.target.value)}
												className='w-full bg-surface border border-outline-variant/20 rounded p-1.5 text-xs text-on-surface'
											>
												<option value="PENDING">Pending</option>
												<option value="PAID">Paid</option>
												<option value="FAILED">Failed</option>
												<option value="REFUNDED">Refunded</option>
											</select>
										</div>
									</div>

									<div className='grid grid-cols-2 gap-3'>
										<div>
											<label className='block text-[10px] uppercase font-bold text-on-surface-variant/70 mb-1.5'>Courier Name</label>
											<input 
												value={editCourierName}
												onChange={(e) => setEditCourierName(e.target.value)}
												placeholder='e.g. Delhivery'
												className='w-full bg-surface border border-outline-variant/20 rounded p-1.5 text-xs text-on-surface'
												type='text'
											/>
										</div>
										
										<div>
											<label className='block text-[10px] uppercase font-bold text-on-surface-variant/70 mb-1.5'>Tracking ID</label>
											<input 
												value={editTrackingId}
												onChange={(e) => setEditTrackingId(e.target.value)}
												placeholder='e.g. 789456123'
												className='w-full bg-surface border border-outline-variant/20 rounded p-1.5 text-xs text-on-surface'
												type='text'
											/>
										</div>
									</div>

									<button 
										type='submit'
										className='w-full bg-primary text-white text-xs font-bold py-2.5 rounded hover:bg-primary-container transition-all shadow active:scale-[0.98] mt-2 cursor-pointer'
									>
										Save Dispatch Modifications
									</button>
								</form>
							</div>
						</div>

						{/* Modal Footer */}
						<div className='p-5 bg-surface-container border-t border-outline-variant/15 flex justify-end gap-3'>
							<button onClick={handleCloseModal} className='px-5 py-2.5 text-xs text-primary font-bold hover:bg-surface-container-high rounded-lg transition-colors cursor-pointer'>
								Close Ledger
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
