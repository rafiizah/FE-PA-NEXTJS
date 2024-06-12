"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import ChartFour from "@/components/Charts/ChartFour";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import ChartAs from "../Charts/ChartAs";
import ChartYearAs from "../Charts/ChartYearAs";
import ChartCountAs from "../Charts/ChartCountAs";

const TabsCharts = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="UMKM" title="UMKM">
            <div className="mb-2">
              <ChartFour />
            </div>
            <div className="mb-2">
              <ChartOne />
            </div>
            <ChartThree />
          </Tab>
          <Tab key="Asosiasi" title="Asosiasi">
            <div className="mb-2">
              <ChartAs />
            </div>
            <div className="mb-2">
              <ChartYearAs />
            </div>
            <ChartCountAs />
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsCharts;
