"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Редирект: создание товара открывается в Drawer на списке `/admin/products`. */
export default function AdminProductNewRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/admin/products?create=1");
  }, [router]);
  return null;
}
