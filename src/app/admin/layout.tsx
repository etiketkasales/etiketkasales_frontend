import { ReactNode } from "react";
import { AdminGate } from "./admin-gate";
import AdminRoot from "./admin-root";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGate>
      <AdminRoot>{children}</AdminRoot>
    </AdminGate>
  );
}
