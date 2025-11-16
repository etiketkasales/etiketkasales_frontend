import React from "react";

import classes from "./purchase.module.scss";
import OrderContainer from "../../container";
import OrderPurchaseItem from "./item";
import { OrderType } from "~/src/app/store/reducers/order.slice";

interface Props {
  type: OrderType;
}

export default function OrderPurchase({ type }: Props) {
  return (
    <OrderContainer
      title="Способ оплаты"
      className={`flex-column ${classes.container}`}
    >
      <div className={`flex ${classes.items}`}>
        <OrderPurchaseItem
          name="СБП"
          comission={null}
          image=""
          onClick={() => {}}
          isActive={true}
        />
        <OrderPurchaseItem
          name="Картой онлайн"
          comission={"5"}
          image=""
          onClick={() => {}}
          isActive={false}
        />
      </div>
    </OrderContainer>
  );
}
