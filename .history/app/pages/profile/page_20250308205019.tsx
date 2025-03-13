"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"

const ProfilePage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Get the username from local storage (or API)
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = async () => {
        try {
            // Remove authentication data
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");

            // Call backend logout API (optional)
            await profile.

            // Redirect to login page
            router.push("pages/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
            {username || "Logout"}
        </button>
    );
};

export default ProfilePage;