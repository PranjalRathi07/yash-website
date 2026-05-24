/** @format */

import { Routes, Route } from "react-router-dom";

import Collection from "../pages/Collection";
import Productdetails from "../pages/Productdetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Wishlist from "../pages/Wishlist";
import Contact from "../pages/Contact";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Sizeguide from "../pages/Sizeguide";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import ProfileDashboard from "../pages/ProfileDashboard";
import FestivalWear from "../pages/Festivalwear";
import NewArrivals from "../pages/Newarrivals";
import MyOrders from "../pages/Myorder";
import SavedAddresses from "../pages/Address";
import Account from "../pages/Account";
import ShippingReturns from "../pages/Shipping-return";
import PrivacyPolicy from "../pages/Privacy-Policy";
import CareGuide from "../pages/Care-guide";
import OurStory from "../pages/Ourstory";
import Login from "../pages/Login";
import AuthCallback from "../pages/AuthCallback";
import Dashboard from "../Adminpanel/page's/Dashboard";
import ProductManagement from "../Adminpanel/page's/Product-Management";
import OrderManagement from "../Adminpanel/page's/Order-Management";
import User from "../Adminpanel/page's/User";
import Banners from "../Adminpanel/page's/Banners";

function AppRoutes() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/collection' element={<Collection />} />
			<Route path='/new-arrivals' element={<NewArrivals />} />
			<Route path='/festive-wear' element={<FestivalWear />} />
			<Route path='/product/:id' element={<Productdetails />} />
			<Route path='/cart' element={<Cart />}>
				<Route path='checkout' element={<Checkout />} />
			</Route>
			<Route path='/wishlist' element={<Wishlist />} />
			<Route path='/contact' element={<Contact />} />
			<Route path='/about' element={<About />} />
			<Route path='/faq' element={<FAQ />} />
			<Route path='/size-guide' element={<Sizeguide />} />
			<Route path='/profile' element={<Profile />}>
				<Route index element={<ProfileDashboard />} />
				<Route path='my-orders' element={<MyOrders />} />
				<Route path='wishlist' element={<Wishlist />} />
				<Route path='addresses' element={<SavedAddresses />} />
				<Route path='account-settings' element={<Account />} />
			</Route>
			<Route path='/shipping-returns' element={<ShippingReturns />} />
			<Route path='/privacy-policy' element={<PrivacyPolicy />} />
			<Route path='/care-guide' element={<CareGuide />} />
			<Route path='/our-story' element={<OurStory />} />
			<Route path='/login' element={<Login />} />
			<Route path="/auth/callback" element={<AuthCallback />} />
			<Route path="/admin" element={<Dashboard />} />
			<Route path="/admin/dashboard" element={<Dashboard />} />
			<Route path="/admin/products" element={<ProductManagement />} />
			<Route path="/admin/orders" element={<OrderManagement />} />
			<Route path="/admin/users" element={<User />} />
			<Route path="/admin/banners" element={<Banners />} />
		</Routes>
	);
}

export default AppRoutes;
