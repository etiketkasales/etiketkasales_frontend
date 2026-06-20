import { apiClient } from "~/src/shared/lib/api/client.api";

export type BulkProductAction =
  | "approve"
  | "reject"
  | "hide"
  | "archive"
  | "activate";

export async function bulkProductAction(
  action: BulkProductAction,
  productIds: number[],
  reason = "",
): Promise<{ success: boolean; message?: string }> {
  const { data } = await apiClient.post<{
    success: boolean;
    message?: string;
  }>("/admin/products/bulk-action", {
    action,
    product_ids: productIds,
    reason,
  });
  return data;
}

/** Массовые действия из очереди модерации (право admin.moderation.edit). */
export async function bulkModerationAction(
  action: "approve" | "reject",
  productIds: number[],
  reason = "",
): Promise<{ success: boolean; message?: string }> {
  const { data } = await apiClient.post<{
    success: boolean;
    message?: string;
  }>("/admin/moderation/bulk", {
    action,
    product_ids: productIds,
    reason,
  });
  return data;
}

export async function approveProduct(id: number, comment = ""): Promise<void> {
  await apiClient.post("/admin/moderation/approve", {
    type: "product",
    id,
    comment,
  });
}

export async function rejectProduct(id: number, reason: string): Promise<void> {
  await apiClient.post("/admin/moderation/reject", {
    type: "product",
    id,
    reason,
  });
}
