import React from "react";

import classes from "./confirm.module.scss";
import OrderStageWrapper from "../stage-wrapper";
import DeliveryChosenMethod from "./delivery";
import OrderAcceptor from "./acceptor";
import OrderPurchase from "./purchase";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  isActive: boolean;
  type: OrderType;
}

export default function OrderConfirm({ isActive, type }: Props) {
  return (
    <OrderStageWrapper
      isActive={isActive}
      className={`flex-column ${classes.container}`}
    >
      <DeliveryChosenMethod />
      <OrderAcceptor type={type} />
      <OrderPurchase type={type} />
    </OrderStageWrapper>
  );
}
