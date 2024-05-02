import React, { ReactNode, useState, useEffect } from "react";
import Image from "next/image";

interface CardDataStatsProps {
  title: string;
  updateTotalUMKM: () => void; // Fungsi untuk memperbarui total UMKM
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  updateTotalUMKM,
}) => {
  const [totalUMKM, setTotalUMKM] = useState<string>("Loading...");

  useEffect(() => {
    // Mengambil total UMKM dari API
    fetch("http://localhost:8000/api/jumlah-umkm")
      .then((response) => response.json())
      .then((data) => setTotalUMKM(data.jumlah_umkm))
      .catch((error) => {
        console.error("Error:", error);
        setTotalUMKM("Error");
      });
  }, [updateTotalUMKM]); // Menjalankan efek setiap kali updateTotalUMKM berubah

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <Image
          src={
            "/images/store-business-marketplace-shop-sale-buy-marketing-2-svgrepo-com.svg"
          }
          alt="Logo"
          width={29}
          height={29}
        />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {totalUMKM}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
