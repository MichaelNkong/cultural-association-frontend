'use client'


import Header from "@/app/components/ui/header"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import loginUser from "@/app/lib/api/login"

import { useState } from "react";

export default function ContactPage() {

  

        return (

            <div className="margin-top:2">
                <Header/>
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-2">Email: contact@culture.org</p>
            </div>
          );
}