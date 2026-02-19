"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useAddresses } from "~/src/features/user/lib/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

import classes from "./choose.module.scss";
import OrderAddress from "./address";
import OrderDeliveryMethod from "./delivery_method";
import OrderStageWrapper from "../stage-wrapper";
import DeliveryMethodModal from "./modal";

interface Props {
  isActive: boolean;
}

export default function OrderChoosePvz({ isActive }: Props) {
  const dispatch = useAppDispatch();
  const { deliveryMethod } = useAppSelector(selectOrder);
  const { defAddress, loading: addressLoading } = useAddresses();
  const [modal, setModal] = useState<boolean | null>(null);
  const [deliveryModal, setDeliveryModal] = useState<boolean | null>(null);

  useEffect(() => {
    if (deliveryMethod.code && defAddress) return;
    dispatch(
      addNotification({
        message: "Выберите адрес доставки и способ получения",
        type: "warning",
        field: "global",
      }),
    );
  }, [dispatch, deliveryMethod.code, defAddress]);

  return (
    <OrderStageWrapper
      isActive={isActive}
      className={`flex-column ${classes.container}`}
    >
      <OrderAddress
        setModal={(a) => setModal(a)}
        loading={addressLoading}
        defAddress={defAddress}
        modal={modal}
      />
      <OrderDeliveryMethod
        canChoosePvz={defAddress !== null}
        deliveryAddressId={defAddress?.id || 0}
        chosenDeliveryMethod={deliveryMethod}
        openModal={() => setDeliveryModal(true)}
      />
      {deliveryModal !== null && (
        <DeliveryMethodModal
          isOpen={deliveryModal}
          onClose={() => setDeliveryModal(false)}
        />
      )}
    </OrderStageWrapper>
  );
}
