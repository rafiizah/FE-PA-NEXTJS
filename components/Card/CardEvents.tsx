"use client";
// CardEvents.tsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  nama_event: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

const CardEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/event");
        setEvents(response.data.event || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/Events/${id}`);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto pt-28 px-9">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Latest Event
        </h2>
        <div className="gap-5 grid grid-cols-2 sm:grid-cols-4 pt-5 ">
          {events.length > 0 ? (
            events.map((event) => (
              <Card
                key={event.id}
                shadow="sm"
                isPressable
                className="h-[310px]"
                onPress={() => handleCardClick(event.id)}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width="100%"
                    alt={event.nama_event}
                    className="w-full object-cover h-[200px]"
                    src={`http://localhost:8000${event.image}`}
                  />
                </CardBody>
                <CardFooter className="pb-2 pt-0 px-4 flex-col items-start">
                  <h4 className="text-large font-bold text-black mb-3 mt-2">
                    {event.nama_event}
                  </h4>{" "}
                  <div className="flex items-center mb-2">
                    <Image
                      src={"/images/date.svg"}
                      alt="date"
                      radius="none"
                      width={22}
                      height={22}
                      className="mr-3" // Menambahkan margin kanan agar terpisah dari teks
                    />
                    <p className="text-default-500 ml-2">{event.date}</p>
                  </div>
                  <div className="flex items-center">
                    <Image
                      src={"/images/location.svg"}
                      alt="date"
                      radius="none"
                      width={22}
                      height={22}
                      className="mr-3" // Menambahkan margin kanan agar terpisah dari teks
                    />
                    <p className="text-default-500 ml-2">{event.location}</p>{" "}
                    {/* Menambahkan margin kiri pada teks */}
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No events found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardEvents;
