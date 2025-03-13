"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/app/lib/api/profile"
import Header from "@/app/components/ui/header"
import Footer from "@/app/components/ui/footer"
export default function ProfilePage() {
   

    return (
        <div>
            <header />
            <button onClick={handleLogout} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
       
            </button>

        </div>

    );
};

