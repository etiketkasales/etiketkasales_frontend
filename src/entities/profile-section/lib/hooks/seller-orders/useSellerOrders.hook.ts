import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib";
import { getSellerOrders } from "~/src/entities/profile-section/lib/api";

import { MessageI } from "~/src/shared/model";
import { ISellerOrder } from "~/src/entities/profile-section/model";

interface Props {
  needLoadEffect?: boolean;
}

export const useSellerOrders = ({ needLoadEffect }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const [orders, setOrders] = useState<ISellerOrder[]>([]);

  const promiseCallback = useCallback(
    async (callback: (...args: any) => Promise<void>) => {
      await promiseWrapper({
        setLoading,
        setError,
        callback,
      });
    },
    [],
  );

  const updateOrder = useCallback(
    (newOrder: ISellerOrder) => {
      if (!newOrder) return;

      const ordersWithoutOld = orders.filter(
        (order) => order.id !== newOrder.id,
      );
      setOrders([...ordersWithoutOld, newOrder]);
    },
    [orders],
  );

  const getOrders = useCallback(async () => {
    await promiseCallback(async () => {
      const res = await getSellerOrders();
      setOrders(res || []);
    });
  }, [promiseCallback]);

  useEffect(() => {
    if (needLoadEffect) {
      getOrders();
    }
  }, [getOrders, needLoadEffect]);

  return {
    orders,
    getOrders,
    updateOrder,
    promiseCallback,
    loading,
    error,
  };
};
