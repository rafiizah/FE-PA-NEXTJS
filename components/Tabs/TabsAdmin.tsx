"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TableOne from "@/components/Tables/TableOne";
import TableTwo from "@/components/Tables/TableTwo";
import TableListEvent from "@/components/Tables/TableListEvent";

const TableFive = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="UMKM" title="UMKM">
            <TableOne />
          </Tab>
          {/* <Tab key="Asosiasi" title="Asosiasi">
            <TableTwo />
          </Tab>

          <Tab key="Event" title="Event">
            <TableListEvent />
          </Tab> */}
        </Tabs>
      </div>
    </section>
  );
};

export default TableFive;
