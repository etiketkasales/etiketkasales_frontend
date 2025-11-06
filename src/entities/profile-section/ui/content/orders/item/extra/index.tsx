import React from "react";

import classes from "./order-extra.module.scss";
import OrderImages from "./images";
import OrderPrice from "./price";

interface Props {
  total_amount: string;
  images?: string[];
}

export default function OrderExtra({ total_amount, images }: Props) {
  return (
    <div className={`flex ${classes.container}`}>
      <OrderPrice price={total_amount} />
      {images && images.length > 0 && <OrderImages images={images} />}
    </div>
  );
}
