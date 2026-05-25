"use client";

import { useStorefrontInit } from "~/src/shared/lib/hooks/useStorefrontInit.hook";
import { useClientLayout } from "../../lib/hooks/useClientLayout.hook";

export default function ClientInitializer() {
  useClientLayout();
  useStorefrontInit();

  return null;
}
