import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useValidateOrder } from ".";
import { createOrder, createOrderForCompany } from "../api";
import { promiseWrapper } from "~/src/shared/lib";

import { OrderType, OrderStageType } from "../../model";

interface Props {
  type: OrderType;
  stage: OrderStageType;
  setStage: (stage: OrderStageType) => void;
}

const errorMessage = "Не удалось создать заказ";

export const useCreateOrder = ({ type, stage, setStage }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { receiver, receiverCompanyId, deliveryAddressId, deliveryMethod } =
    useAppSelector(selectOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const { isValidOrder } = useValidateOrder({ type });

  const createNotification = useCallback(
    (msg: string, type?: "error" | "success") => {
      dispatch(
        addNotification({
          message: msg,
          type: type || "error",
          field: "global",
        }),
      );
    },
    [dispatch],
  );

  const requestCallback = useCallback(
    (success: boolean) => {
      if (success) {
        createNotification("Заказ успешно создан", "success");
        push(`/order/done`);
      } else {
        createNotification(errorMessage, "error");
        push("/order/error");
      }
    },
    [push, createNotification],
  );

  const onCreateOrder = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      errorMessage,
      callback: async () => {
        if (!isValidOrder()) return;

        let res: { success: boolean } | null = null;
        const defaultParams = {
          ...receiver,
          delivery_address_id: deliveryAddressId,
          delivery_method: deliveryMethod.code,
        };

        if (type === "person") {
          res = await createOrder({
            ...defaultParams,
          });
        } else if (type === "company") {
          res = await createOrderForCompany({
            ...defaultParams,
            company_id: receiverCompanyId,
          });
        }
        requestCallback(true);
      },
      fallback: () => {
        requestCallback(false);
      },
    });
  }, [
    requestCallback,
    isValidOrder,
    deliveryAddressId,
    deliveryMethod,
    receiver,
    receiverCompanyId,
    type,
  ]);

  const onCreateButtonClick = useCallback(async () => {
    if (stage === "confirm") {
      await onCreateOrder();
    } else if (stage === "choose_pvz") {
      setStage("confirm");
      if (window) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [stage, setStage, onCreateOrder]);

  return {
    loading,
    onCreateButtonClick,
  };
};
