"use client";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import { getCartTotalQuantity } from "~/src/features/cart/lib/utils";

import Icon from "~/public/header/cart.svg";
import HeaderFeaturesItem from "../item";

export default function FeaturesCartItem() {
  const { items } = useAppSelector(selectCart);

  return (
    <HeaderFeaturesItem
      itemsCount={getCartTotalQuantity(items) || 0}
      Icon={Icon}
      href="/cart"
    />
  );
}
