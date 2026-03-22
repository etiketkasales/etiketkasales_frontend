"use client";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import Icon from "~/public/header/cart.svg";
import HeaderFeaturesItem from "../item";

export default function FeaturesCartItem() {
  const { itemsAmount } = useAppSelector(selectCart);

  return (
    <HeaderFeaturesItem
      itemsCount={itemsAmount || 0}
      Icon={Icon}
      href="/cart"
    />
  );
}
