import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IOrderPickupPointData, IOrderReceiver, OrderType } from "../../model";

interface Props {
  type: OrderType;
}

/**
 * Возвращает функцию для валидации полей заказа.
 * Функция возвращает true, если не нашлось никаких ошибок.
 * Возвращает объект с функциями для валидации полей получателя, пункта выдачи заказа и других параметров для создания заказа.
 * @param {Props} type - Тип заказа (individual/company)
 * @returns {{
 *   isValidOrder: () => boolean,
 *   isValidObjects: () => boolean,
 *   isValidParams: () => boolean,
 * }}
 */
export const useValidateOrder = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const {
    receiver,
    receiverCompanyId,
    deliveryAddressId,
    deliveryMethod,
    pickupPoint,
  } = useAppSelector(selectOrder);

  const createNotification = useCallback(
    (message: string) => {
      dispatch(
        addNotification({
          message,
          type: "error",
          field: "global",
        }),
      );
      return false;
    },
    [dispatch],
  );

  const isValidObjects = useCallback((): boolean => {
    const receiverError = FormUtils.getFormError({
      checkData: receiver,
      requiredFields: Object.keys(receiver) as (keyof IOrderReceiver)[],
    });
    if (receiverError)
      return createNotification("Заполните информацию о получателе");

    const pickupPointError = FormUtils.getFormError({
      checkData: pickupPoint,
      requiredFields: Object.keys(
        pickupPoint,
      ) as (keyof IOrderPickupPointData)[],
    });
    if (pickupPointError)
      return createNotification("Заполните информацию о пункте выдачи");

    return true;
  }, [receiver, pickupPoint, createNotification]);

  const isValidParams = useCallback((): boolean => {
    const checkData = {
      receiverCompanyId,
      deliveryAddressId,
      deliveryMethod: deliveryMethod.code,
      pickupPoint: pickupPoint.pickup_point_code,
    };

    const isCompany = type === "company";

    const alwaysRequired: (keyof typeof checkData)[] = [
      "deliveryAddressId",
      "deliveryMethod",
      "pickupPoint",
    ];

    const hasErrors = FormUtils.getFormError({
      checkData,
      requiredFields: isCompany
        ? [...alwaysRequired, "receiverCompanyId"]
        : alwaysRequired,
    });

    if (hasErrors) {
      return createNotification("Заполните информацию о доставке");
    }

    return true;
  }, [
    receiverCompanyId,
    deliveryAddressId,
    deliveryMethod,
    pickupPoint,
    type,
    createNotification,
  ]);

  const isValidOrder = useCallback((): boolean => {
    return isValidObjects() && isValidParams();
  }, [isValidParams, isValidObjects]);

  return {
    isValidOrder,
    isValidObjects,
    isValidParams,
  };
};
