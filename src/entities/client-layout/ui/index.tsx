"use client";
import React from "react";
import { useClientLayout } from "../lib/hooks/useClientLayout.hook";
import { useInitialize } from "~/src/shared/lib/hooks/useInitialize.hook";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useClientLayout();
  useInitialize();

  return <>{children}</>;
}
