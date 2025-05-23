import React from 'react';
import Link from "next/link";
export default function Section() {
    return (
        <header className="sticky top-0">
            <nav className="bg-gray-800 p-6">
                <div className="container mx-auto flex justify-between items-center ml-0">
                    <Link href="#" className="text-white text-lg font-bold">Manyu</Link>
                    <div classn="hidden md:flex space-x-4">
                        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                        <Link href="/pages/login" className="text-gray-300 hover:text-white">Login</Link>
                        <Link href="/pages/contact" className="text-gray-300 hover:text-white">Contact</Link>
                        <Link href="/pages/member" className="text-gray-300 hover:text-white">Members</Link>
                    </div> 
                    <div className="md:hidden">
                        <button className="text-gray-300 focus:outline-none">

                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg> 
                        </button>
                    </div>
                </div>
            </nav>
        </header>

    );
}