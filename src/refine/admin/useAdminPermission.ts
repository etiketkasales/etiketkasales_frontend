"use client";

import { useAuthMe } from "~/src/refine/auth/useAuthMe.hook";

export function useAdminPermission(permission: string): boolean {
  const { data: me, hydrated } = useAuthMe();

  if (!hydrated) return false;
  return me?.permissions?.includes(permission) ?? false;
}
