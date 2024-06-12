import React from "react";
import axios from "axios";
import Events from "@/components/Events/Events";

// Define an interface or type for the params object
interface PageProps {
  params: {
    id: string; // Adjust the type based on the expected structure
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch("http://localhost:8000/api/event");
    const data = await res.json();

    // Ensure that the expected property is events
    if (data && Array.isArray(data.events)) {
      return data.events.map((event: any) => ({
        params: { id: event.id.toString() },
      }));
    } else {
      throw new Error("Data structure does not match expected format.");
    }
  } catch (error) {
    console.error("Error fetching static params:", error);
    return [];
  }
}

async function getEvent(id: string) {
  try {
    const res = await axios.get(`http://localhost:8000/api/event/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function Page({ params }: PageProps) {
  const eventData = await getEvent(params.id);

  if (!eventData) {
    return <div>Error loading event</div>;
  }

  return (
    <Events
      id={eventData.id}
      nama_event={eventData.nama_event}
      date={eventData.date}
      time={eventData.time}
      location={eventData.location}
      description={eventData.description}
      image={eventData.image}
    />
  );
}
