"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UMKMFacade } from "@/services/UMKMFacade";

interface CardDataStatsProps {
  title: string;
  umkm?: string;
  Children?: React.ReactNode;
}

const CardDataUmkmlanding: React.FC<CardDataStatsProps> = ({ title }) => {
  const [totalUMKM, setTotalUMKM] = useState<string>("Loading...");

  useEffect(() => {
    const fetchUMKM = async () => {
      const total = await UMKMFacade.getTotalUMKM();
      setTotalUMKM(total);
    };

    fetchUMKM();
  }, []);

  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-stroke px-4 py-6 rounded-lg flex flex-col items-center">
        <Image
          src="/images/store-business-marketplace-shop-sale-buy-marketing-2-svgrepo-com.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <h2 className="title-font font-medium text-3xl text-gray-900">
          {totalUMKM}
        </h2>
        <p className="leading-relaxed">{title}</p>
      </div>
    </div>
  );
};

export default CardDataUmkmlanding;
