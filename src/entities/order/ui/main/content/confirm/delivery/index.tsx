import React from "react";

import classes from "./delivery.module.scss";
import OrderContainer from "../../container";
import DeliveryChosenMethodItem from "./item";

interface Props {
  chosenMethod: any;
}

export default function DeliveryChosenMethod({ chosenMethod }: Props) {
  return (
    <OrderContainer
      title="Способ получения"
      className={`flex-column ${classes.container}`}
    >
      <DeliveryChosenMethodItem
        image=""
        name="Пункт выдачи СДЭК"
        address="Краснодар Тополиная улица 48 к1"
        price="809.00"
        time="3–6 дней"
      />
    </OrderContainer>
  );
}
