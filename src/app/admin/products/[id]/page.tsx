"use client";

import { useParams } from "next/navigation";
import { AdminProductForm } from "../admin-product-form";

export default function AdminProductEditPage() {
  const params = useParams();
  const raw = params?.id;
  const id = typeof raw === "string" ? parseInt(raw, 10) : 0;

  if (!Number.isFinite(id) || id < 1) {
    return null;
  }

  return <AdminProductForm mode="edit" productId={id} />;
}
