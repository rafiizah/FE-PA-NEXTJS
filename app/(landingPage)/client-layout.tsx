// app/(landingPage)/client-layout.tsx (UPDATED - Remove SessionProvider)
"use client";
import HeaderLanding from "@/components/HeaderLanding/HeaderLanding";
import FooterLanding from "@/components/FooterLanding/FooterLanding";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // console.log("ClientLayout mounted");
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <HeaderLanding />
          <main>{children}</main>
          {/* <FooterLanding /> */}
        </div>
      )}
    </div>
  );
}
