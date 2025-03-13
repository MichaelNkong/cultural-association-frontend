'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Section from "@/app/components/ui/section"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import loginUser from "@/app/lib/api/login"

import { useState } from "react";

export default function MemberPage() {
   
        return (
            <div className="p-8">
              <h2 className="text-3xl font-bold">Contact Us</h2>
              <p className="mt-2">Email: contact@culture.org</p>
            </div>
          );
}