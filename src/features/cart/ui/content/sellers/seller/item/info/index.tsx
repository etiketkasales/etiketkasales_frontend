"use client";
import React from "react";

import classes from "./info.module.scss";
import CartItemInfoTop from "./top";
import CartItemInfoBottom from "./bottom";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

interface Props {
  item: ICartItem;
}

export default function CartItemInfo({ item }: Props) {
  return (
    <div className={`flex-column gap-5 space-between ${classes.container}`}>
      <CartItemInfoTop
        href={`/etiketka/${item.slug}/${item.id}`}
        title={item.name}
        price={item.price}
        old_price={item.old_price}
      />
      <CartItemInfoBottom item={item} className={classes.bottom} />
    </div>
  );
}
