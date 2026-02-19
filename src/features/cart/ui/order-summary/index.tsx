"use client";
import { useOrderSummaryButtons } from "~/src/features/cart/lib/hooks";

import OrderSummary from "~/src/entities/order-summary/ui";

interface Props {
  totalSum: number;
  totalItemsCount: number;
  discountSum: number;
  openModal: () => void;
  paySum: number;
}

export default function CartOrderSummary({
  totalSum,
  totalItemsCount,
  discountSum,
  paySum,
  openModal,
}: Props) {
  const buttons = useOrderSummaryButtons({ openModal });

  return (
    <OrderSummary
      totalItemsCount={totalItemsCount}
      totalSum={totalSum}
      discount={discountSum}
      buttons={buttons}
      paySum={paySum}
    />
  );
}
