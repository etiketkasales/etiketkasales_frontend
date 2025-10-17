"use client";
import React from "react";
import { useItemWrapper } from "../lib/hooks/useItemWrapper.hook";

import classes from "./item-wrapper.module.scss";
import ItemWrapperTop from "./top";
import ItemWrapperCaption from "./caption";
import LinkContainer from "~/src/shared/ui/link-container/ui";
import { IEtiketka } from "../../etiketka/model/etiketka.interface";

interface Props {
  item: IEtiketka;
}

export default function ItemWrapper({ item }: Props) {
  const { itemInfo, updateInfo } = useItemWrapper({ initInfo: item });
  const link = `/etiketka/${item.slug}/${item.id}`;

  return (
    <li className={`${classes.container} flex-column cursor flex-start`}>
      <ItemWrapperTop
        item={itemInfo}
        image={itemInfo.images[0]}
        updateInfo={updateInfo}
      />
      <ItemWrapperCaption
        title={itemInfo.name}
        price={itemInfo.price}
        discountPrice={itemInfo.old_price}
      />
      <LinkContainer link={link} className={classes.link} />
    </li>
  );
}
