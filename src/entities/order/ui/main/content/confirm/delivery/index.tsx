"use client";
import React from "react";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { useAppSelector } from "~/src/app/store/hooks";

import classes from "./delivery.module.scss";
import OrderContainer from "../../container";
import DeliveryChosenMethodItem from "./item";

export default function DeliveryChosenMethod() {
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
    </OrderContainer>
  );
}
