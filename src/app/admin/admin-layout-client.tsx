"use client";

import { ReactNode } from "react";
import { AdminBodyClass } from "./admin-body-class";
import AdminShell from "./admin-shell";

export function AdminLayoutClient({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminBodyClass />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
