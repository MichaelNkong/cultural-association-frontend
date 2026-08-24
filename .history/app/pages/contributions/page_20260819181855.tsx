'use client';

import axios from "axios";
import Footer from "@/app/components/ui/footer";
import ContributionsAPI, { Contribution, ContributionInput, UpdateContributionRequest } from "@/app/lib/api/contributions";
import MembersAPI from "@/app/lib/api/member";
import { useEffect, useMemo, useState } from "react";

type ContributionRow = Contribution & {
  username: string;
  debt: number;
};

type ContributionForm = {
  memberId: string;
  period: string;
  amountDue: string;
  amountPaid: string;
  paidAt: string;
};

type BulkContributionForm = {
  period: string;
  amountDue: string;
};

type Member = {
  id: number;
};

const emptyForm: ContributionForm = {
  memberId: "",
  period: "",
  amountDue: "",
  amountPaid: "",
  paidAt: ""
};

const emptyBulkForm: BulkContributionForm = {
  period: "",
  amountDue: ""
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
    values.some(value => value === "ADMIN" || value === "ROLE_ADMIN");
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

function contributionRows(data: unknown): ContributionRow[] {
  return extractRows(data).map(item => {
    const amountDue = toNumber(item.amountDue);
    const amountPaid = toNumber(item.amountPaid);
    return {
      ...item,
      amountDue,
      amountPaid,
      username: item.memberUsername || "My contributions",
      debt: Math.max(amountDue - amountPaid, 0)
    };
  });
}

function errorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) return error.response?.data?.error || fallback;
  return fallback;
}

export default function ContributionsPage() {
  const [rows, setRows] = useState<ContributionRow[]>([]);
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<ContributionForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [bulkForm, setBulkForm] = useState<BulkContributionForm>(emptyBulkForm);
  const [bulkSaving, setBulkSaving] = useState(false);

  async function loadContributions(userIsAdmin: boolean) {
    setLoading(true);
    setError(null);
    try {
      const response = userIsAdmin
        ? await ContributionsAPI.getAllContributions()
        : await ContributionsAPI.getMyContributions();
      setRows(contributionRows(response.data));
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userIsAdmin = isAdmin(token ? tokenClaims(token) : null);
    setAdmin(userIsAdmin);
    loadContributions(userIsAdmin);
  }, []);

  function startEditing(row: ContributionRow) {
    setEditingId(String(row.id));
    setForm({
      memberId: String(row.memberId ?? ""),
      period: row.period,
      amountDue: String(row.amountDue),
      amountPaid: String(row.amountPaid),
      paidAt: row.paidAt ? row.paidAt.slice(0, 10) : ""
    });
    setError(null);
    setNotice(null);
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!admin) return;

    const amountDue = Number(form.amountDue);
    const amountPaid = Number(form.amountPaid);
    const memberId = Number(form.memberId);
    if (!editingId && (!Number.isInteger(memberId) || memberId <= 0)) {
      setError("Enter a valid member ID.");
      return;
    }
    if (![amountDue, amountPaid].every(amount => Number.isFinite(amount) && amount >= 0)) {
      setError("Due and paid amounts must be zero or greater.");
      return;
    }
    if (!editingId && !/^\d{4}-(0[1-9]|1[0-2])$/.test(form.period)) {
      setError("Choose a valid contribution month.");
      return;
    }

    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      if (editingId) {
        const paymentUpdate: UpdateContributionRequest = {
          amountPaid,
          paidAt: form.paidAt || null
        };
        await ContributionsAPI.updateContribution(editingId, paymentUpdate);
        setNotice("Contribution updated successfully.");
      } else {
        const payload: ContributionInput = {
          memberId,
          period: form.period.trim(),
          amountDue,
          amountPaid,
          paidAt: form.paidAt || null
        };
        await ContributionsAPI.addContribution(payload);
        setNotice("Contribution added successfully.");
      }
      resetForm();
      await loadContributions(true);
    } catch (saveError) {
      setError(errorMessage(saveError, editingId ? "Could not update contribution." : "Could not add contribution."));
    } finally {
      setSaving(false);
    }
  }

  async function handleBulkSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!admin) return;

    const debtIncrement = Number(bulkForm.amountDue);
    if (!Number.isFinite(debtIncrement) || debtIncrement < 0) {
      setError("The debt increment must be zero or greater.");
      return;
    }
    if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(bulkForm.period)) {
      setError("Choose a valid contribution month.");
      return;
    }
    if (!window.confirm(`Increase every member's debt by ${formatMoney(debtIncrement)} for ${bulkForm.period}?`)) return;

    setBulkSaving(true);
    setError(null);
    setNotice(null);
    try {
      const response = await MembersAPI.getMembers();
      const members = (Array.isArray(response.data) ? response.data : response.data?.users || []) as Member[];
      const validMembers = members.filter(member => Number.isInteger(Number(member.id)) && Number(member.id) > 0);

      if (validMembers.length === 0) {
        setError("No members were found to receive this contribution.");
        return;
      }

      const results = await Promise.allSettled(validMembers.map(member => ContributionsAPI.addContribution({
        memberId: member.id,
        period: bulkForm.period,
        amountDue: debtIncrement,
        amountPaid: 0,
        paidAt: null
      })));
      const failed = results.filter(result => result.status === "rejected").length;

      setNotice(failed === 0
        ? `Contribution applied to ${validMembers.length} members.`
        : `Contribution applied to ${validMembers.length - failed} members; ${failed} failed.`);
      setBulkForm(emptyBulkForm);
      await loadContributions(true);
    } catch (bulkError) {
      setError(errorMessage(bulkError, "Could not apply the contribution to members."));
    } finally {
      setBulkSaving(false);
    }
  }

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
        {notice && <div className="members-notice" role="status">{notice}</div>}

        {admin && (
          <>
          <section className="contributions-editor" aria-labelledby="contribution-editor-title">
            <div className="contributions-editor__heading">
              <div>
                <p className="members-table-kicker">Administrator tools</p>
                <h2 id="contribution-editor-title">{editingId ? "Update contribution" : "Add contribution"}</h2>
              </div>
              {editingId && <button type="button" className="contributions-cancel" onClick={resetForm}>Cancel edit</button>}
            </div>
            <form className="contributions-form" onSubmit={handleSubmit}>
              <label>
                Member ID
                <input type="number" min="1" step="1" value={form.memberId} onChange={event => setForm({ ...form, memberId: event.target.value })} required={!editingId} disabled={Boolean(editingId)} />
              </label>
              <label>
                Period
                <input type="month" value={form.period} onChange={event => setForm({ ...form, period: event.target.value })} required={!editingId} disabled={Boolean(editingId)} />
              </label>
              <label>
                Amount due
                <input type="number" min="0" step="0.01" value={form.amountDue} onChange={event => setForm({ ...form, amountDue: event.target.value })} required={!editingId} disabled={Boolean(editingId)} />
              </label>
              <label>
                Amount paid
                <input type="number" min="0" step="0.01" value={form.amountPaid} onChange={event => setForm({ ...form, amountPaid: event.target.value })} required />
              </label>
              <label>
                Paid date
                <input type="date" value={form.paidAt} onChange={event => setForm({ ...form, paidAt: event.target.value })} />
              </label>
              <button type="submit" className="contributions-submit" disabled={saving}>
                {saving ? "Saving..." : editingId ? "Update contribution" : "Add contribution"}
                {!saving && <span aria-hidden="true">↗</span>}
              </button>
            </form>
          </section>

          <section className="contributions-editor" aria-labelledby="bulk-contribution-title">
            <div className="contributions-editor__heading">
              <div>
                <p className="members-table-kicker">Administrator tools</p>
                <h2 id="bulk-contribution-title">Apply to all members</h2>
              </div>
            </div>
            <form className="contributions-form" onSubmit={handleBulkSubmit}>
              <label>
                Period
                <input type="month" value={bulkForm.period} onChange={event => setBulkForm({ ...bulkForm, period: event.target.value })} required />
              </label>
              <label>
                Debt increment
                <input type="number" min="0" step="0.01" value={bulkForm.amountDue} onChange={event => setBulkForm({ ...bulkForm, amountDue: event.target.value })} required />
              </label>
              <button type="submit" className="contributions-submit" disabled={bulkSaving}>
                {bulkSaving ? "Applying..." : "Apply to all members"}
                {!bulkSaving && <span aria-hidden="true">↗</span>}
              </button>
            </form>
          </section>
          </>
        )}

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
                {admin && <th scope="col">Actions</th>}
              </tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={admin ? 7 : 5} className="members-empty">Loading contributions...</td></tr> : rows.length === 0 ? (
                  <tr><td colSpan={admin ? 7 : 5} className="members-empty">No contributions found.</td></tr>
                ) : rows.map(row => (
                  <tr key={String(row.id)}>
                    {admin && <td><span className="members-name">{row.username}</span></td>}
                    <td>{row.period}</td>
                    <td>{formatMoney(row.amountDue)}</td>
                    <td>{formatMoney(row.amountPaid)}</td>
                    <td className={row.debt > 0 ? "contributions-debt" : "contributions-paid"}>{formatMoney(row.debt)}</td>
                    <td><span className={`contributions-status ${row.debt > 0 ? "is-due" : "is-paid"}`}>{row.debt > 0 ? "Outstanding" : "Paid"}</span></td>
                    {admin && <td><button type="button" className="contributions-edit" onClick={() => startEditing(row)}>Edit</button></td>}
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
