'use client'
import Header from "@/app/components/ui/header";
import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import Event from "@/app/lib/api/events";

interface Event {
  id: number;
  name: string ;
  date: string;
  location: string;
  description: string;
  estimated_price: number;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // To handle loading state
    const [error, setError] = useState<string | null>(null); // To handle any error

   useEffect(() => {
      let isMounted = true; // Track if component is mounted
  
      async function fetchData() {
          setLoading(true); // Set loading state to true when starting to fetch data
          try {
              const response = await Event.get();
              console.log("Response data:", response);  // Debug log for API response
              if (response?.status ===200) {
                  const result = response.data;
                  console.log("Response data: 2", result)
                  if (isMounted) {
                      setEvents(result); // Only update state if component is still mounted
                      setLoading(false); // Set loading to false after data is fetched
                  }
              } else {
                  setError("No data found");
                  setLoading(false);  // Set loading to false even if no data is found
              }
          } catch (error) {
              console.error("Error fetching data:", error);
              setError("An error occurred while fetching data");
              setLoading(false); // Set loading to false on error
          }
      }
  
      fetchData();
  
      return () => {
          isMounted = false; // Cleanup function to prevent state update on unmounted component
      };
  }, []);
  if(loading){
  console.log("loading");
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/users") // Fetch events from Spring Boot backend
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div className="p-6">
               <Header />
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{event.name}</h2>
              <p className="text-gray-600">{event.date} - {"doula"}</p>
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
