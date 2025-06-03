// app/(landingPage)/layout.tsx
import ClientLayout from "./client-layout";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}

