"use client";
import HeaderWithText from "~/src/entities/header-with-text/ui";
import OrderSection from "~/src/entities/order/ui";
import PageWrapper from "~/src/entities/page-wrapper/ui";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
}

export default function OrderTypedPage({ type }: Props) {
  return (
    <PageWrapper CustomHeader={<HeaderWithText text="Оформление заказа" />}>
      <OrderSection type={type} />
    </PageWrapper>
  );
}
