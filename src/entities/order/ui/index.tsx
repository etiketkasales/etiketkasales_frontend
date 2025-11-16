"use client";
import React, { useState } from "react";
import { useOrder } from "../lib/hooks/useOrder.hook";

import classes from "./order.module.scss";
import OrderMain from "./main";
import Button from "~/src/shared/ui/button";
import { OrderType } from "~/src/app/store/reducers/order.slice";
import { PersonalOrderStageType } from "../model/order.interface";

interface Props {
  type: OrderType;
}

export default function OrderSection({ type }: Props) {
  useOrder();
  const [stage, setStage] = useState<PersonalOrderStageType>("choose_pvz");

  return (
    <section className={`flex-column ${classes.container}`}>
      <h1 className={`heading h4 text-neutral-1000 ${classes.heading}`}>
        Оформление заказа
      </h1>
      <OrderMain type={type} stage={stage} />
      <Button typeButton="yellow" onClick={() => setStage("confirm")}>
        ospbdnfbn
      </Button>
    </section>
  );
}
