"use client";
import { useInitialize } from "~/src/shared/lib/hooks";
import { useClientLayout } from "../../lib/hooks/useClientLayout.hook";

export default function ClientInitializer() {
  useClientLayout();
  useInitialize();
  return null;
}
