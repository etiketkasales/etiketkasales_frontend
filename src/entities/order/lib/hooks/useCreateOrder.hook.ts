import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useValidateOrder } from ".";
import { createOrder, createOrderForCompany, createOrderPayment } from "../api";
import { promiseWrapper } from "~/src/shared/lib";

import { OrderType, OrderStageType } from "../../model";
import { IGetData } from "~/src/shared/model";

interface Props {
  type: OrderType;
  stage: OrderStageType;
  setStage: (stage: OrderStageType) => void;
}

const errorMessage = "Не удалось создать заказ";

/**
 * Возвращает функцию для создания заказа и платёжа.
 * Функция возвращает объект с полями loading и onCreateButtonClick.
 * @param {Props} type - Тип заказа (individual/company)
 * @param {Props} stage - Стадия заказа (choose_pvz/confirm)
 * @param {Props} setStage - Функция для смены стадии заказа
 * @returns {{
 *   loading: boolean,
 *   onCreateButtonClick: () => Promise<void>,
 * }}
 */
export const useCreateOrder = ({ type, stage, setStage }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const {
    receiver,
    receiverCompanyId,
    deliveryAddressId,
    deliveryMethod,
    pickupPoint,
    itemsToOrder,
  } = useAppSelector(selectOrder);
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

  // Создание плашек уведомлений
  const requestCallback = useCallback(
    (success: boolean) => {
      if (success) {
        createNotification("Заказ успешно создан", "success");
      } else {
        createNotification(errorMessage, "error");
      }
    },
    [createNotification],
  );

  // Создание платёжа
  const createPayment = useCallback(
    async (orderId: number) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res = await createOrderPayment(orderId);
          if (res?.payment_url) {
            createNotification("Платёж создан", "success");
            push(res.payment_url);
          } else createNotification("Не удалось создать платёж", "error");
        },
      });
    },
    [createNotification, push],
  );

  // Создание заказа — после передача айди в платёж и создание
  const onCreateOrder = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      errorMessage,
      callback: async () => {
        if (!isValidOrder()) return;

        let res: IGetData<{ id: number }> | null = null;
        const defaultParams = {
          ...receiver,
          pickup_point_code: pickupPoint.pickup_point_code!,
          items: itemsToOrder,
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

        if (res?.success) {
          if (res.data && res.data.id) {
            await createPayment(res.data.id);
          }
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
    pickupPoint,
    type,
    createPayment,
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
