import React from 'react';
import Link from "next/link";
export default function Header() {
    return (
        <header className="sticky top-0">
            <nav className="bg-gray-800 p-6">
                <div className="container mx-auto flex justify-between items-center ml-0">
                    <Link href="#" className="text-white text-lg font-bold">Manyu</Link>
                    <div className="hidden md:flex space-x-4">
                        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                        <Link href="/pages/login" className="text-gray-300 hover:text-white">Login</Link>
                        <Link href="/pages/contact" className="text-gray-300 hover:text-white">Contact</Link>
                        <Link href="/pages/member" className="text-gray-300 hover:text-white">Members</Link>
                        <Link href="/pages/register" className="text-gray-300 hover:text-white">Register</Link>
                    </div> 
                    
                </div>
            </nav>
        </header>

    );
}
