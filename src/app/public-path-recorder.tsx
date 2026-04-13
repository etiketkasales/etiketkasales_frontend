"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/** Последний URL вне /admin — для кнопки «Назад» в админке. */
export const LAST_PUBLIC_PATH_KEY = "last_public_path";

function PublicPathRecorderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname?.startsWith("/admin")) {
      const q = searchParams?.toString();
      const full = q ? `${pathname}?${q}` : pathname;
      sessionStorage.setItem(LAST_PUBLIC_PATH_KEY, full);
    }
  }, [pathname, searchParams]);

  return null;
}

export function PublicPathRecorder() {
  return (
    <Suspense fallback={null}>
      <PublicPathRecorderInner />
    </Suspense>
  );
}
