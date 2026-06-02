import { useCallback, useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import {
  selectOrder,
  setOrderInfo,
  setOrderReceiverData,
} from "~/src/app/store/reducers/order.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IOrderReceiver, OrderStageType, OrderType } from "../../model";

interface Props {
  stage: OrderStageType;
  type: OrderType;
}

function resolveDefaultCompanyId(
  companies: { id: number; is_default?: boolean }[],
): number {
  if (!companies.length) {
    return 0;
  }

  const defaultCompany = companies.find((company) => company.is_default);
  return defaultCompany?.id ?? companies[0]?.id ?? 0;
}

// Устанавливает получателя в заказе
// Управляет отключением кнопки для оформления заказа
export const useOrderInit = ({ stage, type }: Props) => {
  const dispatch = useAppDispatch();
  const { userInfo, companies } = useAppSelector(selectUser);

  const initCompanyOrder = useCallback(() => {
    const receiver: IOrderReceiver = {
      receiver_email: userInfo.email || "",
      receiver_name: userInfo.name || "",
      receiver_phone: userInfo.phone || "",
      receiver_surname: userInfo.surname || "",
    };

    dispatch(setOrderReceiverData(receiver));

    if (type !== "company") {
      return;
    }

    dispatch(
      setOrderInfo({
        receiverCompanyId: resolveDefaultCompanyId(companies),
      }),
    );
  }, [dispatch, userInfo, companies, type]);

  useEffect(() => {
    initCompanyOrder();
  }, [initCompanyOrder]);

  const {
    receiver,
    deliveryMethod,
    deliveryAddressId,
    receiverCompanyId,
    pickupPoint,
    paymentMethod,
  } = useAppSelector(selectOrder);

  const isFirstStageInvalid = useMemo(() => {
    if (!deliveryAddressId) return true;
    if (!deliveryMethod?.code) return true;
    if (!pickupPoint.pickup_point_code) return true;
    return false;
  }, [deliveryMethod?.code, deliveryAddressId, pickupPoint.pickup_point_code]);

  const isConfirmStageInvalid = useMemo(() => {
    const receiverInvalid = Object.values(receiver).some((v) =>
      FormUtils.checkIfValueEmpty(v),
    );
    if (receiverInvalid) return true;
    if (!paymentMethod) return true;
    if (type === "company" && !receiverCompanyId) return true;
    return false;
  }, [receiver, receiverCompanyId, paymentMethod, type]);

  useEffect(() => {
    const disabled =
      stage === "choose_pvz" ? isFirstStageInvalid : isConfirmStageInvalid;
    dispatch(setOrderInfo({ buttonDisabled: disabled }));
  }, [stage, isFirstStageInvalid, isConfirmStageInvalid, dispatch]);
};
