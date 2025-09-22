"use client";
import React from "react";

import classes from "./price-cart.module.scss";
import EtiketkaMainContainer from "../../../container";
import Price from "~/src/shared/ui/price/ui";
import AddEtiketkaButton from "~/src/shared/ui/add-etiketka-button/ui";
import AddToFavourites from "~/src/shared/ui/add-to-favourites/ui";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item: EtiketkaI;
}

export default function EtiketkaPriceCart({ item }: Props) {
  return (
    <EtiketkaMainContainer
      className={`flex-column gap-5 padding-16 ${classes.container}`}
    >
      <Price price={item.price} old_price={item.old_price} />
      <div className="flex-row gap-10px align-center">
        <AddEtiketkaButton className={classes.button} />
        <AddToFavourites />
      </div>
    </EtiketkaMainContainer>
  );
}
