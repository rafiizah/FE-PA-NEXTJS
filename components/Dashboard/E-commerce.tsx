"use client";
import React from "react";
import CardDataStats from "../CardDataUmkm";
import CardDataAsosiasi from "../CardDataAsosiasi";
import CardDataUser from "../CardDataUser";
import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import dynamic from "next/dynamic";
import ChartFour from "../Charts/ChartFour";
import CardDataEvent from "../CardDataEvent";
import TabsAdmin from "../Tabs/TabsAdmin";
const MapOne = dynamic(() => import("../Maps/MapOne"), {
  ssr: false,
});

const ECommerce: React.FC<{
  umkm: string | null;
  asosiasi: string | null;
  users: string | null;
  event: string | null;
}> = ({ umkm, asosiasi, users, event }) => {
  return (
    <>
      <Breadcrumb pageName="Dashboard" />
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
        <CardDataEvent
          title="Total Event"
          event={event ? event : "Data tidak tersedia"}
          Children={undefined}
        />
      </div>
      <div className="mt-4 w-full flex-col">
        <MapOne />
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartFour />
        <div className="col-span-12 xl:col-span-12 mb-7 ">
          <TabsAdmin />
        </div>
      </div>
    </>
  );
};

export default ECommerce;
