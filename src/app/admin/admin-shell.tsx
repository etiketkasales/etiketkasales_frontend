"use client";

import { ReactNode } from "react";
import { AdminGate } from "./admin-gate";
import AdminRoot from "./admin-root";

export default function AdminShell({ children }: { children: ReactNode }) {
  return (
    <AdminGate>
      <AdminRoot>{children}</AdminRoot>
    </AdminGate>
  );
}
