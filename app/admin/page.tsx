import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SI UMKM |  Dashboard UMKM",
  description: "This is Home Blog page",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ECommerce umkm={null} asosiasi={null} users={null} event={null} />
    </>
  );
}
