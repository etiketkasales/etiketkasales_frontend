"use client";
import React from "react";

import classes from "./counter.module.scss";
import Minus from "~/public/cart/minus.svg";
import Plus from "~/public/cart/plus.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  removeFromCart: (id: number) => void;
  addToCart: () => void;
  inCartCount?: number;
  itemId: number;
}

export default function CartItemCounter({
  removeFromCart,
  addToCart,
  inCartCount,
  itemId,
}: Props) {
  const MAX_COUNT = 99;
  return (
    <div className="bg-gray-container padding-10 radius-12 flex-row align-center gap-3">
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          if (!inCartCount) return;
          if (inCartCount > 1) {
            removeFromCart(itemId);
          }
        }}
      >
        <Minus className={inCartCount === 1 ? classes.gray : ""} />
      </Button>
      <span
        className={`text-16 black bold second-family text-center ${classes.text}`}
      >
        {inCartCount}
      </span>
      <Button
        typeButton="ghost"
        size="0"
        onClick={() => {
          if (!inCartCount) return;
          if (inCartCount < MAX_COUNT) {
            addToCart();
          }
        }}
      >
        <Plus className={inCartCount === MAX_COUNT ? classes.gray : ""} />
      </Button>
    </div>
  );
}
