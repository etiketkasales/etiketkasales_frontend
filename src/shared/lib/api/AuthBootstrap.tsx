"use client";

import { ReactNode, useEffect, useState } from "react";
import { waitForAuthBootstrap } from "./authBootstrap";

type Props = {
  children: ReactNode;
};

/**
 * Держит дерево приложения до синхронизации JWT (новая вкладка / HMR).
 */
export function AuthBootstrap({ children }: Props) {
  const [ready, setReady] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.__etiketkaAuthBootstrapped),
  );

  useEffect(() => {
    if (ready) return;
    let cancelled = false;
    void waitForAuthBootstrap().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ready]);

  if (!ready) {
    return null;
  }

  return <>{children}</>;
}
