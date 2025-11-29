"use client";
import React from "react";

import classes from "./etiketka-main.module.scss";
import EtiketkaImages from "./images";
import EtiketkaGeneral from "./general";
import EtiketkaOther from "./other";
import { IEtiketka } from "~/src/entities/etiketka/model";

interface Props {
  item: IEtiketka;
  updateInfo: () => Promise<void>;
}

export default function EtiketkaMain({ item, updateInfo }: Props) {
  return (
    <section className={`flex ${classes.container}`}>
      <EtiketkaImages
        images_urls={item.images}
        price={item.price}
        old_price={item.old_price}
      />
      <EtiketkaGeneral name={item.name} characteristics={item.specifications} />
      <EtiketkaOther
        sellerId={item.seller_id}
        item={item}
        updateInfo={updateInfo}
      />
    </section>
  );
}
