"use client";
import { useAcceptor } from "~/src/entities/order/lib/hooks/useAcceptor.hook";

import classes from "./acceptor.module.scss";
import OrderContainer from "../../container";
import NewOrderInputs from "./inputs";
import Button from "~/src/shared/ui/button";
import UserCompany from "~/src/entities/user-company/ui";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
}

export default function OrderAcceptor({ type }: Props) {
  const {
    canChange,
    setCanChange,
    receiver,
    onInputChange,
    chosenCompany,
    onButtonClick,
  } = useAcceptor();

  return (
    <OrderContainer
      title="Получатель"
      className={`flex-column ${classes.container}`}
    >
      {type === "company" ? chosenCompany && chosenCompany.id ? (
        <UserCompany {...chosenCompany} />
      ) : (
        <Button
          typeButton="yellow"
          onClick={onButtonClick}
          className={classes.button}
          href="/profile/buyer?active_section=as_legal"
          radius={12}
        >
          <span className="heading h7">Добавить организацию</span>
        </Button>
      ) : null}
      <NewOrderInputs
        canChange={canChange}
        receiver={receiver}
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
