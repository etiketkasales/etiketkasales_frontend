import React from "react";
import classNames from "classnames";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";
import { IOrderSummaryButton } from "~/src/entities/order-summary/model/order-summary.interface";

interface Props {
  buttons: IOrderSummaryButton[];
}

export default function OrderSummaryButtons({ buttons }: Props) {
  return (
    <div className={`flex-column gap-10px`}>
      {buttons.map((item, index) => (
        <Button
          key={`${index}-${item.title}`}
          typeButton={item.type}
          onClick={item.onClick}
          className={classNames(classes.button)}
          disabled={item.disabled}
        >
          <span className="heading h7">{item.title}</span>
        </Button>
      ))}
    </div>
  );
}
