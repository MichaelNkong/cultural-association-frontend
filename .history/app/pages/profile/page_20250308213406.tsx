"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"

export default function ProfilePage() {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const router = useRouter(); // Initialize router
     const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault();
       setMessage("");
       try {
   
   
         const response = await Register.registerUser(username, email, password);;
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
}

