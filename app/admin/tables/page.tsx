import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";
import TableOne from "@/components/Tables/TableOne";

import { Metadata } from "next";
import TableListEvent from "@/components/Tables/TableListEvent";
export const metadata: Metadata = {
  title: "Table UMKM | SI UMKM",
  description: "This is Tables UMKM",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Table" />

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12 mb-7">
          <TableOne />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <TableTwo />
        </div>
        <div className="col-span-12 xl:col-span-12">
          <TableListEvent />
        </div>
      </div>
    </>
  );
};

export default TablesPage;
