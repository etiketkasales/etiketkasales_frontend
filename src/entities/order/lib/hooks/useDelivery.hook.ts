import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import {
  setOrderDeliveryMethod,
  setOrderInfo,
} from "~/src/app/store/reducers/order.slice";
import { getDeliveryMethodsForOrder } from "../api";

import { promiseWrapper } from "~/src/shared/lib";

import { IDeliveryMethodResponse } from "../../model";

const messageTexts = {
  cantGetMethods: "Не удалось получить способы доставки",
  noDeliveryAddress: "Не выбран адрес доставки",
};

interface Props {
  deliveryAddressId: string | number;
  canLoad: boolean;
}

/**
 * Hook для получения и выставления в стейт методов доставки
 * @param {number} deliveryAddressId - ID адреса доставки
 * @param {boolean} canLoad - Может ли загружать методы доставки
 * @returns {Object} - Объект с методами доставки, индикатором загрузки и функцией для выбора метода доставки
 */
export const useDelivery = ({ deliveryAddressId, canLoad }: Props) => {
  const dispatch = useAppDispatch();
  const [methods, setMethods] = useState<IDeliveryMethodResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createMessage = useCreateNotification();

  const chooseDeliveryMethod = useCallback(
    (method: IDeliveryMethodResponse) => {
      if (!method.code.includes("sdek")) {
        // Если поменяется код сдэка - поменять.
        createMessage("Пока доставка только по СДЭК");
        return false;
      }
      dispatch(setOrderDeliveryMethod(method));
      return true;
    },
    [dispatch],
  );

  // Получает и выставляет в стейт методы доставки
  const getMethods = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getDeliveryMethodsForOrder();

        if (res) {
          setMethods(res);
        } else {
          createMessage(messageTexts.cantGetMethods);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (!deliveryAddressId) {
      createMessage(messageTexts.noDeliveryAddress);
      return;
    }

    dispatch(setOrderInfo({ deliveryAddressId }));
  }, [deliveryAddressId, dispatch]);

  useEffect(() => {
    if (canLoad) {
      getMethods();
    }
  }, [getMethods, canLoad]);

  return {
    loading,
    methods,
    chooseDeliveryMethod,
  };
};
