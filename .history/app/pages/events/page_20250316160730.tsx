"use client";

import Header from "@/app/components/ui/header";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Events from "@/app/lib/api/events"; // Renamed to avoid conflicts

interface EventType { // Renamed to avoid conflict
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  estimated_price: number;
}

export default function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      try {
        const response = await Events.getEvents();
        if (response?.status === 200) {
          const result = response.data;
          if (isMounted) {
            setEvents(result);
            setLoading(false);
          }
        } else {
          setError("No data found");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
        setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <Header />
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((myevent) => (
          <Card key={myevent.id} className="p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.date}</p> {/* Removed "doula" */}
              <p className="mt-2">{event.description}</p>
              <p className="mt-2 font-bold">Estimated Price: ${event.estimated_price}</p>
              <Button onClick={() => alert(`Registered for ${event.name}`)}>Register</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}