"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthMeCached } from "~/src/refine/auth/authMeCache";

export function useAdminPermission(permission: string): boolean {
  const { data: me } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: () => getAuthMeCached(),
  });

  return me?.permissions?.includes(permission) ?? false;
}
