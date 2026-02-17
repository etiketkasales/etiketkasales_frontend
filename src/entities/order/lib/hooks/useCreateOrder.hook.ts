import { useCallback, useState } from "react";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { createOrder, createOrderForCompany } from "../api";
import { promiseWrapper } from "~/src/shared/lib";

import { useAppSelector } from "~/src/app/store/hooks";
import { usePayment, useValidateOrder } from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { OrderType, OrderStageType, ICreatedOrderDto } from "../../model";
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
  const createNotification = useCreateNotification();
  const { createPaymentForOrder: createPayment } = usePayment({
    isCompany: type === "company",
    needLoad: false,
  });

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

  const createOrderByType = useCallback(async () => {
    const defaultParams = {
      ...receiver,
      pickup_point_code: pickupPoint.pickup_point_code!,
      items: itemsToOrder,
      delivery_address_id: deliveryAddressId,
      delivery_method: deliveryMethod.code,
    };

    let res: IGetData<ICreatedOrderDto> | null = null;
    switch (type) {
      case "person":
        res = await createOrder({
          ...defaultParams,
        });
        return res;
      case "company":
        res = await createOrderForCompany({
          ...defaultParams,
          company_id: receiverCompanyId,
        });
        return res;
      default:
        return res;
    }
  }, [
    type,
    receiverCompanyId,
    deliveryAddressId,
    deliveryMethod,
    itemsToOrder,
    receiver,
    pickupPoint,
  ]);

  // Создание заказа и платежа
  const onCreateOrder = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      errorMessage,
      callback: async () => {
        if (!isValidOrder()) return;

        const res = await createOrderByType();
        if (!res) {
          requestCallback(false);
          return;
        }

        requestCallback(true);

        if (res.data && res.data.id) {
          await createPayment(res.data.id);
        }
      },
      fallback: () => {
        requestCallback(false);
      },
    });
  }, [requestCallback, isValidOrder, createPayment, createOrderByType]);

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
