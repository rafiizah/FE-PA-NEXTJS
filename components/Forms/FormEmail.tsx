"use client";
import { useState } from "react";
import Cookies from "js-cookie";

const HomePage = () => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null); // Explicitly typing error as string or null

  // Membaca nilai token dari cookie saat komponen dimuat
  const savedToken = Cookies.get("token");
  const tokenObject = savedToken ? JSON.parse(savedToken) : null;
  const userId = tokenObject?.user?.id; // Extract user ID from the token object

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    try {
      const requestBody = {
        subject,
        body,
        user_id: userId, // Menggunakan nilai user_id dari token object
      };

      console.log("Request Body:", requestBody); // Log the request body for debugging

      const response = await fetch("http://localhost:8000/api/umkm/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

      console.log("Response Data:", responseData); // Log the response data for debugging

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send email");
      }

      setMessage(responseData.message);
      setError(null); // Reset error state on success
    } catch (error: any) {
      setError(error.message || "Failed to send email");
      setMessage("");
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <h1>Form Email</h1>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Form Email</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Masukkan Subject Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-2.5 block text-black dark:text-white">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Masukkan Isi Email"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                rows={5}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`bg-primary text-white py-3 px-8 rounded-md hover:bg-primary-dark transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Disable button when loading is true
          >
            {loading ? "Loading..." : "Kirim Email"}{" "}
            {/* Display "Loading..." text when loading is true */}
          </button>
        </form>
      </div>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default HomePage;
