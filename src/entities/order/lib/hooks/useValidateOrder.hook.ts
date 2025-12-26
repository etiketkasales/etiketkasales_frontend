import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectOrder,
  setButtonDisabled,
} from "~/src/app/store/reducers/order.slice";
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

  // Создает уведомление и возвращает false для валидации
  const createNotification = useCallback(
    (message: string) => {
      dispatch(
        addNotification({
          message,
          type: "error",
          field: "global",
        }),
      );
      dispatch(setButtonDisabled(true));
      return false;
    },
    [dispatch],
  );

  // Валидация полей получателя и пункта выдачи заказа
  const isValidObjects = useCallback((): boolean => {
    let hasError = FormUtils.getFormError({
      checkData: receiver,
      requiredFields: Object.keys(receiver) as (keyof IOrderReceiver)[],
    });

    if (hasError) {
      return createNotification("Заполните информацию о получателе");
    } else {
      hasError = FormUtils.getFormError({
        checkData: pickupPoint,
        requiredFields: Object.keys(
          pickupPoint,
        ) as (keyof IOrderPickupPointData)[],
      });
      if (hasError)
        return createNotification("Заполните информацию о самовывозе");
    }

    dispatch(setButtonDisabled(false));
    return true;
  }, [dispatch, receiver, createNotification, pickupPoint]);

  // Валидация полей других параметров для создания заказа
  const isValidParams = useCallback(() => {
    const checkData = {
      receiverCompanyId,
      deliveryAddressId,
      deliveryMethod: deliveryMethod.code,
    };
    const isCopmany = type === "company";
    const alwaysRequired = ["deliveryAddressId", "deliveryMethod"];
    const hasErrors = FormUtils.getFormError({
      checkData,
      requiredFields: isCopmany
        ? ([
            ...alwaysRequired,
            "receiverCompanyId",
          ] as (keyof typeof checkData)[])
        : ([...alwaysRequired] as (keyof typeof checkData)[]),
    });

    if (hasErrors) return createNotification("Заполните информацию о доставке");

    dispatch(setButtonDisabled(false));
    return true;
  }, [
    receiverCompanyId,
    deliveryAddressId,
    deliveryMethod,
    dispatch,
    type,
    createNotification,
  ]);

  // Функия возвращает true, если не нашлось никаких ошибок
  const isValidOrder = useCallback((): boolean => {
    return isValidObjects() && isValidParams();
  }, [isValidParams, isValidObjects]);

  return {
    isValidOrder,
    isValidObjects,
    isValidParams,
  };
};
