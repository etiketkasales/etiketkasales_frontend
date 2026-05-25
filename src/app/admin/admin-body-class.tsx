"use client";

import { useEffect } from "react";

/** Маркер зоны админки на body — изоляция от глобального reset витрины. */
export function AdminBodyClass() {
  useEffect(() => {
    document.body.classList.add("admin-route");
    document.body.dataset.appZone = "admin";
    return () => {
      document.body.classList.remove("admin-route");
      delete document.body.dataset.appZone;
    };
  }, []);

  return null;
}
