"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AsosiasiFacade } from "@/services/AsosiasiFacade";

interface CardDataStatsProps {
  title: string;
  asosiasi?: string;
  Children?: React.ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({ title }) => {
  const [totalAsosiasi, setTotalAsosiasi] = useState<string>("Loading...");

  useEffect(() => {
    const fetchData = async () => {
      const jumlah = await AsosiasiFacade.getJumlahAsosiasi();
      setTotalAsosiasi(jumlah);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-stroke px-4 py-6 rounded-lg flex flex-col items-center">
        <Image
          src="/images/hand-gesture-house-svgrepo-com.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <h2 className="title-font font-medium text-3xl text-gray-900">
          {totalAsosiasi}
        </h2>
        <p className="leading-relaxed">{title}</p>
      </div>
    </div>
  );
};

export default CardDataStats;
