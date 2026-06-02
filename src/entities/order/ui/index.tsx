"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setOrderInfo } from "~/src/app/store/reducers/order.slice";
import { useOrderInit } from "../lib/hooks";
import { useUserCompanies } from "~/src/features/user/lib/hooks";

import classes from "./order.module.scss";
import OrderMain from "./main";
import { OrderType, OrderStageType } from "../model";

interface Props {
  type: OrderType;
}

export default function OrderSection({ type }: Props) {
  const dispatch = useAppDispatch();
  const [stage, setStage] = useState<OrderStageType>("choose_pvz");
  const { handleGetCompanies } = useUserCompanies();

  useEffect(() => {
    dispatch(setOrderInfo({ type }));
  }, [dispatch, type]);

  useEffect(() => {
    void handleGetCompanies();
  }, [handleGetCompanies]);

  useOrderInit({ stage, type });

  return (
    <section className={`flex-column ${classes.container}`}>
      <h1 className={`heading h4 text-neutral-1000 ${classes.heading}`}>
        {type === "company" ? "Оформление как юр. лицо" : "Оформление заказа"}
      </h1>
      <OrderMain type={type} stage={stage} onButtonClick={setStage} />
    </section>
  );
}
