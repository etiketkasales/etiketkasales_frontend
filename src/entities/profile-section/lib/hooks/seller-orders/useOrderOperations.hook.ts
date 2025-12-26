import { useCallback, useMemo } from "react";
import { useSellerOrders } from ".";

import {
  acceptSellerOrderById,
  rejectSellerOrderById,
  sendSellerOrderById,
} from "~/src/entities/profile-section/lib/api";
import {
  IRejectOrderForm,
  ISendOrderForm,
  OrderOperationFormData,
  SellerOrderOperationType,
} from "~/src/entities/profile-section/model";

/**
 * Hook для работы with order operations
 * @return {Record <SellerOrderOperationType, (orderId: number, formData: OrderOperationFormData | null) => Promise<void>>}
 */
export const useOrderOperations = () => {
  const { promiseCallback, updateOrder } = useSellerOrders({
    needLoadEffect: false,
  });

  const acceptOrder = useCallback(
    async (id: number, _: OrderOperationFormData | null) => {
      await promiseCallback(async () => {
        const newOrder = await acceptSellerOrderById(id);
        updateOrder(newOrder);
      });
    },
    [promiseCallback, updateOrder],
  );

  const rejectOrder = useCallback(
    async (id: number, formData: OrderOperationFormData | null) => {
      await promiseCallback(async () => {
        if (!formData) return;
        const fd = formData as IRejectOrderForm;
        // Костыль: поломается, если передавать неправильную форму, дальше так же
        // TODO: придумать как исправить этот костыль

        const newOrder = await rejectSellerOrderById(id, fd.rejectReason);
        updateOrder(newOrder);
      });
    },
    [promiseCallback, updateOrder],
  );

  const sendOrder = useCallback(
    async (orderId: number, formData: OrderOperationFormData | null) => {
      if (!formData) return;
      const fd = formData as ISendOrderForm;

      await promiseCallback(async () => {
        const newOrder = await sendSellerOrderById(
          orderId,
          fd.track_number,
          fd.comment,
        );
        updateOrder(newOrder);
      });
    },
    [promiseCallback, updateOrder],
  );

  const orderOperationsMap: Record<
    SellerOrderOperationType,
    (orderId: number, formData: OrderOperationFormData | null) => Promise<void>
  > = useMemo(
    () => ({
      accept: acceptOrder,
      reject: rejectOrder,
      send: sendOrder,
    }),
    [rejectOrder, sendOrder, acceptOrder],
  );

  return {
    orderOperationsMap,
  };
};
