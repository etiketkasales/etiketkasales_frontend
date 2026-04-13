import { apiClient } from "~/src/shared/lib/api/client.api";
import type {
  AdminChartBucket,
  AdminDashboardData,
  AdminDashboardPeriod,
  AdminDashboardResponse,
} from "./dashboard.types";

export async function fetchAdminDashboard(params: {
  period: AdminDashboardPeriod;
  chart_bucket: AdminChartBucket;
}): Promise<AdminDashboardData> {
  const { data } = await apiClient.get<AdminDashboardResponse>(
    "/admin/dashboard",
    { params },
  );
  if (!data.success || !data.data) {
    throw new Error(data.message ?? "Не удалось загрузить дашборд");
  }
  return data.data;
}

export async function adminBlockUser(userId: number, blockedReason: string) {
  const { data } = await apiClient.put<{ success: boolean; message?: string }>(
    `/admin/users/${userId}`,
    { status: "blocked", blocked_reason: blockedReason },
  );
  if (!data.success) {
    throw new Error(data.message ?? "Ошибка блокировки");
  }
  return data;
}

export async function adminUpdateOrderStatus(orderId: number, status: string) {
  const { data } = await apiClient.put<{ success: boolean; message?: string }>(
    `/admin/orders/${orderId}`,
    { status },
  );
  if (!data.success) {
    throw new Error(data.message ?? "Ошибка обновления заказа");
  }
  return data;
}
