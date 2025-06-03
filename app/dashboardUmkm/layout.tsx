import UmkmClientLayout from "./umkm-client-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <UmkmClientLayout>
          {children}
        </UmkmClientLayout>
      </body>
    </html>
  );
}