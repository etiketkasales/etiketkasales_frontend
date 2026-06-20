import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getOrders } from "~/src/entities/profile-section/lib/api";

import { IOrder, ISellerOrder } from "~/src/entities/profile-section/model";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  role: UserRoleType;
  enabled?: boolean;
}

/**
 * Hook to get orders for given role.
 */
export const useOrders = ({ role, enabled = true }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [sellerOrders, setSellerOrders] = useState<ISellerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getBuyerOrders = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      errorMessage: "Не удалось загрузить заказы",
      callback: async () => {
        const res = await getOrders();
        setOrders(Array.isArray(res?.orders) ? res.orders : []);
        setError(null);
      },
      fallback: () => {
        setOrders([]);
        setError("Не удалось загрузить заказы");
      },
    });
  }, []);

  const getSellerOrders = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        setSellerOrders([]);
      },
    });
  }, []);

  const reload = useCallback(async () => {
    if (!enabled) {
      return;
    }

    switch (role) {
      case "buyer":
        await getBuyerOrders();
        break;
      case "seller":
        await getSellerOrders();
        break;
    }
  }, [enabled, role, getBuyerOrders, getSellerOrders]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    void reload();
  }, [enabled, reload]);

  return {
    orders,
    sellerOrders,
    loading,
    error,
    reload,
  };
};
