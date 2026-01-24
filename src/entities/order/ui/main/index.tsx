"use client";
import React, { useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { useCartSum } from "~/src/features/cart/lib/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { useCreateOrder } from "../../lib/hooks";

import classes from "./order-main.module.scss";
import OrderContent from "./content";
import OrderSummary from "~/src/entities/order-summary/ui";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import Loader from "~/src/shared/ui/loader";
import { OrderStageType } from "~/src/entities/order/model";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
  stage: OrderStageType;
  onButtonClick: (s: OrderStageType) => void;
}

const buttonTexts = {
  choose_pvz: "Продолжить",
  confirm: "Перейти к оплате",
};

export default function OrderMain({ type, stage, onButtonClick }: Props) {
  const { itemsToOrder, buttonDisabled } = useAppSelector(selectOrder);
  const { paySum, itemsSum, itemsDiscount } = useCartSum();
  const { onCreateButtonClick, loading } = useCreateOrder({
    stage,
    type,
    setStage: onButtonClick,
  });
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div className={`flex ${classes.container}`}>
      {loading && <Loader radius={0} />}
      <OrderContent type={type} stage={stage} setStage={onButtonClick} />
      <OrderSummary
        discount={itemsDiscount}
        totalItemsCount={itemsToOrder.length}
        totalSum={itemsSum}
        paySum={paySum}
        buttons={[
          {
            title: buttonTexts[stage] || "",
            onClick: onCreateButtonClick,
            type: "yellow",
            disabled: !checked || buttonDisabled || loading,
          },
        ]}
      >
        <CheckboxInput
          checked={checked}
          onChange={(check) => setChecked(check)}
          className={classes.checkbox}
          nodeLabel={
            <span className="text-neutral-700 text-body l">
              Я принимаю{" "}
              <LinkContainer link="/" className="text-blue-500">
                Условия обработки персональных данных
              </LinkContainer>
              , а также{" "}
              <LinkContainer link="/" className="text-blue-500">
                Условия продажи
              </LinkContainer>
            </span>
          }
          name="etitketka-agree-terms"
        />
      </OrderSummary>
    </div>
  );
}
