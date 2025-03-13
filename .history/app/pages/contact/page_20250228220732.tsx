'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Header from "@/app/components/ui/header"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import loginUser from "@/app/lib/api/login"

import { useState } from "react";

export default function ContactPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   const   [message, setMessage] = useState("");
  

    const router = useRouter(); // Initialize router
    const handleSubmit = async (e:  React.FormEvent) => {
        e.preventDefault();
        try {
             console.log("password"+password);
             console.log("username"+username);
            const  response = await loginUser.loginUser(username,password);
            console.log("Raw Response Body:nn", response.status);
            if (response.status = 200) {
                const data = await response.data;
                localStorage.setItem("token", data.token); // Store JWT token
                console.log("token token"+data.token);
                router.push("/register"); // Navigate to dashboard
            } else {
                setMessage("Invalid credentials, please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
        }
    };
        return (

            <div className=" 0">
                <Header/>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-2">Email: contact@culture.org</p>
            </div>
          );
}