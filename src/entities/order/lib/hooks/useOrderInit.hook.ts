import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import {
  selectOrder,
  setButtonDisabled,
  setOrderCompanyId,
  setOrderReceiverData,
} from "~/src/app/store/reducers/order.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IOrderReceiver, OrderStageType } from "../../model";

interface Props {
  stage: OrderStageType;
}

// Устанавливает получателя в заказе
// Управляет отключением кнопки для оформления заказа
export const useOrderInit = ({ stage }: Props) => {
  const dispatch = useAppDispatch();
  const { userInfo, companies } = useAppSelector(selectUser);

  // --- Инициализация получателя ---
  const initCompanyOrder = useCallback(() => {
    const receiver: IOrderReceiver = {
      receiver_email: userInfo.email || "",
      receiver_name: userInfo.name || "",
      receiver_phone: userInfo.phone || "",
      receiver_surname: userInfo.surname || "",
    };

    const defaultCompany = companies.find((company) => company.is_default);

    dispatch(setOrderCompanyId(defaultCompany?.id || 0));
    dispatch(setOrderReceiverData(receiver));
  }, [dispatch, userInfo, companies]);

  useEffect(() => {
    initCompanyOrder();
  }, [initCompanyOrder]);

  // --- Валидация стадий ---
  const {
    receiver,
    deliveryMethod,
    deliveryAddressId,
    receiverCompanyId,
    pickupPoint,
  } = useAppSelector(selectOrder);

  const isFirstStageInvalid = useMemo(() => {
    return [
      deliveryMethod,
      deliveryAddressId,
      pickupPoint.pickup_point_code,
    ].some((field) => {
      if (typeof field === "object" && field !== null) {
        return FormUtils.getFormError({
          checkData: field,
          requiredFields: Object.keys(field) as (keyof typeof field)[],
        });
      }

      return FormUtils.checkIfValueEmpty(field);
    });
  }, [deliveryMethod, deliveryAddressId, pickupPoint.pickup_point_code]);

  const isConfirmStageInvalid = useMemo(() => {
    return (
      Object.values(receiver).some(FormUtils.checkIfValueEmpty) ||
      !receiverCompanyId
    );
  }, [receiver, receiverCompanyId]);

  useEffect(() => {
    const disabled =
      stage === "choose_pvz" ? isFirstStageInvalid : isConfirmStageInvalid;

    dispatch(setButtonDisabled(disabled));
  }, [stage, isFirstStageInvalid, isConfirmStageInvalid, dispatch]);
};
