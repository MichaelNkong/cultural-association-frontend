'use client';

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ProfileAPI from "@/app/lib/api/profile";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem("token")));
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await ProfileAPI.logoutUser();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("userRole");
            setIsLoggedIn(false);
            router.push("/pages/login");
        }
    };

    if (pathname === "/pages/login") {
        return null;
    }

    return (
        <header className="site-header">
            <nav className="site-nav" aria-label="Main navigation">
                <Link href="/" className="brand-mark">
                    <span className="brand-mark__dot" aria-hidden="true" />
                    <span>Manyu</span>
                    <small>Cultural Association</small>
                </Link>
                <div className="nav-links">
                    <Link href="/" className="nav-link">Home</Link>
                    <Link href="/pages/events" className="nav-link">Events</Link>
                    <Link href="/pages/contact" className="nav-link">Contact</Link>
                    <Link href="/pages/member" className="nav-link">Members</Link>
                    <Link href="/pages/contributions" className="nav-link">Contributions</Link>
                    <Link href="/pages/minutes" className="nav-link">Minutes</Link>
                    {isLoggedIn ? (
                        <button type="button" onClick={handleLogout} className="nav-login">Logout <span aria-hidden="true">↗</span></button>
                    ) : (
                        <Link href="/pages/login" className="nav-login">Member login <span aria-hidden="true">↗</span></Link>
                    )}
                </div>
            </nav>
        </header>

    );
}
