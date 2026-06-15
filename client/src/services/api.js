/** @format */

import axios from "axios";
import { supabase } from "../lib/supabase";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
});

api.interceptors.request.use(
	async (config) => {
		try {
			// Get fresh session from Supabase (handles auto-refresh)
			const { data: { session } } = await supabase.auth.getSession();
			
			const token = session?.access_token || localStorage.getItem("supabaseToken");
			
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
				
				// Keep local storage in sync
				if (session?.access_token) {
					localStorage.setItem("supabaseToken", session.access_token);
				}
			}
		} catch (error) {
			console.error("Error getting session in interceptor:", error);
			// Fallback to local storage
			const fallbackToken = localStorage.getItem("supabaseToken");
			if (fallbackToken) {
				config.headers.Authorization = `Bearer ${fallbackToken}`;
			}
		}
		
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response && error.response.status === 401) {
			// Token is invalid or expired and could not be refreshed
			localStorage.removeItem("supabaseToken");
			localStorage.removeItem("currentUser");
			
			// Sign out from Supabase client as well
			await supabase.auth.signOut();
			
			// Redirect to login if not already there
			if (window.location.pathname !== "/login") {
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default api;
