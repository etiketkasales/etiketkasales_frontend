import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectOrder,
  setButtonDisabled,
} from "~/src/app/store/reducers/order.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IOrderReceiver, OrderType } from "../../model";

interface Props {
  type: OrderType;
}

export const useValidateOrder = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const { receiver, receiverCompanyId, deliveryAddressId, deliveryMethod } =
    useAppSelector(selectOrder);

  const isValidReceiver = useCallback((): boolean => {
    const hasError = FormUtils.getFormError({
      checkData: receiver,
      requiredFields: Object.keys(receiver) as (keyof IOrderReceiver)[],
    });

    if (hasError) {
      dispatch(
        addNotification({
          message: "Заполните информацию о получателе",
          type: "error",
          field: "global",
        }),
      );
      dispatch(setButtonDisabled(true));
      return false;
    }

    dispatch(setButtonDisabled(false));
    return true;
  }, [dispatch, receiver]);

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

    if (hasErrors) {
      dispatch(
        addNotification({
          message: "Заполните информацию о доставке",
          type: "error",
          field: "global",
        }),
      );
      dispatch(setButtonDisabled(true));
      return false;
    }
    dispatch(setButtonDisabled(false));
    return true;
  }, [receiverCompanyId, deliveryAddressId, deliveryMethod, dispatch, type]);

  const isValidOrder = useCallback((): boolean => {
    return isValidReceiver() && isValidParams();
  }, [isValidParams, isValidReceiver]);

  return {
    isValidOrder,
    isValidReceiver,
    isValidParams,
  };
};
