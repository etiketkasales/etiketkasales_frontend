"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import Icon from "~/public/header/heart.svg";
import HeaderFeaturesItem from "../item";

// TO DO: переписать под избранное

export default function FeaturesFavouritesItem() {
  const { items } = useAppSelector(selectCart);

  return (
    <HeaderFeaturesItem
      itemsCount={items?.length || 0}
      Icon={Icon}
      href="/favourites"
    />
  );
}
