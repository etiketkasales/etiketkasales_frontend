"use client";
import { useOrderOperation } from "~/src/entities/profile-section/lib/hooks";

import SellerOrderConfirmationButton from "../confirmation";
import { OrderModalType } from "~/src/entities/profile-section/model";

interface Props {
  orderId: number;
  setModalType: (t: OrderModalType) => void;
}

export default function SellerOrderNeedConfirmButton({
  orderId,
  setModalType,
}: Props) {
  const { loading, onSubmit } = useOrderOperation({
    type: "accept",
    initialData: null,
    orderId,
  });

  return (
    <SellerOrderConfirmationButton
      onConfirm={async () => {
        console.log("click");
        await onSubmit();
      }}
      onCancel={() => setModalType("reject")}
      confirmText="Принять заказ"
      disabled={loading}
    />
  );
}
