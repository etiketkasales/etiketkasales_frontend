"use client";

import { useQuery } from "@tanstack/react-query";
import { useIsHydrated } from "~/src/shared/lib/hooks/useIsHydrated.hook";
import { authMeQueryOptions } from "./authMeCache";

export function useAuthMe(options?: { enabled?: boolean }) {
  const hydrated = useIsHydrated();
  const enabled = hydrated && (options?.enabled ?? true);
  const query = useQuery({
    ...authMeQueryOptions(),
    enabled,
    notifyOnChangeProps: ["data", "error"],
  });

  const perms = hydrated ? (query.data?.permissions ?? []) : [];

  return { ...query, hydrated, perms };
}
