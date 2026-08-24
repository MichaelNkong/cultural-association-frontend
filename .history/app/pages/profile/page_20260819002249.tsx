"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileAPI from "@/app/lib/api/profile"
import Footer from "@/app/components/ui/footer"
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
       

            const response = await ProfileAPI.logoutUser();
            if (response.status == 200) {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                setMessage("loggout out successfully");
                router.push("/pages/login"); // Navigate to dashboard
                console.log(message);
            } else {
                setMessage("Invalid credentials, please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again."+err);
            console.log(message);
        }
    };

    return (
        <div>
            <Footer />
        </div>

    );
};

