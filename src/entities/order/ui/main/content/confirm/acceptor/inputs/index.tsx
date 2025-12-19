import React from "react";

import classes from "./inputs.module.scss";
import OrderAcceptorInput from "./input";
import { IOrderReceiver, newOrderInputs } from "~/src/entities/order/model";

interface Props {
  onInputChange: (v: string, field: keyof IOrderReceiver) => void;
  receiver: IOrderReceiver;
  canChange: boolean;
}

export default function NewOrderInputs({
  onInputChange,
  receiver,
  canChange,
}: Props) {
  return (
    <div className={`grid ${classes.container}`}>
      {newOrderInputs.map((item, index) => (
        <OrderAcceptorInput
          key={index + item.field}
          onChange={onInputChange}
          receiver={receiver}
          disabled={!canChange}
          {...item}
        />
      ))}
    </div>
  );
}
