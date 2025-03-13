"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"

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
        setMessage("");
        try {
            localStorage.removeItem("authToken");
            localStorage.removeItem("username");
    
          const response = await Profile.logoutUser();
          if (response.status === 200) {
            const data = await response.data;
            router.push("/pages/login"); // Navigate to dashboard
          } else {
            setMessage(setMessage(da));
          }
        } catch (err) {
          setMessage("An error occurred. Please try again.");
        }
      };

    return (
        <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
            {username || "Logout"}
        </button>
    );
};

