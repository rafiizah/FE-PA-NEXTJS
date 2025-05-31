"use client";
import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import { FormEventFacade } from "@/services/FormEventFacade";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useState, useEffect, ChangeEvent, ChangeEventHandler } from "react";
export const metadata: Metadata = {
  title: "Form Event Page | SI UMKM",
  description: "This is Form Event page ",
  // other metadata
};

interface FormEventProps {
  id: string; // Define the 'id' prop here
}

const FormEvent: React.FC<FormEventProps> = ({ id }) => {
  const router = useRouter();
  const [nama_event, setNama_event] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const axios = require("axios");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const imageData = e.target.files[0];
      // Validasi apakah file adalah gambar dan memiliki ekstensi yang diizinkan
      const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
      if (!allowedExtensions.test(imageData.name)) {
        console.error("The image must be a file of type: jpeg, png, jpg, gif.");
        return;
      }
      // Set image state dengan objek File yang benar
      setImage(imageData);
    }
  };

  const storePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await FormEventFacade.createEvent(
        nama_event,
        date,
        time,
        location,
        description,
        image
      );
      alert("Message sent successfully!");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("An error occurred. Message could not be sent.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Form Event" />

      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-10">
          {/* <!-- UMKM Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Event Form
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Nama Event
                    </label>
                    <input
                      type="text"
                      value={nama_event}
                      onChange={(e) => setNama_event(e.target.value)}
                      placeholder="Masukkan Nama Event"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Tanggal Event
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Masukkan Tanggal Event"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Waktu Event
                    </label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="Masukkan Waktu Event"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Lokasi Event
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Masukkan Lokasi Event"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label
                    className="mb-2.5 block text-black dark:text-white"
                    htmlFor="file_input"
                  >
                    Gambar Event
                  </label>
                  <input
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    id="file_input"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Deskripsi Event
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masukkan Deskripsi Event"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className={`flex w-full justify-center rounded bg-primary p-3 font-medium text-gray  ${
                    isLoading ? "opacity-50 pointer-events-none" : ""
                  }`}
                  onClick={storePost}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormEvent;
