import AsosiasiClientLayout from "./asosiasi-client-layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AsosiasiClientLayout>
          {children}
        </AsosiasiClientLayout>
      </body>
    </html>
  );
}