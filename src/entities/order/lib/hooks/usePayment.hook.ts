import {
  selectOrder,
  setOrderInfo,
} from "~/src/app/store/reducers/order.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { createOrderPayment, getPaymentMethodsForOrder } from "../api";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { IPaymentMethodResponse } from "../../model";

interface Props {
  isCompany: boolean;
  needLoad?: boolean;
}

const notificationMessages = {
  paymentMethodsError: "Не удалось получить способы оплаты",
  createPaymentError: "Не удалось создать платеж по заказу",
  createPaymentSuccess: "Платёж успешно создан",
};

// Получение и отдача способов оплаты
export const usePayment = ({ isCompany, needLoad = true }: Props) => {
  const dispatch = useAppDispatch();
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

  const onMethodClick = useCallback(
    (method: string) => {
      setChosenMethod(method);
      dispatch(setOrderInfo({ paymentMethod: method }));
    },
    [dispatch],
  );

  const createPaymentForOrder = useCallback(
    async (orderId: number) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res = await createOrderPayment(orderId);
          if (res) {
            createNotification(
              notificationMessages.createPaymentSuccess,
              "success",
            );
            window.open(res.payment_url);
          }
        },
        fallback: () => {
          createNotification(notificationMessages.createPaymentError, "error");
        },
        errorMessage: notificationMessages.createPaymentError,
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
          createNotification(notificationMessages.paymentMethodsError, "error");
        }
      },
      errorMessage: notificationMessages.paymentMethodsError,
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
