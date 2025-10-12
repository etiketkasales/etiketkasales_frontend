"use client";
import React, { useEffect, useState } from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import { useAppSelector } from "~/src/app/store/hooks";

import classes from "./in-cart-button.module.scss";
import Cart from "~/public/shared/cart-fill.svg";
import Button from "~/src/shared/ui/button";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  className?: string;
  item?: EtiketkaI;
}

export default function InCartButton({
  left,
  top,
  right,
  bottom,
  className,
  item,
}: Props) {
  const { cartItems } = useAppSelector(selectCart);
  const { handleAddEtiketka, handleDeleteEtiketka } = useCartItems({ item });
  const [isInCart, setIsInCart] = useState<EtiketkaI | undefined>(undefined);

  // useEffect(() => {
  //   setIsInCart(cartItems.find((i) => i.id === item.id));
  // }, [cartItems, item.id]);

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        right,
        bottom,
      }}
    >
      <Button
        typeButton="yellow"
        size="10"
        onClick={(e) => {
          e.stopPropagation();
          if (isInCart) {
            handleDeleteEtiketka(isInCart?.id);
            return;
          }
          handleAddEtiketka();
        }}
        className={`${classes.container}${isInCart ? ` ${classes.active}` : ""} ${className}`}
        needActiveScale={false}
        radius={16}
      >
        {isInCart ? (
          `${isInCart.in_cart_count}`
        ) : (
          <Cart className={classes.icon} />
        )}
      </Button>
    </div>
  );
}
