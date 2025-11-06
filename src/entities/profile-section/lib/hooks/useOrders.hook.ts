import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getOrders } from "../api";

import { IOrder } from "~/src/entities/profile-section/model";

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetOrders = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getOrders();
        setOrders(res.orders);
      },
    });
  }, []);

  useEffect(() => {
    handleGetOrders();
  }, [handleGetOrders]);

  return {
    orders,
    loading,
  };
};
