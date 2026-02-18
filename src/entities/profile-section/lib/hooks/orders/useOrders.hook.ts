import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getOrders } from "~/src/entities/profile-section/lib/api";

import { IOrder, ISellerOrder } from "~/src/entities/profile-section/model";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  role: UserRoleType;
}

/**
 * Hook to get orders for given role.
 *
 * @param {Props} Props object that contains role.
 * @returns {Object} An object containing orders, sellerOrders, and loading status.
 */
export const useOrders = ({ role }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [sellerOrders, setSellerOrders] = useState<ISellerOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBuyerOrders = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getOrders();
        setOrders(res.orders);
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

  const getRoleOrders = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        switch (role) {
          case "buyer":
            await getBuyerOrders();
            break;
          case "seller":
            await getSellerOrders();
            break;
        }
      },
    });
  }, [role, getBuyerOrders, getSellerOrders]);

  useEffect(() => {
    getRoleOrders();
  }, [getRoleOrders]);

  return {
    orders,
    sellerOrders,
    loading,
  };
};
