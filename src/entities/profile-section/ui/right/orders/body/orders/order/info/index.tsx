"use client";
import React from "react";

import classes from "./info.module.scss";
import Dot from "~/public/profile/dot.svg";
import ProfileOrderButton from "./button";

interface Props {
  id: number;
  orderDate: string;
  status: string;
  deliveryDate: string;
  deliveredDate?: string;
  orderBillUrl?: string;
  hasReview: boolean;
}

export default function ProfileOrderInfo({
  id,
  orderDate,
  status,
  deliveryDate,
  deliveredDate,
  orderBillUrl,
  hasReview,
}: Props) {
  return (
    <div className="flex-column gap-5">
      <div className="flex-row gap-1 align-center">
        <p className={classes.text}>От {orderDate}</p>
        <Dot />
        <p className={classes.text}>№{id}</p>
      </div>
      <div className="flex-column gap-3">
        <h2 className="text-22 semibold black second-family">{status}</h2>
        <p className="text-18 black regular second-family">
          {deliveredDate
            ? `Доставили ${deliveredDate}`
            : deliveryDate
              ? `Доставка ожидается ${deliveryDate}`
              : "Доставку назначим после оплаты"}
        </p>
      </div>
      {(!hasReview || orderBillUrl) && (
        <ProfileOrderButton orderBillUrl={orderBillUrl} />
      )}
    </div>
  );
}
