import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { createOrderPayment, getPaymentMethodsForOrder } from "../api";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { IPaymentMethodResponse } from "../../model";

interface Props {
  isCompany: boolean;
  needLoad?: boolean;
}

const errorMessages = {
  paymentMethods: "Не удалось получить способы оплаты",
  createPayment: "Не удалось создать платеж",
};

// Получение и отдача способов оплаты
export const usePayment = ({ isCompany, needLoad = true }: Props) => {
  const { itemsToOrder } = useAppSelector(selectOrder);
  const createNotification = useCreateNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [methods, setMethods] = useState<IPaymentMethodResponse[]>([]);
  const [chosenMethod, setChosenMethod] = useState<string>("");

  const amount = useMemo(
    () =>
      itemsToOrder.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [itemsToOrder],
  );

  const onMethodClick = useCallback((method: string) => {
    setChosenMethod(method);
  }, []);

  const createPaymentForOrder = useCallback(
    async (orderId: number) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res = await createOrderPayment(orderId);
          if (res) {
            createNotification("Платёж успешно создан", "success");
            window.open(res.payment_url);
          }
        },
        fallback: () => {
          createNotification("Не удалось создать платёж по заказу", "error");
        },
        errorMessage: errorMessages.createPayment,
      });
    },
    [createNotification],
  );

  const getPaymentMethods = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getPaymentMethodsForOrder(isCompany, amount);
        if (res && Array.isArray(res)) {
          setMethods(res);
        } else {
          createNotification(errorMessages.paymentMethods, "error");
        }
      },
      errorMessage: errorMessages.paymentMethods,
    });
  }, [amount, isCompany, createNotification]);

  useEffect(() => {
    if (!needLoad) return;
    getPaymentMethods();
  }, [getPaymentMethods, needLoad]);

  return {
    methods,
    loading,
    onMethodClick,
    createPaymentForOrder,
    chosenMethod,
  };
};
