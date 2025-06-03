"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableListUmkm from "@/components/Tables/TableListUmkm";
import TableListAsosiasi from "@/components/Tables/TableListAsosiasi";

const TableFive = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto px-9">
        <div className="container mx-auto pt-28 px-9">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            List UMKM & Asosiasi
          </h2>
          <div className="flex w-full flex-col pt-4">
            <Tabs aria-label="Options">
              <Tab key="UMKM" title="UMKM">
                <TableListUmkm />
              </Tab>
              {/* <Tab key="Asosiasi" title="Asosiasi">
                <TableListAsosiasi />
              </Tab> */}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableFive;
