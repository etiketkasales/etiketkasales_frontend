import React from "react";

import Icon from "~/public/header/heart.svg";
import HeaderFeaturesItem from "../item";

// TO DO: переписать под избранное (апи пока нет)

export default function FeaturesFavouritesItem() {
  return <HeaderFeaturesItem itemsCount={0} Icon={Icon} href="/favourites" />;
}
