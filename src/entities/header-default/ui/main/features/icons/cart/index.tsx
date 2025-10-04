"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import Icon from "~/public/header/cart.svg";
import HeaderFeaturesItem from "../item";

export default function FeaturesCartItem() {
  const { cartItems } = useAppSelector(selectCart);

  return (
    <HeaderFeaturesItem
      itemsCount={cartItems.length}
      Icon={Icon}
      href="/cart"
    />
  );
}
