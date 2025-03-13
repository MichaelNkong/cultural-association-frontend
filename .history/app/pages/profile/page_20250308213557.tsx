"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"

export default function ProfilePage() {
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
          const   response = await Profile.logoutUser();

            // Redirect to login page
            router.push("pages/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    const [username, setUsername] = useState("");
      const [password, setPassword] = useState("");
      const [email, setEmail] = useState("");
      const [message, setMessage] = useState("");
    
      const router = useRouter(); // Initialize router
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        try {
    
    
          const response = await(username, email, password);;
          if (response.status === 200) {
            const data = await response.data;
            router.push("/pages/login"); // Navigate to dashboard
          } else {
            setMessage("Invalid credentials, please try again.");
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

