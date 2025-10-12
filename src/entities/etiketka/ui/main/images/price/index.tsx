"use client";
import React from "react";

import classes from "./price.module.scss";
import EtiketkaMainContainer from "~/src/entities/etiketka/ui/container";
import Price from "~/src/shared/ui/price/ui";

interface Props {
  price: string;
  old_price?: string;
}

export default function EtiketkaImagesPrice({ price, old_price }: Props) {
  return (
    <EtiketkaMainContainer
      className={`padding-16 flex-row align-center gap-6px ${classes.container}`}
    >
      <Price
        price={price}
        old_price={old_price}
        alignCenter
        needTransform={false}
      />
    </EtiketkaMainContainer>
  );
}
