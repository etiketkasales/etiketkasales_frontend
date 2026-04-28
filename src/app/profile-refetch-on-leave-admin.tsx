"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useUser } from "~/src/features/user/lib/hooks";

/** После /auth/me (админка) Redux может расходиться с /users/profile — обновляем при выходе из /admin. */
export function ProfileRefetchOnLeaveAdmin() {
  const pathname = usePathname();
  const prev = useRef<string | undefined>(undefined);
  const { handleGetUser } = useUser();

  useEffect(() => {
    const wasAdmin = prev.current?.startsWith("/admin");
    const nowAdmin = pathname?.startsWith("/admin");
    if (wasAdmin && !nowAdmin && pathname) {
      void handleGetUser();
    }
    prev.current = pathname;
  }, [pathname, handleGetUser]);

  return null;
}
