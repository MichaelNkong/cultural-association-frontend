'use client'

import MembersAPI from "@/app/lib/api/member";
import axios from "axios";
import Footer from "@/app/components/ui/footer";
import "@/app/Styles/table.css";
import { useState, useEffect } from "react";


// Define a type for the users data
interface User {
  id: number;
  username: string;
  email: string;
  active: boolean | number | string;
}

function isActive(value: User["active"]) {
  return value === true || value === 1 || value === "1" || value === "true";
}

function tokenClaims(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

export default function MemberPage() {
  const [users, setUsers] = useState<User[]>([]); // Type state as User[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const claims = token ? tokenClaims(token) : null;
    const role = typeof claims?.role === "string" ? claims.role.toLowerCase() : "";
    setIsAdmin(role === "admin" || claims?.is_admin === true || claims?.isAdmin === true);

    let isMounted = true; // Track if component is mounted

    async function fetchData() {
      setLoading(true); // Set loading state to true when starting to fetch data
      try {
        const response = await MembersAPI.getMembers();
        if (response?.status === 200) {
          const result = Array.isArray(response.data) ? response.data : response.data?.users || [];
          if (isMounted) {
            setUsers(result);
            setLoading(false);
          }
        } else {
          setError("No data found");
          setLoading(false);  // Set loading to false even if no data is found
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("An error occurred while fetching data");
        setLoading(false); // Set loading to false on error

      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, []);
  const handleCheck = async (id: number, checked: boolean) => {
    if (!isAdmin) return;
    const previousUsers = users;
    setUpdatingId(id);
    setError(null);
    setUsers(currentUsers => currentUsers.map(user =>
      user.id === id ? { ...user, active: checked } : user
    ));
    try {
      await MembersAPI.updateMemberStatus(id, checked);
    } catch (error) {
      setUsers(previousUsers);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Could not update member status.");
      } else {
        setError("Could not update member status.");
      }
    } finally {
      setUpdatingId(null);
    }
  }


  return (
    <div>
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
                    {error && <tr><td colSpan={4} className="mb-4 text-sm text-red-500">{error}</td></tr>}
                    {users.length > 0 ? (

                      users.map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            {isAdmin ? (
                              <input
                                type="checkbox"
                                checked={isActive(user.active)}
                                disabled={updatingId === user.id}
                                onChange={(event) => handleCheck(user.id, event.target.checked)}
                                aria-label={`${isActive(user.active) ? "Deactivate" : "Activate"} ${user.username}`}
                              />
                            ) : (
                              <span>{isActive(user.active) ? "Active" : "Inactive"}</span>
                            )}
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
      <Footer />
    </div>
  );
}