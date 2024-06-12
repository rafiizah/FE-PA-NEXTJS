"use client";
import { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartFourState {
  series: {
    labels: any[];
    values: number[]; // Merubah properti menjadi 'values'
  }[];
}

function ChartAs() {
  const [state, setState] = useState<ChartFourState>({
    series: [
      {
        values: [], // Mengubah properti menjadi 'values'
        labels: [],
      },
    ],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/chart-dom-as");
      if (response.ok) {
        const data = await response.json();
        const { labels, values } = data;
        const newSeriesData = [
          {
            labels: labels,
            values: values, // Merubah properti menjadi 'values'
          },
        ];
        setState({
          series: newSeriesData,
        });
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options: ApexOptions = {
    xaxis: {
      categories: state.series[0]?.labels || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#3C50E0"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 4,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "inter",
      markers: {
        radius: 99,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: true,
      },
    },
  };

  const seriesData = [
    {
      name: "Jumlah Asosiasi",
      data: state.series[0]?.values || [], // Menggunakan properti 'values'
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div>
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Jumlah Asosiasi
        </h3>
      </div>

      <div className="mb-2">
        <div id="chartFour" className="-ml-5">
          <ApexCharts
            options={options}
            series={seriesData}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartAs;
