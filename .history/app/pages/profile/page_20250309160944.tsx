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
  <nav className="bg-gray-800 p-2">
    <div className="container mx-auto flex justify-between items-center">
      {/* Left Side - Logo */}
      <Link href="#" className="text-white text-lg font-bold">Manyu</Link>

      {/* Right Side - Navigation + Username */}
      <div className="hidden md:flex space-x-4 items-center ml-auto">
        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
        <Link href="/pages/contact" className="text-gray-300 hover:text-white">Contact</Link>

        {/* Username Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {username || "User"}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Privacy
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                Terms of Use
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
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

