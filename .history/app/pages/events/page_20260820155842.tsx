'use client';

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import EventsAPI, { EventPayload } from "@/app/lib/api/events";

type Event = EventPayload & { id: number };
type EventForm = Omit<EventPayload, "id">;

const emptyForm: EventForm = { name: "", date: "", location: "", description: "", estimatedPrice: 0 };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(new Date(`${date}T00:00:00`));
}

function hasAdminRole() {
  const token = localStorage.getItem("token");
  const storedRole = localStorage.getItem("userRole");
  let claims: Record<string, unknown> | null = null;
  try {
    if (token) {
      const payload = token.split(".")[1];
      claims = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    }
  } catch { }

  const values = [claims?.role, claims?.roles, claims?.authorities, claims?.scope, storedRole]
    .flatMap((value) => Array.isArray(value) ? value : [value])
    .flatMap((value) => typeof value === "string" ? value.split(/[ ,]+/) : [value])
    .map((value) => typeof value === "string" ? value.toUpperCase() : value && typeof value === "object" && "authority" in value ? String(value.authority).toUpperCase() : "");
  return Boolean(claims?.is_admin === true || claims?.isAdmin === true || values.some((value) => value === "ADMIN" || value === "ROLE_ADMIN"));
}

export default function EventsPage() {
  const [eventData, setEventdata] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<Record<number, string>>({});
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track if component is mounted

    async function fetchData() {
      try {
        const response = await EventsAPI.getEvents();
        const result = response.data;
        if (isMounted) {
          setEventdata(Array.isArray(result) ? result : result.events || result.data || []);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        if (isMounted) {
          setError("We couldn't load the events right now.");
          setLoading(false);
        }
      }
    }

    fetchData(); // Call the fetch function

    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
    setCanManage(hasAdminRole());
  }, []);

  const handleSubmit = async (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();
    setSaving(true);
    setNotice(null);
    try {
      const response = editingId === null
        ? await EventsAPI.createEvent(form)
        : await EventsAPI.updateEvent(editingId, form);
      const savedEvent = response.data as Event;
      setEventdata((current) => editingId === null
        ? [savedEvent, ...current]
        : current.map((event) => event.id === editingId ? savedEvent : event));
      setForm(emptyForm);
      setEditingId(null);
      setNotice(editingId === null ? "Event created." : "Event updated.");
    } catch (requestError) {
      console.error("Unable to save event:", requestError);
      setNotice("We couldn't save that event. Please check your details and try again.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (event: Event) => {
    setEditingId(event.id);
    setForm({ name: event.name, date: event.date, location: event.location, description: event.description || "", estimatedPrice: event.estimatedPrice ?? 0 });
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (event: Event) => {
    if (!window.confirm(`Delete “${event.name}”? This cannot be undone.`)) return;
    try {
      await EventsAPI.deleteEvent(event.id);
      setEventdata((current) => current.filter((item) => item.id !== event.id));
      setNotice("Event deleted.");
    } catch (requestError) {
      console.error("Unable to delete event:", requestError);
      setNotice("We couldn't delete that event.");
    }
  };

  const handleRegistration = async (event: Event) => {
    setRegistrationStatus((current) => ({ ...current, [event.id]: "Registering..." }));

    try {
      await EventsAPI.registerForEvent(event.id);
      setRegistrationStatus((current) => ({ ...current, [event.id]: "Registered" }));
    } catch (error) {
      console.error("Error registering for event:", error);
      setRegistrationStatus((current) => ({ ...current, [event.id]: "Registration failed" }));
    }
  };

  if (loading) {
    return <main className="events-page"><div className="events-shell"><p className="events-loading">Loading the next gathering...</p></div></main>;
  }

  if (error) {
    return <main className="events-page"><div className="events-shell"><p className="events-alert">{error}</p></div></main>;
  }

  return (
    <main className="events-page">
      <div className="events-shell">
        <header className="events-heading">
          <div>
            <p className="events-eyebrow">Gather together</p>
            <h1>Events that keep<br /><em>community moving.</em></h1>
            <p className="events-intro">Find the next moment to share, learn, and celebrate with the Manyu community.</p>
          </div>
          <div className="events-count"><strong>{eventData.length}</strong><span>upcoming events</span></div>
        </header>

        {canManage && <section className="events-editor" aria-labelledby="event-editor-title">
          <div className="events-section-heading">
            <div><p className="events-kicker">Member tools</p><h2 id="event-editor-title">{editingId === null ? "Add a new event" : "Update event"}</h2></div>
            {editingId !== null && <button type="button" className="events-cancel" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel edit</button>}
          </div>
          <form className="events-form" onSubmit={handleSubmit}>
            <label>Event name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="e.g. Community harvest" /></label>
            <label>Date<input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label>
            <label>Location<input required value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Venue or meeting place" /></label>
            <label>Estimated price<input required min="0" step="0.01" type="number" value={form.estimatedPrice} onChange={(event) => setForm({ ...form, estimatedPrice: Number(event.target.value) })} /></label>
            <label className="events-form__wide">Description<textarea required value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What should members know?" /></label>
            <button className="events-submit" disabled={saving}>{saving ? "Saving..." : editingId === null ? "Create event ↗" : "Save changes ↗"}</button>
          </form>
          {notice && <p className="events-notice">{notice}</p>}
        </section>}

        <section className="events-list" aria-labelledby="events-list-title">
          <div className="events-section-heading"><div><p className="events-kicker">The calendar</p><h2 id="events-list-title">Upcoming events</h2></div><span className="events-count-label">{eventData.length} listed</span></div>
          <div className="events-grid">
        {eventData.map((event) => (
          <article key={event.id} className="event-card">
            <Link href={`/pages/events/${event.id}`} className="event-card__link">
              <span className="event-card__date">{formatDate(event.date)}</span><h3>{event.name}</h3>
              <p className="event-card__location">{event.location}</p><p className="event-card__description">{event.description}</p>
              <span className="event-card__detail">View details <span aria-hidden="true">↗</span></span>
            </Link>
            <div className="event-card__footer"><span>${Number(event.estimatedPrice ?? 0).toFixed(2)}</span><button type="button" onClick={() => handleRegistration(event)}>{registrationStatus[event.id] || "Register"}</button></div>
            {canManage && <div className="event-card__manage"><button type="button" onClick={() => startEditing(event)}>Edit</button><button type="button" onClick={() => handleDelete(event)}>Delete</button></div>}
          </article>
        ))}
          </div>
          {eventData.length === 0 && <p className="events-empty">There are no upcoming events yet.</p>}
        </section>
      </div>
    </main>
  );
}