'use client'

import LoginButton from "@/app/components/ui/login"
import Link from "next/link";
import Members from "@/app/lib/api/member";
import Header from "@/app/components/ui/header"
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "@/app/Styles/table.css"
import axios from "axios";
import { useState, useEffect } from "react";

export default function MemberPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let isMounted = true; // Track if component is mounted

        async function fetchData() {
            try {
                const response = await Members.getMembers();
                const result = await response.data;
                console.log(result);
                if (isMounted) {
                    setUsers(result); // Only update state if component is still mounted
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();

        return () => {
            isMounted = false; // Cleanup function to prevent state update on unmounted component
        };
    }, []); // 

    if (users || users.length === 0) {
        return <p>Loading members...</p>;  // Show a loading message while data loads
    }

    return (
        <div>
            <Header />
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
                                                    <td><input type="checkbox" name="selectRow3" /></td>
                                                </tr>
                                            ))
                                        ) : null}
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