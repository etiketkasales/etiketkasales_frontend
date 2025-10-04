import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectFavourites } from "~/src/app/store/reducers/favourites.slice";

import Icon from "~/public/header/heart.svg";
import HeaderFeaturesItem from "../item";

export default function FeaturesFavouritesItem() {
  const { favouriteItems } = useAppSelector(selectFavourites);

  return (
    <HeaderFeaturesItem
      itemsCount={favouriteItems.length}
      Icon={Icon}
      href="/favourites"
    />
  );
}
