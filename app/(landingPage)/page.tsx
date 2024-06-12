import { Metadata } from "next";
import React from "react";
import HeroLanding from "@/components/HeroLanding/HeroLanding";
import ContentLanding from "@/components/Content/ContentLanding";
import ChartFour from "@/components/Charts/ChartFour";
import ContactLanding from "@/components/ContatcLanding/ContactLanding";
import ChartFive from "@/components/Charts/ChartFive";
export const metadata: Metadata = {
  title: "SI UMKM",
  description: "This is Home Blog page",
  // other metadata
};

export default function landingPage() {
  return (
    <div>
      {/* <HeaderLanding /> */}
      <div className="container mx-auto p-4">
        <HeroLanding />
        <div className="container mx-auto p-4">
          <ChartFour />
          <ChartFive umkm={null} asosiasi={null} users={null} event={null} />
          {/* <ChartFour /> */}
          <ContentLanding />
          <ContactLanding />
          {/* <FooterLanding /> */}
        </div>
      </div>
    </div>
  );
}
