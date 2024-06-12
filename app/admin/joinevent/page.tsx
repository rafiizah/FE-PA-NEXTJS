import DataJoinEvent from "@/components/Tables/DataJoinEvent";
import Breadcrumb from "@/components/Charts/Breadcrumbs/Breadcrumb";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <Breadcrumb pageName="Data Join Event" />
      <DataJoinEvent />
    </div>
  );
};

export default Home;
