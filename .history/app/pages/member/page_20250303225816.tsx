'use client'

import LoginButton from "@/app/components/ui/login";
import Link from "next/link";
import Members from "@/app/lib/api/member";
import Header from "@/app/components/ui/header";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import "@/app/Styles/table.css";
import axios from "axios";
import { useState, useEffect } from "react";

// Define a type for the users data
interface User {
  id: number;
  username: string;
  email: string;
}

export default function MemberPage() {
  const [users, setUsers] = useState<User[]>([]); // Type state as User[]
  const [loading, setLoading] = useState<boolean>(true); // To handle loading state
  const [error, setError] = useState<string | null>(null); // To handle any error

 useEffect(() => {
    let isMounted = true; // Track if component is mounted

    async function fetchData() {
        setLoading(true); // Set loading state to true when starting to fetch data
        try {
            const response = await Members.getMembers();
            console.log("Response data:", response);  // Debug log for API response
            if (response ===200) {
                const result = response.data;
                console.log("Response data: 2", result)
                if (isMounted) {
                    setUsers(result); // Only update state if component is still mounted
                    setLoading(false); // Set loading to false after data is fetched
                }
            } else {
                setError("No data found");
                setLoading(false);  // Set loading to false even if no data is found
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("An error occurred while fetching data");
            setLoading(false); // Set loading to false on error
        }
    }

    fetchData();

    return () => {
        isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
}, []);

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
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <tr key={user.id}>
                          <th scope="row">{user.id}</th>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <input type="checkbox" name="selectRow" />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4}>No users found.</td>
                      </tr>
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