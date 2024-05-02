import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Table UMKM | SI UMKM",
  description: "This is Tables UMKM",
  // other metadata
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Table UMKM" />

      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </>
  );
};

export default TablesPage;
