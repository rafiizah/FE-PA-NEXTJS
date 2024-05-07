"use client";
import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
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

    // Membuat objek FormData
    const formData = new FormData();
    // Menambahkan data ke FormData
    formData.append("nama_event", nama_event);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("description", description);
    // Menambahkan data gambar ke FormData
    if (image) {
      formData.append("image", image);
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8000/api/event/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };

    axios
      .request(config)
      .then((response: any) => {
        console.log(JSON.stringify(response.data));
        router.push("/admin");
        alert("Message sent successfully!");
      })
      .catch((error: any) => {
        console.log(error);
        // Tampilkan alert jika terjadi kesalahan
        alert("An error occurred. Message could not be sent.");
      });
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
                      placeholder="Masukkan Nama Lemgkap Asosiasi"
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
                      placeholder="Masukkan Nama Singkat Asosiasi"
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
                      placeholder="Masukkan Alamat Asosiasi"
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
                      placeholder="Masukkan kode Pos Asosiasi"
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
                    placeholder="Masukkan Deskripsi Usaha"
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
