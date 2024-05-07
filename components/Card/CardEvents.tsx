"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

interface Event {
  id: string;
  nama_event: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

export default function CardEvents() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/event");
        const eventData: Event[] = response.data.events; // Corrected access to response data
        setEvents(eventData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEvents([]);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto pt-32 px-9">
        <div className="gap-4 grid grid-cols-2 sm:grid-cols-4">
          {events && events.length > 0 ? ( // Check if events is truthy and has length
            events.map((event, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={event.nama_event} // Adjusted property access
                    className="w-full object-cover h-[140px]"
                    src={`http://localhost:8000/${event.image}`} // You need to provide the image URL here
                  />
                </CardBody>
                <CardFooter className="text-small justify-between">
                  <b>{event.nama_event}</b> {/* Adjusted property access */}
                  {/* Assuming you have price property in your event object */}
                  <p className="text-default-500">{event.date}</p>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No events found</p> // Display a message if no events are available
          )}
        </div>
      </div>
    </section>
  );
}
