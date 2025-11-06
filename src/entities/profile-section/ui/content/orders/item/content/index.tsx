import React from "react";

import classes from "./order-content.module.scss";
import OrderInfo from "./info";
import OrderStatus from "./status";
import OrderBillUrl from "./bill-link";

interface Props {
  created_at: string;
  order_number: string;
  status: string;
  bill_url?: string;
}

export default function OrderContent({
  created_at,
  order_number,
  status,
  bill_url,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <OrderInfo created_at={created_at} order_number={order_number} />
      <OrderStatus status={status} />
      {bill_url && <OrderBillUrl url={bill_url} />}
    </div>
  );
}
