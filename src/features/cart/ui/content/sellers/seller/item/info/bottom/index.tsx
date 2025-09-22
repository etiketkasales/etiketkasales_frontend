"use client";
import React from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { useFavourites } from "~/src/shared/ui/add-to-favourites/lib/useFavourites.hook";

import classes from "./bottom.module.scss";
import HeartMedia from "~/public/cart/heart-fill-media.svg";
import TrashMedia from "~/public/cart/trash2-fill-media.svg";
import Heart from "~/public/cart/heart-fill.svg";
import Trash from "~/public/cart/trash2-fill.svg";
import Button from "~/src/shared/ui/button";
import CartItemCounter from "./counter";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import { useWindowSize } from "react-use";

interface Props {
  item: EtiketkaI;
  className?: string;
}

export default function CartItemInfoBottom({ item, className }: Props) {
  const { handleDeleteEtiketka, handleAddEtiketka } = useCartItems({ item });
  const {
    isInFavourites,
    handleAddEtiketka: addFav,
    handleDeleteEtiketka: removeFav,
  } = useFavourites({ item });
  const { width } = useWindowSize();

  const buttons = [
    {
      title: isInFavourites ? "Убрать из избранного" : "В избранное",
      icon: width <= 768 ? HeartMedia : Heart,
      onClick: () => {
        if (isInFavourites) {
          removeFav();
        } else {
          addFav();
        }
      },
    },
    {
      title: "Удалить",
      icon: width <= 768 ? TrashMedia : Trash,
      onClick: () => handleDeleteEtiketka(item.id),
    },
  ];
  return (
    <div
      className={`flex-row space-between gap-5 align-center ${classes.container} ${className}`}
    >
      <div className="flex-row gap-5 align-cen">
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
                <item.icon
                  className={index == 0 && isInFavourites ? classes.heart : ""}
                />
                <span className="gray-2 text-14 regular second-family">
                  {item.title}
                </span>
              </div>
            </Button>
          );
        })}
      </div>
      <CartItemCounter
        removeFromCart={handleDeleteEtiketka}
        addToCart={handleAddEtiketka}
        inCartCount={item.in_cart_count}
        itemId={item.id}
      />
    </div>
  );
}
