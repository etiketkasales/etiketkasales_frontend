"use client";
import React from "react";

import classes from "./etiketka-main.module.scss";
import EtiketkaImages from "./images";
import EtiketkaGeneral from "./general";
import EtiketkaOther from "./other";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";
import { MessageI } from "~/src/shared/model/shared.interface";

interface Props {
  item: IEtiketka;
  loading: boolean;
  error: MessageI | null;
  updateInfo: () => void;
}

export default function EtiketkaMain({
  item,
  loading,
  error,
  updateInfo,
}: Props) {
  return (
    <section className={`flex-row gap-5 align-start ${classes.container}`}>
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
