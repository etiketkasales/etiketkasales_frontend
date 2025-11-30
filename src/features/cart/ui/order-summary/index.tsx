"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import OrderSummary from "~/src/entities/order-summary/ui";
import { IOrderSummaryButton } from "~/src/entities/order-summary/model/order-summary.interface";
import { setOrder } from "~/src/app/store/reducers/order.slice";

interface Props {
  totalSum: number;
  totalItemsCount: number;
  discountSum: number;
  openModal: () => void;
  paySum: number;
}

export default function CartOrderSummary({
  totalSum,
  totalItemsCount,
  discountSum,
  paySum,
  openModal,
}: Props) {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { companies } = useAppSelector(selectUser);

  const onAsCompanyClick = useCallback(() => {
    if (!companies || companies.length === 0) {
      openModal();
    } else {
      dispatch(setOrder({ type: "company" }));
      push("/order");
    }
  }, [dispatch, companies, openModal, push]);

  const buttons: IOrderSummaryButton[] = [
    {
      title: "Перейти к оформлению",
      type: "yellow",
      link: "/order",
      onClick: () => push("/order"),
    },
    {
      title: "Купить как юр. лицо",
      type: "gray-border",
      link: "/order/company",
      onClick: onAsCompanyClick,
    },
  ];
  return (
    <OrderSummary
      totalItemsCount={totalItemsCount}
      totalSum={totalSum}
      discount={discountSum}
      buttons={buttons}
      paySum={paySum}
    />
  );
}
