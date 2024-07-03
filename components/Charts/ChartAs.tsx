import { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartAsState {
  series: {
    labels: string[];
    values: number[];
  };
}

function ChartAs() {
  const [state, setState] = useState<ChartAsState>({
    series: {
      values: [],
      labels: [],
    },
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
        setState({
          series: {
            labels: labels || [],
            values: values || [],
          },
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
      categories: state.series.labels || [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#3C50E0"],
    chart: {
      type: "bar",
      width: "100%", // Menambahkan properti width
      height: "350px",
      fontFamily: "Satoshi, sans-serif",
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
      data: state.series.values || [],
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
            height={"350px"}
          />
        </div>
      </div>
    </div>
  );
}

export default ChartAs;
