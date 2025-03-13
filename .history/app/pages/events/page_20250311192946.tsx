import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  description: string;
  estimated_price: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events") // Fetch events from Spring Boot backend
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.date} - {event.location}</p>
              <p className="mt-2">{event.description}</p>
              <p className="mt-2 font-bold">Estimated Price: ${event.estimated_price}</p>
              <Button className="mt-4 w-full">Register</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
