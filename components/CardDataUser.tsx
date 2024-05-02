import React, { ReactNode, useState, useEffect, Children } from "react";
import Image from "next/image";

interface CardDataStatsProps {
  title: string;
  users: string;
  Children: ReactNode;
}

const CardDataUser: React.FC<CardDataStatsProps> = ({ title }) => {
  const [totalUser, setTotalUser] = useState<string>("Loading...");

  useEffect(() => {
    // Mengambil total user dari API
    fetch("http://localhost:8000/api/jumlah-user")
      .then((response) => response.json())
      .then((data) => setTotalUser(data.total_users))
      .catch((error) => {
        console.error("Error:", error);
        setTotalUser("Error");
      });
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <Image
          src={"/images/user-id-svgrepo-com.svg"}
          alt="Logo"
          width={29}
          height={29}
        />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {totalUser}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataUser;
