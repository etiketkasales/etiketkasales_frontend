import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib";
import { getSellerOrders } from "~/src/entities/profile-section/lib/api";

import { MessageI } from "~/src/shared/model";
import { ISellerOrder } from "~/src/entities/profile-section/model";

interface Props {
  needLoadEffect?: boolean;
}

/**
 * useSellerOrders - a hook that provides functions and state to interact
 *   with seller orders.
 *
 * @param {Props} Props object that contains needLoadEffect.
 * @returns {Object} - an object containing the following properties:
 *   orders - an array of ISellerOrder,
 *   getOrders - a function to get the seller orders,
 *   updateOrder - a function to update a seller order,
 *   promiseCallback - a function that wraps a promise with a callback,
 *   loading - a boolean indicating whether the orders are being loaded,
 *   error - a string indicating the error message.
 */
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
