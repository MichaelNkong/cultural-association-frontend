"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"
import Footer from "@/app/components/ui/footer"
import Link from "next/link";
export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Get the username from local storage (or API)
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);


    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            localStorage.removeItem("token");
            localStorage.removeItem("username");

            const response = await Profile.logoutUser();
            if (response.status == 200) {
                const data = await response.data;
                setMessage("");
                router.push("/pages/login"); // Navigate to dashboard
            } else {
                setMessage("Invalid credentials, please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <header className="sticky top-0">
                        <nav className="bg-gray-800 p-6">
                            <div className="container mx-auto flex justify-between items-center ml-0">
                                <Link href="#" className="text-white text-lg font-bold">Manyu</Link>
                                <div className="hidden md:flex space-x-4">
                                    <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                                   
                                    <Link href="/pages/contact" className="text-gray-300 hover:text-white">Contact</Link>
                                    <button onClick={ handleLogout} className="text-gray-300 hover:text-white">{username||"Logout"}</button>
                                    <Link href="/pages/member" className="text-gray-300 hover:text-white">Members</Link>
                               
                                </div> 
                                
                            </div>
                        </nav>
                    </header>
            <Footer />
        </div>

    );
};

