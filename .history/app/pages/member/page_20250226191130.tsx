'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Members from "@/app/lib/api/member";
import Section from "@/app/components/ui/section"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "@/app/Styles/table.css"
import axios from "axios";
import { useState, useEffect } from "react";

export default function MemberPage() {
    const [users, setUsers] = useState([]);


const router = useRouter(); // Initialize router
    const handleMembers = async () => {
 
        try {
            const response = await  Members.geMembers();
  
            if (response.status = 200) {
              
  setUsers(member.data)
                router.push("/pages/contact"); // Navigate to dashboard
            } else {
                setMessage("Invalid credentials, please try again.");
            }
        } catch (err) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div>
            <Section />
            <section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6 text-center mb-5">
                            <h2 className="heading-section">Registered Members</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="table-wrap">
                                <table className="table">
                                    <thead className="thead-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>User Name</th>
                                            <th>Email Address</th>
                                            <th>Activavte/Deactivate</th>
                                        
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user: { id: number; username: string, email: string }, index: number) => (
                            <tr key={index} >
                            <th scope="row">{index}</th>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                        </tr>
                        ))
                        ) : (
                        <p>No users available</p>
                        )}
                        
                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}