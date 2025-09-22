"use client";
import React from "react";

import classes from "./info.module.scss";
import CartItemInfoTop from "./top";
import CartItemInfoBottom from "./bottom";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item: EtiketkaI;
}

export default function CartItemInfo({ item }: Props) {
  return (
    <div className={`flex-column gap-5 space-between ${classes.container}`}>
      <CartItemInfoTop
        url={item.url}
        title={item.title}
        price={item.price}
        old_price={item.old_price}
      />
      <CartItemInfoBottom item={item} className={classes.bottom} />
    </div>
  );
}
