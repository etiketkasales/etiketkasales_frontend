"use client";
import React from "react";

import classes from "./etiketka-main.module.scss";
import EtiketkaImages from "./images";
import EtiketkaGeneral from "./general";
import EtiketkaOther from "./other";
import {
  CharacterI,
  EtiketkaI,
} from "~/src/entities/etiketka/model/etiketka.interface";
import { MessageI } from "~/src/shared/model/shared.interface";

interface Props {
  characteristics: CharacterI[];
  item: EtiketkaI;
  loading: boolean;
  error: MessageI | null;
}

export default function EtiketkaMain({
  characteristics,
  item,
  loading,
  error,
}: Props) {
  return (
    <section className={`flex-row gap-5 align-start ${classes.container}`}>
      <EtiketkaImages
        images_urls={item.images}
        price={item.price}
        old_price={item.old_price}
      />
      <EtiketkaGeneral name={item.title} characteristics={characteristics} />
      <EtiketkaOther sellerId={item.seller_id} item={item} />
    </section>
  );
}
