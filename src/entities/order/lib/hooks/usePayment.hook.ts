import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { promiseWrapper } from "~/src/shared/lib";
import { getPaymentMethodsForOrder } from "../api";

import { IPaymentMethodResponse } from "../../model";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";

interface Props {
  isCompany: boolean;
}

const errorMessage = "Не удалось получить способы оплаты";

export const usePayment = ({ isCompany }: Props) => {
  const dispatch = useAppDispatch();
  const { itemsToOrder } = useAppSelector(selectOrder);
  const [loading, setLoading] = useState<boolean>(false);
  const [methods, setMethods] = useState<IPaymentMethodResponse[]>([]);
  const [chosenMethod, setChosenMethod] = useState<string>("");

  const amount = useMemo(
    () => itemsToOrder.reduce((acc, item) => acc + item.weight, 0),
    [itemsToOrder],
  );

  const onMethodClick = useCallback((method: string) => {
    setChosenMethod(method);
  }, []);

  const getPaymentMethods = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getPaymentMethodsForOrder(isCompany, amount);
        if (res && Array.isArray(res)) {
          setMethods(res);
        } else {
          dispatch(
            addNotification({
              message: errorMessage,
              type: "error",
              field: "global",
            }),
          );
        }
      },
      errorMessage,
    });
  }, [dispatch, amount, isCompany]);

  useEffect(() => {
    getPaymentMethods();
  }, [getPaymentMethods]);

  return {
    methods,
    loading,
    onMethodClick,
    chosenMethod,
  };
};
