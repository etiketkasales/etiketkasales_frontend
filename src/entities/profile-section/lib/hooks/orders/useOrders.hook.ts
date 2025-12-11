import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getOrders } from "~/src/entities/profile-section/lib/api";

import { IOrder, ISellerOrder } from "~/src/entities/profile-section/model";
import { UserRoleType } from "~/src/features/user/model";

interface Props {
  role: UserRoleType;
}

export const useOrders = ({ role }: Props) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [sellerOrders, setSellerOrders] = useState<ISellerOrder[]>([]); // обновить когда будет апи
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

  const handleGetSellerOrders = useCallback(async () => {
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
        if (role === "buyer") {
          await handleGetOrders();
        } else if (role === "seller") {
          setSellerOrders([]);
        }
      },
    });
  }, [role, handleGetOrders]);

  useEffect(() => {
    getRoleOrders();
  }, [getRoleOrders]);

  return {
    orders,
    sellerOrders,
    loading,
  };
};
