"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "@/app/components/ui/footer"
export default function ProfilePage() {
    const router = useRouter();
    const [message, setMessage] = useState("");

    return (
        <div>
            <Footer />
        </div>

    );
};

