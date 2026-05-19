"use client";

import { Alert } from "antd";
import { usePathname } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";

/**
 * Предупреждение для аккаунтов со статусом restricted на витрине (не в админке).
 */
export default function AccountStatusBanner() {
  const pathname = usePathname();
  const isLoggedIn = useAppSelector((s) => s.user.isLoggedIn);
  const status = useAppSelector((s) => s.user.userInfo.status);

  if (!pathname || pathname.startsWith("/admin")) {
    return null;
  }

  if (!isLoggedIn || status !== "restricted") {
    return null;
  }

  return (
    <Alert
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1100,
        margin: 0,
        borderRadius: 0,
      }}
      type="warning"
      showIcon
      message="Аккаунт ограничен"
      description="Оформление заказов и изменение корзины недоступны. Если считаете это ошибкой — напишите в поддержку."
    />
  );
}
