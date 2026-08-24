'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import EventsAPI, { EventPayload } from "@/app/lib/api/events";

type Event = EventPayload & { id: number };

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(new Date(`${date}T00:00:00`));
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

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [canManage, setCanManage] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await EventsAPI.getEvent(Number(params.id));
        setEvent(response.data);
      } catch (requestError) {
        console.error("Unable to load event:", requestError);
        setError("This event could not be found.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchEvent();
    setCanManage(hasAdminRole());
  }, [params.id]);

  const handleRegistration = async () => {
    if (!event) return;
    try {
      setStatus("Registering...");
      await EventsAPI.registerForEvent(event.id);
      setStatus("You're registered");
    } catch (requestError) {
      console.error("Unable to register:", requestError);
      setStatus("Registration failed");
    }
  };

  const handleDelete = async () => {
    if (!event || !window.confirm(`Delete “${event.name}”? This cannot be undone.`)) return;
    try {
      await EventsAPI.deleteEvent(event.id);
      router.push("/pages/events");
    } catch (requestError) {
      console.error("Unable to delete event:", requestError);
      setStatus("We couldn't delete this event.");
    }
  };

  if (loading) return <main className="events-page"><div className="events-shell"><p className="events-loading">Loading event details...</p></div></main>;
  if (error || !event) return <main className="events-page"><div className="events-shell"><p className="events-alert">{error}</p><Link className="events-back" href="/pages/events">← Back to events</Link></div></main>;

  return (
    <main className="events-page">
      <div className="events-shell">
        <Link className="events-back" href="/pages/events">← All events</Link>
        <article className="event-detail">
          <p className="events-eyebrow">Manyu gathering</p>
          <h1>{event.name}</h1>
          <p className="event-detail__date">{formatDate(event.date)}</p>
          <div className="event-detail__rule" />
          <div className="event-detail__body">
            <div><p className="events-kicker">About this event</p><p className="event-detail__description">{event.description}</p></div>
            <aside className="event-detail__facts"><div><span>Where</span><strong>{event.location}</strong></div><div><span>Estimated price</span><strong>${Number(event.estimatedPrice ?? 0).toFixed(2)}</strong></div><button type="button" className="events-submit" onClick={handleRegistration}>{status || "Register for this event ↗"}</button></aside>
          </div>
          {canManage && <div className="event-detail__manage"><Link href="/pages/events">Edit event</Link><button type="button" onClick={handleDelete}>Delete event</button></div>}
        </article>
      </div>
    </main>
  );
}
