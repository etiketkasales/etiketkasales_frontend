"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./purchase.module.scss";
import CartWrapper from "~/src/features/cart/ui/wrapper";
import CartPrices from "./prices";
import CartPlaceOrder from "./place-order";

interface Props {
  itemsSum: number;
  itemsDiscount: number;
  itemsCount: number;
  openModal: () => void;
}

// TO DO прикрутить оформление заказа и покупку как юр.лицо

export default function CartPurchaseSection({
  itemsSum,
  itemsDiscount,
  itemsCount,
  openModal,
}: Props) {
  const { width } = useWindowSize();
  return (
    <CartWrapper
      padding="16"
      className={`flex-column gap-6 ${classes.container}`}
      maxWidth={width > 1024 ? 358 : undefined}
    >
      <CartPrices
        itemsSum={itemsSum}
        itemsDiscount={itemsDiscount}
        itemsCount={itemsCount}
      />
      <CartPlaceOrder openModal={openModal} />
    </CartWrapper>
  );
}
