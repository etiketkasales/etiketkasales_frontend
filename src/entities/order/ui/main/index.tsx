import React from "react";

import classes from "./order-main.module.scss";
import OrderContent from "./content";
import { OrderType } from "~/src/app/store/reducers/order.slice";
import { PersonalOrderStageType } from "~/src/entities/order/model/order.interface";

interface Props {
  type: OrderType;
  stage: PersonalOrderStageType;
}

export default function OrderMain({ type, stage }: Props) {
  return (
    <div className={`flex ${classes.container}`}>
      <OrderContent type={type} stage={stage} />
      purchase
    </div>
  );
}
