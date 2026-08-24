'use client'

import Link from "next/link";
import Footer from "@/app/components/ui/footer"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import LoginAPI from "@/app/lib/api/login"

import { useState } from "react";
import axios from "axios"; // Import axios

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);


    const router = useRouter(); // Initialize router
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setIsSubmitting(true);
        try {
            const response = await LoginAPI.loginUser(username, password);
            if (response.status === 200) {
                const data = response.data;
                setMessage("logged in successfully");
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                if (data.role) {
                    localStorage.setItem("userRole", String(data.role));
                } else if (data.roles) {
                    localStorage.setItem("userRole", Array.isArray(data.roles) ? data.roles.join(" ") : String(data.roles));
                }
                router.push("/pages/events"); // Navigate to events
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 401) {
                    // ✅ Properly access backend error
                    const backendMessage = error.response.data?.error || "Unauthorized";
                    setMessage(backendMessage);
                    console.log("Backend error:", backendMessage);
                } else {
                    setMessage("Something went wrong. Try again later.");
                }
            } else {
                setMessage("Unexpected error occurred.");
                console.error("Non-Axios error:", error);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="auth-page">
            <main className="auth-layout">
                <section className="auth-story">
                    <p className="eyebrow">Member space</p>
                    <h1>Welcome back to the circle.</h1>
                    <p>Sign in to keep up with the people, places, and moments shaping Manyu.</p>
                    <div className="auth-story__mark" aria-hidden="true">M</div>
                </section>
                <section className="auth-panel" aria-labelledby="login-title">
                    <p className="auth-panel__kicker">Member login</p>
                    <h2 id="login-title">Good to see you.</h2>
                    <p className="auth-panel__intro">Use your association account to continue.</p>
                    {message && <p className="auth-message" role="alert">{message}</p>}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" autoComplete="username" required />
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
                        <button className="auth-submit" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Signing in..." : "Sign in"}
                            {!isSubmitting && <span aria-hidden="true">↗</span>}
                        </button>
                    </form>
                    <p className="auth-register">New to Manyu? <Link href="/pages/register">Create an account <span aria-hidden="true">→</span></Link></p>
                </section>
            </main>
            <Footer />
        </div>);
}