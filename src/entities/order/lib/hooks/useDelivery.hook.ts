import { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import {
  selectOrder,
  setOrderDeliveryAddressId,
  setOrderDeliveryMethod,
} from "~/src/app/store/reducers/order.slice";
import { getDeliveryMethodsForOrder } from "../api";

import { promiseWrapper } from "~/src/shared/lib";

import { IDeliveryMethodResponse } from "../../model";

const messageTexts = {
  noItemsToOrder: "Нет товаров к заказу",
  cantGetMethods: "Не удалось получить способы доставки",
  noDeliveryAddress: "Не выбран адрес доставки",
};

interface Props {
  deliveryAddressId: number;
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
  const { itemsToOrder } = useAppSelector(selectOrder);
  const [methods, setMethods] = useState<IDeliveryMethodResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const createMessage = useCallback(
    (message: string, type?: "error" | "warning") => {
      dispatch(
        addNotification({
          type: type || "error",
          message,
          field: "global",
        }),
      );
    },
    [dispatch],
  );

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
        if (!itemsToOrder) {
          createMessage(messageTexts.noItemsToOrder);
          return;
        }

        if (!deliveryAddressId) {
          createMessage(messageTexts.noDeliveryAddress);
          return;
        }

        const res = await getDeliveryMethodsForOrder(
          deliveryAddressId,
          itemsToOrder,
        );

        if (res) {
          setMethods(res);
        } else {
          createMessage(messageTexts.cantGetMethods);
        }
      },
    });
  }, [deliveryAddressId, createMessage, itemsToOrder]);

  useEffect(() => {
    if (!deliveryAddressId) return;
    dispatch(setOrderDeliveryAddressId(deliveryAddressId));
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
