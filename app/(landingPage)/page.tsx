// app/(landingPage)/page.tsx
import { Metadata } from "next";
import HeroLanding from "@/components/HeroLanding/HeroLanding";
import ContentLanding from "@/components/Content/ContentLanding";
import ChartFour from "@/components/Charts/ChartFour";
import ContactLanding from "@/components/ContatcLanding/ContactLanding";
import ChartFive from "@/components/Charts/ChartFive";

export const metadata: Metadata = {
  title: "SI UMKM",
  description: "This is Home Blog page",
};

export default function LandingPage() {
  return (
    <div>
      <HeroLanding />
      <ContentLanding />
      <ChartFour />
      <ContactLanding />
      <ChartFive umkm={null} asosiasi={null} users={null} event={null} />
    </div>
  );
}
