// appp/admin/layout.tsx
import AdminClientLayout from "./admin-client-layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}

