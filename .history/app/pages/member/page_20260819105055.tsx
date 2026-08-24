'use client'

import MembersAPI from "@/app/lib/api/member";
import axios from "axios";
import Footer from "@/app/components/ui/footer";
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

function hasAdminRole(claims: Record<string, unknown> | null) {
  const roles = claims?.roles;
  return claims?.role === "ADMIN" || claims?.role === "ROLE_ADMIN" ||
    claims?.is_admin === true || claims?.isAdmin === true ||
    (Array.isArray(roles) && roles.some(role => role === "ADMIN" || role === "ROLE_ADMIN"));
}

export default function MemberPage() {
  const [users, setUsers] = useState<User[]>([]); // Type state as User[]
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const admin = hasAdminRole(token ? tokenClaims(token) : null);

    setIsAdmin(admin);

    let isMounted = true; // Track if component is mounted

    async function fetchData() {
      setLoading(true);
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
          setLoading(false);
        }
      } catch (error) {
        if (isMounted && axios.isAxiosError(error) && error.response?.status === 403) {
          setIsAdmin(false);
          setError("Only administrators can view and manage members.");
        } else {
          setError("An error occurred while fetching data");
        }
        setLoading(false);

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
    setNotice(null);
    setUsers(currentUsers => currentUsers.map(user =>
      user.id === id ? { ...user, active: checked } : user
    ));
    try {
      await MembersAPI.updateMemberStatus(id, checked);
      setNotice(`Member ${checked ? "activated" : "deactivated"} successfully.`);
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
    <div className="members-page">
      <main className="members-shell">
        <header className="members-heading">
          <div>
            <p className="members-eyebrow">Community directory</p>
            <h1>Registered members</h1>
            <p className="members-intro">Review member accounts and manage access to the association.</p>
          </div>
          <div className="members-count" aria-label={`${users.length} registered members`}>
            <strong>{users.length}</strong>
            <span>members</span>
          </div>
        </header>

        {!isAdmin && !loading && (
          <div className="members-permission" role="status">
            <span className="members-permission__dot" aria-hidden="true" />
            <span>Member access is read-only. An administrator is required to change account status.</span>
          </div>
        )}
        {error && <div className="members-alert" role="alert">{error}</div>}
        {notice && <div className="members-notice" role="status">{notice}</div>}

        <section className="members-table-card" aria-labelledby="members-table-title">
          <div className="members-table-header">
            <div>
              <p className="members-table-kicker">Account management</p>
              <h2 id="members-table-title">All members</h2>
            </div>
            {isAdmin && <span className="members-admin-label">Administrator access</span>}
          </div>
          <div className="members-table-scroll">
            <table className="members-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Member</th>
                  <th scope="col">Email address</th>
                  <th scope="col">Account status</th>
                  <th scope="col" className="members-action-heading">Access</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="members-empty">Loading members...</td></tr>
                ) : users.length > 0 ? users.map((user, index) => {
                  const active = isActive(user.active);
                  const updating = updatingId === user.id;
                  return (
                    <tr key={user.id}>
                      <td className="members-index">{String(index + 1).padStart(2, "0")}</td>
                      <td><span className="members-name">{user.username}</span></td>
                      <td><span className="members-email">{user.email}</span></td>
                      <td><span className={`members-status ${active ? "is-active" : "is-inactive"}`}>
                        <span aria-hidden="true" />{active ? "Active" : "Inactive"}
                      </span></td>
                      <td className="members-action-cell">
                        {isAdmin ? (
                          <button
                            type="button"
                            className={`members-switch ${active ? "is-on" : ""}`}
                            role="switch"
                            aria-checked={active}
                            aria-label={`${active ? "Deactivate" : "Activate"} ${user.username}`}
                            disabled={updating}
                            onClick={() => handleCheck(user.id, !active)}
                          >
                            <span className="members-switch__track"><span className="members-switch__thumb" /></span>
                            <span className="members-switch__label">{updating ? "Saving..." : active ? "Enabled" : "Enable"}</span>
                          </button>
                        ) : <span className="members-readonly">View only</span>}
                      </td>
                    </tr>
                  );
                }) : (
                  <tr><td colSpan={5} className="members-empty">No registered members found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}