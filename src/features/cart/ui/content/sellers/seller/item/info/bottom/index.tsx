"use client";
import React from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useWindowSize } from "react-use";

import classes from "./bottom.module.scss";
import HeartMedia from "~/public/cart/heart-fill-media.svg";
import TrashMedia from "~/public/cart/trash2-fill-media.svg";
import Heart from "~/public/cart/heart-fill.svg";
import Trash from "~/public/cart/trash2-fill.svg";
import Button from "~/src/shared/ui/button";
import CartButton from "~/src/entities/cart-button/ui";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

interface Props {
  item: ICartItem;
  className?: string;
}

export default function CartItemInfoBottom({ item, className }: Props) {
  const { handleDeleteEtiketka } = useCartItems({ itemId: item.id });
  const { width } = useWindowSize();

  const buttons = [
    {
      title: "В избранное",
      icon: width <= 768 ? HeartMedia : Heart,
      onClick: () => {},
    },
    {
      title: "Удалить",
      icon: width <= 768 ? TrashMedia : Trash,
      onClick: () => handleDeleteEtiketka(),
    },
  ];
  return (
    <div
      className={`flex-row space-between gap-5 align-center ${classes.container} ${className}`}
    >
      <div className="flex-row gap-5 align-center">
        {buttons.map((item, index) => {
          return (
            <Button
              typeButton="ghost"
              size="0"
              onClick={() => item.onClick()}
              key={index}
              className={classes.button}
            >
              <div className="flex-row gap-6px align-center">
                <item.icon className={index == 0 ? classes.heart : ""} />
                <span className="gray-2 text-14 regular second-family">
                  {item.title}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
      <CartButton
        itemId={item.id}
        quantity={item.quantity}
        minQuantity={item.min_order_quantity}
        type="counter"
      />
    </div>
  );
}
