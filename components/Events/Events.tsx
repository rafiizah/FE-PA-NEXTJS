"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";

interface EventsProps {
  id: string;
  nama_event: string;
  image: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const Events: React.FC<EventsProps> = ({
  id,
  nama_event,
  image,
  description,
  date,
  time,
  location,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("token");
      if (token) {
        const { access_token } = JSON.parse(token);
        setIsLoggedIn(!!access_token);
        if (!access_token) {
          console.warn("No access token found");
        }
      } else {
        console.warn("No token data found");
      }
    };

    checkLoginStatus();
  }, []);

  const handleFollow = async () => {
    if (!isLoggedIn) {
      alert("Anda Harus Login Dahulu");
    } else {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("Token data is missing");
        }

        const { access_token } = JSON.parse(token);

        const response = await axios.post(
          "http://localhost:8000/api/event-registrations",
          {
            umkm_id: id,
            event_id: id,
            status: true,
            date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
          },
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        alert(response.data.message);
      } catch (error: unknown) {
        console.error("There was an error!", error);

        if (axios.isAxiosError(error)) {
          // Handle Axios error
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            alert(
              `Failed to register for the event: ${error.response.data.message}`
            );
          } else {
            alert("Failed to register for the event.");
          }
        } else if (error instanceof Error) {
          // Handle generic error
          alert(`An error occurred: ${error.message}`);
        } else {
          alert("An unknown error occurred.");
        }
      }
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="event"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={`http://localhost:8000${image}`}
              width={400}
              height={400}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {nama_event}
              </h1>
              <p className="leading-relaxed">{description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <Image
                    src={"/images/date.svg"}
                    alt="date"
                    width={22}
                    height={22}
                    className="mr-3"
                  />
                  <span className="mr-3">{date}</span>
                </div>
                <div className="flex ml-6 items-center">
                  <Image
                    src={"/images/times.svg"}
                    alt="time"
                    width={22}
                    height={22}
                    className="mr-3"
                  />
                  <span className="mr-3">{time}</span>
                </div>
                <div className="flex ml-6 items-center">
                  <Image
                    src={"/images/location.svg"}
                    alt="location"
                    width={22}
                    height={22}
                    className="mr-3"
                  />
                  <span className="mr-3">{location}</span>
                </div>
              </div>
              <div className="flex">
                <button
                  className="flex w-full justify-center ml-auto text-white border-0 py-2 px-6 focus:outline-none hover:bg-meta-10 rounded bg-meta-5"
                  onClick={handleFollow}
                >
                  Ikuti
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
