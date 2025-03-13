"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"
import Header from "@/app/components/ui/header"
import Footer from "@/app/components/ui/footer"
export default function ProfilePage() {
   

    return (
        <div>
            <Header /> const router = useRouter();
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
            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
       
            </button>

        </div>

    );
};

