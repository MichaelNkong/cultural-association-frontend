'use client';

import axios from "axios";
import Footer from "@/app/components/ui/footer";
import ContributionsAPI, { Contribution } from "@/app/lib/api/contributions";
import { useEffect, useMemo, useState } from "react";

type ContributionRow = Contribution & {
  username: string;
  debt: number;
};

function tokenClaims(token: string): Record<string, unknown> | null {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
  } catch {
    return null;
  }
}

function isAdmin(claims: Record<string, unknown> | null) {
  const values = [claims?.role, claims?.roles, claims?.authorities, claims?.scope]
    .flatMap(value => Array.isArray(value) ? value : [value])
    .flatMap(value => typeof value === "string" ? value.split(/[ ,]+/) : [value])
    .map(value => {
      if (typeof value === "string") return value.toUpperCase();
      if (value && typeof value === "object" && "authority" in value) return String(value.authority).toUpperCase();
      return "";
    });

  return claims?.isAdmin === true || claims?.is_admin === true ||
    values.some(value => value === "ADMIN" || value === "ROLE_ADMIN") ||
    [localStorage.getItem("userRole")].some(value => value?.toUpperCase() === "ADMIN" || value?.toUpperCase() === "ROLE_ADMIN");
}

function toNumber(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function extractRows(data: unknown): Contribution[] {
  if (Array.isArray(data)) return data as Contribution[];
  if (data && typeof data === "object") {
    const payload = data as { contributions?: unknown; data?: unknown };
    if (Array.isArray(payload.contributions)) return payload.contributions as Contribution[];
    if (Array.isArray(payload.data)) return payload.data as Contribution[];
  }
  return [];
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(amount);
}

export default function ContributionsPage() {
  const [rows, setRows] = useState<ContributionRow[]>([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userIsAdmin = isAdmin(token ? tokenClaims(token) : null);
    setAdmin(userIsAdmin);

    async function load() {
      try {
        const response = userIsAdmin
          ? await ContributionsAPI.getAllContributions()
          : await ContributionsAPI.getMyContributions();
        const contributions = extractRows(response.data);
        setRows(contributions.map(item => {
          const amountDue = toNumber(item.amountDue);
          const amountPaid = toNumber(item.amountPaid);
          return {
            ...item,
            amountDue,
            amountPaid,
            username: item.memberUsername || "My contributions",
            debt: Math.max(amountDue - amountPaid, 0)
          };
        }));
      } catch (loadError) {
        if (axios.isAxiosError(loadError) && loadError.response?.status === 404) {
          setError("The contribution service is not available yet. Add the contribution endpoints to the backend.");
        } else {
          setError("Could not load contributions.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const totals = useMemo(() => rows.reduce((result, row) => ({
    due: result.due + row.amountDue,
    paid: result.paid + row.amountPaid,
    debt: result.debt + row.debt
  }), { due: 0, paid: 0, debt: 0 }), [rows]);

  return (
    <div className="contributions-page">
      <main className="contributions-shell">
        <header className="contributions-heading">
          <div>
            <p className="contributions-eyebrow">Association finance</p>
            <h1>Contributions</h1>
            <p className="contributions-intro">See what has been paid, what remains due, and the balance carried forward.</p>
          </div>
          {admin && (
            <button type="button" className="contributions-print" onClick={() => window.print()}>
              Print / Save PDF <span aria-hidden="true">↗</span>
            </button>
          )}
        </header>

        {error && <div className="members-alert" role="alert">{error}</div>}

        <section className="contributions-summary" aria-label="Contribution totals">
          <div><span>Total due</span><strong>{formatMoney(totals.due)}</strong></div>
          <div><span>Total paid</span><strong>{formatMoney(totals.paid)}</strong></div>
          <div className="contributions-summary__debt"><span>Outstanding debt</span><strong>{formatMoney(totals.debt)}</strong></div>
        </section>

        <section className="members-table-card contributions-table-card" aria-labelledby="contributions-title">
          <div className="members-table-header">
            <div>
              <p className="members-table-kicker">{admin ? "Administrator report" : "My account"}</p>
              <h2 id="contributions-title">Contribution history</h2>
            </div>
            {admin && <span className="members-admin-label">All members</span>}
          </div>
          <div className="members-table-scroll">
            <table className="members-table contributions-table">
              <thead><tr>
                {admin && <th scope="col">Member</th>}
                <th scope="col">Period</th>
                <th scope="col">Due</th>
                <th scope="col">Paid</th>
                <th scope="col">Debt</th>
                <th scope="col">Payment status</th>
              </tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={admin ? 6 : 5} className="members-empty">Loading contributions...</td></tr> : rows.length === 0 ? (
                  <tr><td colSpan={admin ? 6 : 5} className="members-empty">No contributions found.</td></tr>
                ) : rows.map(row => (
                  <tr key={String(row.id)}>
                    {admin && <td><span className="members-name">{row.username}</span></td>}
                    <td>{row.period}</td>
                    <td>{formatMoney(row.amountDue)}</td>
                    <td>{formatMoney(row.amountPaid)}</td>
                    <td className={row.debt > 0 ? "contributions-debt" : "contributions-paid"}>{formatMoney(row.debt)}</td>
                    <td><span className={`contributions-status ${row.debt > 0 ? "is-due" : "is-paid"}`}>{row.debt > 0 ? "Outstanding" : "Paid"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
