"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { useCartSum } from "~/src/features/cart/lib/hooks/useCartSum.hook";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

import classes from "./order-main.module.scss";
import OrderContent from "./content";
import OrderSummary from "~/src/entities/order-summary/ui";
import { OrderType } from "~/src/entities/order/model";
import { PersonalOrderStageType } from "~/src/entities/order/model/order.interface";

interface Props {
  type: OrderType;
  stage: PersonalOrderStageType;
}

export default function OrderMain({ type, stage }: Props) {
  const { itemsToOrderIds } = useAppSelector(selectOrder);
  const { paySum, itemsSum, itemsDiscount } = useCartSum();

  return (
    <div className={`flex ${classes.container}`}>
      <OrderContent type={type} stage={stage} />
      <OrderSummary
        discount={itemsDiscount}
        totalItemsCount={itemsToOrderIds.length}
        totalSum={itemsSum}
        paySum={paySum}
        buttons={[]}
      />
    </div>
  );
}
