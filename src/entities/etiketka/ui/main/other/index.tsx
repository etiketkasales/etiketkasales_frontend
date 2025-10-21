"use client";
import React from "react";

import classes from "./other.module.scss";
import EtiketkaSeller from "./seller";
import EtiketkaPriceCart from "./price-cart";
import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  sellerId: number;
  item: IEtiketka;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaOther({ sellerId, item, updateInfo }: Props) {
  return (
    <div className={`flex-column gap-5 ${classes.container}`}>
      <EtiketkaSeller sellerId={sellerId} />
      <EtiketkaPriceCart item={item} updateInfo={updateInfo} />
    </div>
  );
}
