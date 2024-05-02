"use client";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableThree from "../Tables/TableThree";
import CardDataStats from "../CardDataStats";
import CardDataAsosiasi from "../CardDataAsosiasi";
import CardDataUser from "../CardDataUser";
// import Map from "../Maps/TestMap";

// without this the component renders on server and throws an error
import dynamic from "next/dynamic";
import ChartFour from "../Charts/ChartFour";
import TableSeven from "../Tables/TableSeven";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const ECommerce: React.FC<{
  umkm: string | null;
  asosiasi: string | null;
  users: string | null;
}> = ({ umkm, asosiasi, users }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Total UMKM"
          umkm={umkm ? umkm : "Data tidak tersedia"}
          Children={undefined}
        />

        <CardDataAsosiasi
          title="Total Asosiasi"
          asosiasi={asosiasi ? asosiasi : "Data tidak tersedia"}
          Children={undefined}
        />

        <CardDataUser
          title="Total User"
          users={users ? users : "Data tidak tersedia"}
          Children={undefined}
        />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartFour /> */}
        {/* <ChartThree />
        <ChartTwo /> */}
        <div className="col-span-12 xl:col-span-12">
          <TableThree />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <TableSeven />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
