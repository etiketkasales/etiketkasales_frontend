"use client";

import { useSyncExternalStore } from "react";

/** false на SSR и при первом проходе гидрации — совпадает с серверным HTML. */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
