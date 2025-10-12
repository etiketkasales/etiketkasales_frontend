"use client";
import React from "react";

import classes from "./other.module.scss";
import EtiketkaSeller from "./seller";
import EtiketkaPriceCart from "./price-cart";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  sellerId: number;
  item: IEtiketka;
}

export default function EtiketkaOther({ sellerId, item }: Props) {
  return (
    <div className={`flex-column gap-5 ${classes.container}`}>
      <EtiketkaSeller sellerId={sellerId} />
      <EtiketkaPriceCart item={item} />
    </div>
  );
}
