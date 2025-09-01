'use client'

import MembersAPI from "@/app/lib/api/member";
import axios from "axios";
import Header from "@/app/components/ui/header";
import Footer from "@/app/components/ui/footer";
import "@/app/Styles/table.css";
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
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    async function fetchData() {
      setLoading(true); // Set loading state to true when starting to fetch data
      try {
        const response = await MembersAPI.getMembers();
        console.log("Response data:", response);  // Debug log for API response
        if (response?.status === 200) {
          const result = response.data;
          console.log("Response data: 2", result)
          if (isMounted) {
            setUsers(result); // Only update state if component is still mounted
            setLoading(false); // Set loading to false after data is fetched
          }
        } else {
          setError("No data found");
          console.log(error);
          setLoading(false);  // Set loading to false even if no data is found
        }
      } catch (error) {
        console.log("Error fetching data:", error);
        setError("An error occurred while fetching data");
        console.log(error);
        setLoading(false); // Set loading to false on error

      }
    }

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, []);
  if (loading) {
    console.log("loading");
  }
  async function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>, user_id: number): Promise<void> {
    console.log(`Member activation toggled for user with ID: ${user_id}`);
    // Implement the logic to activate or deactivate a member here
    // For example, you could call an API to update the member's status
    
    try {
      setIsChecked(e.target.checked);
   
      const response = await MembersAPI.activateMembers(user_id, "1");
      console.log("Response data:", response);  // Debug log for API response
      if (response?.status === 200) {
        const result = response.data;
        setError("activated successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // ✅ Properly access backend error
          const backendMessage = error.response.data?.error || "Unauthorized";
          setError(backendMessage);
          console.log("Backend error:", backendMessage);
        } else {
          setError("Something went wrong. Try again later.");
        }
      } else {
        setError("Unexpected error occurred.");
        console.error("Non-Axios error:", error);
      }

    }
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
                      <th>Activate/Deactivate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
                    {users.length > 0 ? (

                      users.map((user, index) => (
                        <tr key={user.id}>
                          <th scope="row">{index + 1}</th>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>
                            <input type="checkbox"  checked={isChecked} name="selectRow"    onChange={(e) => handleCheckboxChange(e,user.id)}   />
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