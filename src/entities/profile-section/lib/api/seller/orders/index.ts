import { apiClient, tryCatch } from "~/src/shared/lib/api";
import {
  ISellerOrder,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

export const getSellerOrders = async (
  limit?: number,
  offset?: number,
  status?: SellerOrderStatusCode,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ orders: ISellerOrder[] }>(
      `/seller/orders/`,
      {
        params: {
          limit,
          offset,
          status,
        },
      },
    );
    return res.data.orders;
  });
};

export const getSellerOrderById = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ order: ISellerOrder }>(
      `/seller/orders/${id}/`,
    );
    return res.data.order;
  });
};

export const acceptSellerOrderById = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<{ order: ISellerOrder }>(
      `/seller/orders/${id}/accept/`,
    );
    return res.data.order;
  });
};

export const sendSellerOrderById = async (
  id: number,
  track_number: string,
  comment: string,
) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<{ order: ISellerOrder }>(
      `/seller/orders/${id}/send/`,
      {
        track_number,
        comment,
      },
    );
    return res.data.order;
  });
};

export const rejectSellerOrderById = async (id: number, reason: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<{ order: ISellerOrder }>(
      `/seller/orders/${id}/reject/`,
      {
        reason,
      },
    );
    return res.data.order;
  });
};

export const syncSellerOrderCdek = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<{
      success: boolean;
      message?: string;
      verification?: {
        exists_in_cdek?: boolean;
        is_valid?: boolean;
        has_real_waybill?: boolean;
        register_error?: string | null;
      };
      cdek: {
        uuid?: string | null;
        cdek_number?: string | null;
        status?: string | null;
        register_error?: string | null;
        tracking_number?: string | null;
        exists_in_cdek?: boolean;
        is_valid?: boolean;
        has_real_waybill?: boolean;
      };
      order: ISellerOrder;
    }>(`/seller/orders/${id}/cdek/sync/`);
    return res.data;
  });
};

export const verifySellerOrderCdek = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{
      success: boolean;
      verification?: Record<string, unknown>;
      cdek: Record<string, unknown>;
    }>(`/seller/orders/${id}/cdek/verify/`);
    return res.data;
  });
};
