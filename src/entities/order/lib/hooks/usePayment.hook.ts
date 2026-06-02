import {
  selectOrder,
  setOrderInfo,
} from "~/src/app/store/reducers/order.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { createOrderPayment, getPaymentMethodsForOrder } from "../api";
import { navigateToOrderPayment } from "../navigateToOrderPayment";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { IPaymentMethodResponse, OrderType } from "../../model";

interface Props {
  orderType: OrderType;
  needLoad?: boolean;
}

const notificationMessages = {
  paymentMethodsError: "Не удалось получить способы оплаты",
  createPaymentError: "Не удалось создать платеж по заказу",
};

export const usePayment = ({ orderType, needLoad = true }: Props) => {
  const dispatch = useAppDispatch();
  const { itemsToOrder, paymentMethod, receiverCompanyId } =
    useAppSelector(selectOrder);
  const createNotification = useCreateNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [methods, setMethods] = useState<IPaymentMethodResponse[]>([]);
  const [chosenMethod, setChosenMethod] = useState<string>("");

  const isCompanyCheckout =
    orderType === "company" && Number(receiverCompanyId) > 0;

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
      let redirected = false;

      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res = await createOrderPayment(orderId, {
            payment_method: paymentMethod || undefined,
            company_id:
              paymentMethod === "invoice" && Number(receiverCompanyId) > 0
                ? Number(receiverCompanyId)
                : undefined,
          });
          if (!res) {
            throw new Error(notificationMessages.createPaymentError);
          }

          if (navigateToOrderPayment(res, orderId)) {
            redirected = true;
          }
        },
        fallback: (msg) => {
          if (!redirected) {
            createNotification(
              msg || notificationMessages.createPaymentError,
              "error",
            );
          }
        },
      });

      return redirected;
    },
    [createNotification, paymentMethod, receiverCompanyId],
  );

  const getPaymentMethods = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getPaymentMethodsForOrder(isCompanyCheckout, amount);
        if (res && Array.isArray(res)) {
          setMethods(res);
        } else {
          createNotification(notificationMessages.paymentMethodsError, "error");
        }
      },
      errorMessage: notificationMessages.paymentMethodsError,
    });
  }, [amount, isCompanyCheckout, createNotification]);

  useEffect(() => {
    if (!needLoad) return;
    void getPaymentMethods();
  }, [getPaymentMethods, needLoad]);

  return {
    methods,
    loading,
    onMethodClick,
    createPaymentForOrder,
    chosenMethod,
    isCompanyCheckout,
  };
};
