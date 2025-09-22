"use client";
import React from "react";

import classes from "./item-caption.module.scss";
import Price from "~/src/shared/ui/price/ui";

interface Props {
  price: number;
  discountPrice?: number;
  title: string;
}

export default function ItemWrapperCaption({
  price,
  discountPrice,
  title,
}: Props) {
  return (
    <section className={`flex-column gap-1 flex-start ${classes.container}`}>
      <Price price={price} old_price={discountPrice} />
      <p className={`text-16 semibold black second-family ${classes.title}`}>
        {title}
      </p>
    </section>
  );
}
