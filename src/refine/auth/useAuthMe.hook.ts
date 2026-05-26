"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { waitForAuthBootstrap } from "~/src/shared/lib/api/authBootstrap";
import { useIsHydrated } from "~/src/shared/lib/hooks/useIsHydrated.hook";
import { authMeQueryOptions } from "./authMeCache";

export function useAuthMe(options?: { enabled?: boolean }) {
  const hydrated = useIsHydrated();
  const [authReady, setAuthReady] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.__etiketkaAuthBootstrapped),
  );

  useEffect(() => {
    if (authReady) return;
    let cancelled = false;
    void waitForAuthBootstrap().then(() => {
      if (!cancelled) setAuthReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [authReady]);

  const enabled = hydrated && authReady && (options?.enabled ?? true);
  const query = useQuery({
    ...authMeQueryOptions(),
    enabled,
    notifyOnChangeProps: ["data", "error"],
  });

  const perms = hydrated ? (query.data?.permissions ?? []) : [];

  return { ...query, hydrated, perms };
}
