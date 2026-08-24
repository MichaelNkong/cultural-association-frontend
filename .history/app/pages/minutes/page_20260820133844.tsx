'use client';

import axios from "axios";
import Footer from "@/app/components/ui/footer";
import MinutesAPI, { MeetingMinutes, MeetingMinutesInput } from "@/app/lib/api/minutes";
import { useEffect, useState } from "react";

const emptyForm: MeetingMinutesInput = {
  meetingDate: "",
  title: "",
  agenda: "",
  discussion: "",
  decisions: "",
  futurePlans: ""
};

function hasEditorRole() {
  const role = (localStorage.getItem("userRole") || "").toUpperCase();
  return role.split(/[ ,]+/).some(value => value === "ADMIN" || value === "ROLE_ADMIN" || value === "SECRETARY" || value === "ROLE_SECRETARY");
}

export default function MinutesPage() {
  const [minutes, setMinutes] = useState<MeetingMinutes[]>([]);
  const [form, setForm] = useState<MeetingMinutesInput>(emptyForm);
  const [editor, setEditor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  async function loadMinutes() {
    try {
      const response = await MinutesAPI.getMinutes();
      setMinutes(Array.isArray(response.data) ? response.data : []);
    } catch {
      setError("Could not load meeting minutes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setEditor(hasEditorRole());
    loadMinutes();
  }, []);

  async function createMinutes(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await MinutesAPI.createMinutes(form);
      setForm(emptyForm);
      setNotice("Minutes saved as a draft. Publish them when they are ready for the group.");
      await loadMinutes();
    } catch (saveError) {
      setError(axios.isAxiosError(saveError) ? saveError.response?.data?.error || "Could not save minutes." : "Could not save minutes.");
    } finally {
      setSaving(false);
    }
  }

  async function publish(id: number) {
    setError(null);
    try {
      await MinutesAPI.publishMinutes(id);
      setNotice("Minutes published for members.");
      await loadMinutes();
    } catch {
      setError("Could not publish these minutes.");
    }
  }

  return (
    <div className="minutes-page">
      <main className="minutes-shell">
        <header className="minutes-heading">
          <div>
            <p className="members-eyebrow">Association record</p>
            <h1>Meeting minutes</h1>
            <p className="minutes-intro">A shared record of what was discussed, decided, and planned next.</p>
          </div>
          <div className="minutes-heading__note">Monthly archive</div>
        </header>

        {error && <div className="members-alert" role="alert">{error}</div>}
        {notice && <div className="members-notice" role="status">{notice}</div>}

        {editor && <section className="minutes-editor" aria-labelledby="minutes-editor-title">
          <div className="minutes-section-heading">
            <div>
              <p className="members-table-kicker">Secretary desk</p>
              <h2 id="minutes-editor-title">Record a meeting</h2>
            </div>
            <span className="minutes-draft-label">Draft until published</span>
          </div>
          <form className="minutes-form" onSubmit={createMinutes}>
            <label>Meeting date<input type="date" value={form.meetingDate} onChange={event => setForm({ ...form, meetingDate: event.target.value })} required /></label>
            <label>Title<input type="text" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="Monthly association meeting" required /></label>
            <label>Agenda<textarea value={form.agenda} onChange={event => setForm({ ...form, agenda: event.target.value })} required /></label>
            <label>Discussion and minutes<textarea value={form.discussion} onChange={event => setForm({ ...form, discussion: event.target.value })} required /></label>
            <label>Decisions made<textarea value={form.decisions} onChange={event => setForm({ ...form, decisions: event.target.value })} required /></label>
            <label>Future plans and actions<textarea value={form.futurePlans} onChange={event => setForm({ ...form, futurePlans: event.target.value })} required /></label>
            <button className="contributions-submit" type="submit" disabled={saving}>{saving ? "Saving draft..." : "Save meeting minutes"}<span aria-hidden="true">↗</span></button>
          </form>
        </section>}

        <section className="minutes-list" aria-labelledby="minutes-list-title">
          <div className="minutes-section-heading">
            <div><p className="members-table-kicker">{editor ? "Editorial archive" : "Member archive"}</p><h2 id="minutes-list-title">Association record</h2></div>
            <span className="minutes-count">{minutes.length} {minutes.length === 1 ? "entry" : "entries"}</span>
          </div>
          {loading ? <p className="minutes-empty">Loading the archive...</p> : minutes.length === 0 ? <p className="minutes-empty">No published minutes yet.</p> : <div className="minutes-grid">
            {minutes.map(item => <article className={`minutes-card ${item.published ? "is-published" : "is-draft"}`} key={item.id}>
              <div className="minutes-card__top"><span>{item.meetingDate}</span><strong>{item.published ? "Published" : "Draft"}</strong></div>
              <h3>{item.title}</h3>
              <p className="minutes-card__byline">Recorded by {item.recordedBy}</p>
              <div className="minutes-card__summary"><div><b>Decisions</b><p>{item.decisions}</p></div><div><b>Next</b><p>{item.futurePlans}</p></div></div>
              <div className="minutes-card__actions"><button type="button" className="contributions-edit" onClick={() => MinutesAPI.downloadMinutes(item.id, item.meetingDate)}>Download</button>{editor && !item.published && <button type="button" className="contributions-submit" onClick={() => publish(item.id)}>Publish</button>}</div>
            </article>)}
          </div>}
        </section>
      </main>
      <Footer />
    </div>
  );
}