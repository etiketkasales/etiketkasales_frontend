"use client";
import { useState } from "react";
import { useOrderInit } from "../lib/hooks";

import classes from "./order.module.scss";
import OrderMain from "./main";
import { OrderType, OrderStageType } from "../model";

interface Props {
  type: OrderType;
}

export default function OrderSection({ type }: Props) {
  const [stage, setStage] = useState<OrderStageType>("choose_pvz");
  useOrderInit({ stage });

  return (
    <section className={`flex-column ${classes.container}`}>
      <h1 className={`heading h4 text-neutral-1000 ${classes.heading}`}>
        Оформление заказа
      </h1>
      <OrderMain type={type} stage={stage} onButtonClick={setStage} />
    </section>
  );
}
