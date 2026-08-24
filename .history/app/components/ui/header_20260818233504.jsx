import React from 'react';
import Link from "next/link";
export default function Header() {
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
                    <Link href="/pages/contact" className="nav-link">Contact</Link>
                    <Link href="/pages/member" className="nav-link">Members</Link>
                    <Link href="/pages/login" className="nav-login">Member login <span aria-hidden="true">↗</span></Link>
                </div>
            </nav>
        </header>

    );
}
