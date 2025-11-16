import React from "react";

import classes from "./inputs.module.scss";
import OrderAcceptorInput from "./input";
import { INewOrderAcceptor, newOrderInputs } from "~/src/entities/order/model";

interface Props {
  onInputChange: (v: string, f: keyof INewOrderAcceptor) => void;
  acceptor: INewOrderAcceptor;
  canChange: boolean;
}

export default function NewOrderInputs({
  onInputChange,
  acceptor,
  canChange,
}: Props) {
  return (
    <div className={`grid ${classes.container}`}>
      {newOrderInputs.map((item, index) => (
        <OrderAcceptorInput
          key={index + item.field}
          onChange={onInputChange}
          acceptor={acceptor}
          disabled={!canChange}
          {...item}
        />
      ))}
    </div>
  );
}
