import React from "react";
import CardDataUmkmlanding from "../CardDataUmkmlanding";
import CardDataAsosiasilanding from "../CardDataAsosiasilanding";

const ChartFive: React.FC<{
  umkm: string | null;
  asosiasi: string | null;
  users: string | null;
  event: string | null;
}> = ({ umkm, asosiasi }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Jumlah UMKM & Asosiasi
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Our UMKM and UMKM association consist of diverse and passionate
            individuals and groups, all united in the mission to drive local
            economic growth and community well-being. Our members come from
            various industrial backgrounds, encompassing a wide range of
            business sectors that make significant contributions to the regional
            economy. Together, they build a strong network, support each other,
            share knowledge, and continuously innovate to achieve collective
            success. This diversity and solidarity are what make our UMKM and
            association an essential pillar in sustainable economic development.
          </p>
        </div>
        <div className="flex flex-wrap -m-4 text-center justify-center">
          <CardDataUmkmlanding
            title="Total UMKM"
            umkm={umkm ? umkm : "Data tidak tersedia"}
            Children={undefined}
          />

          <CardDataAsosiasilanding
            title="Total Asosiasi"
            asosiasi={asosiasi ? asosiasi : "Data tidak tersedia"}
            Children={undefined}
          />
        </div>
      </div>
    </section>
  );
};

export default ChartFive;
