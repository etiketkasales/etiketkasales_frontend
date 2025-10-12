"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./item-wrapper-top.module.scss";
import ImageContainer from "~/src/shared/ui/image-container";
import InCartButton from "~/src/shared/ui/in-cart-button/ui";
import { IEtiketka } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  image: string;
  item: IEtiketka;
}

export default function ItemWrapperTop({ image, item }: Props) {
  const { width } = useWindowSize();

  return (
    <div className="relative">
      <ImageContainer
        src={image ? image : "/best-offers/test.png"}
        width={222}
        height={width <= 460 ? 168 : 222}
        alt="Картинка товара"
        radius={16}
        className={classes.image}
      />
      <InCartButton bottom={0} right={12} className={classes.button} />
    </div>
  );
}
