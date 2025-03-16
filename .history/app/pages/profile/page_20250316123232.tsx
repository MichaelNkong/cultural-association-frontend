"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "@/app/components/ui/footer"
import Link from "next/link";
import profileAPI from "@/app/lib/api/profile";
export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
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

            const response = await profileAPI.logoutUser();
            if (response.status == 200) {
                const data = await response.data;
                setMessage("");
                router.push("/pages/login"); // Navigate to dashboard
                console.log();
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
                <nav className="bg-gray-800 p-2">
                    <div className="container mx-auto flex justify-between items-center">
                        {/* Left Side - Logo */}
                        <Link href="#" className="text-white text-lg font-bold">Manyu</Link>

                        {/* Right Side - Navigation + Username */}
                        <div className="hidden md:flex space-x-4 items-center ml-auto">
                            <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                            <Link href="/pages/images" className="text-gray-300 hover:text-white">Images</Link>
                            <Link href="/pages/events" className="text-gray-300 hover:text-white">Events</Link>

                            {/* Username Dropdown */}
                            <div mr-2 className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="text-gray-300 hover:text-white focus:outline-none"
                                >
                                    {username || "User"}
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <ul className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                                        <Link href = "/pages/profile" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Profile
                                        </Link>
                                        <Link href = "/pages/privacy" className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Privacy
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <Footer />
        </div>

    );
};

