"use client";

import { ReactNode, useEffect, useState } from "react";
import { waitForAuthBootstrap } from "./authBootstrap";
import Loader from "~/src/shared/ui/loader";

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
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "var(--neutral-100, #f5f5f5)",
        }}
      >
        <Loader radius={28} />
      </div>
    );
  }

  return <>{children}</>;
}
