"use client";
import React from "react";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { useAppSelector } from "~/src/app/store/hooks";

import classes from "./delivery.module.scss";
import OrderContainer from "../../container";
import DeliveryChosenMethodItem from "./item";
import { OrderStageType } from "~/src/entities/order/model";
import Button from "~/src/shared/ui/button";

interface Props {
  setStage: (s: OrderStageType) => void;
}

export default function DeliveryChosenMethod({ setStage }: Props) {
  const { deliveryMethod } = useAppSelector(selectOrder);

  return (
    <OrderContainer
      title="Способ получения"
      className={`flex-column ${classes.container}`}
    >
      <DeliveryChosenMethodItem
        image={deliveryMethod.image_url}
        name={deliveryMethod.name}
        address={deliveryMethod.description}
        display={deliveryMethod.display}
      />
      <Button
        typeButton="white"
        onClick={() => setStage("choose_pvz")}
        className={classes.button}
        radius={12}
      >
        <span className="heading h7">Изменить</span>
      </Button>
    </OrderContainer>
  );
}
