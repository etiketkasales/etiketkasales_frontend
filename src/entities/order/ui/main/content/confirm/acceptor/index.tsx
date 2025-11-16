import React from "react";
import { useAcceptor } from "~/src/entities/order/lib/hooks/useAcceptor.hook";

import classes from "./acceptor.module.scss";
import OrderContainer from "../../container";
import NewOrderInputs from "./inputs";
import Button from "~/src/shared/ui/button";
import { OrderType } from "~/src/app/store/reducers/order.slice";

interface Props {
  type: OrderType;
}

export default function OrderAcceptor({ type }: Props) {
  const { canChange, setCanChange, acceptor, onInputChange } = useAcceptor();

  return (
    <OrderContainer
      title="Получатель"
      className={`flex-column ${classes.container}`}
    >
      <NewOrderInputs
        canChange={canChange}
        acceptor={acceptor}
        onInputChange={onInputChange}
      />
      <Button
        typeButton="gray"
        onClick={() => setCanChange(!canChange)}
        radius={12}
        className={classes.button}
      >
        <span className="text-body xl">
          {canChange ? "Сохранить" : "Изменить"}
        </span>
      </Button>
    </OrderContainer>
  );
}
