/** @format */

import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AuthCallback() {
	useEffect(() => {
		const handleCallback = async () => {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error || !session?.access_token) {
				console.log(error?.message || "No session found");
				window.location.href = "/login";
				return;
			}

			const token = session.access_token;

			localStorage.setItem("supabaseToken", token);

			const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
			const res = await fetch(`${API_URL}/api/auth/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			const data = await res.json();

			if (!res.ok) {
				console.log(data.message);
				window.location.href = "/login";
				return;
			}

			localStorage.setItem("currentUser", JSON.stringify(data.user));

			if (data.user.role === "ADMIN") {
				window.location.href = "/admin/dashboard";
			} else {
				window.location.href = "/";
			}
		};

		handleCallback();
	}, []);

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<p>Signing you in...</p>
		</div>
	);
}