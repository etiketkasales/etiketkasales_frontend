"use client";
import { redirect } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

import HeaderWithText from "~/src/entities/header-with-text/ui";
import OrderSection from "~/src/entities/order/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
}

export default function OrderTypedPage({ type }: Props) {
  const { type: selectedType } = useAppSelector(selectOrder);

  if (type !== selectedType) return redirect(`/order/${selectedType}`);

  return (
    <PageWrapper CustomHeader={<HeaderWithText text="Оформление заказа" />}>
      <OrderSection type={type} />
    </PageWrapper>
  );
}
