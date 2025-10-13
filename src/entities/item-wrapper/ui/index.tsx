"use client";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";
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
  const { width } = useWindowSize();
  const { itemInfo, updateInfo } = useItemWrapper({ initInfo: item });
  const [gap, setGap] = useState<string>("");
  const link = `/etiketka/${item.slug}/${item.id}`;

  useEffect(() => {
    setGap(width <= 460 ? "gap-2" : "gap-4");
  }, [width]);

  return (
    <li className={`${classes.container} flex-column ${gap} cursor flex-start`}>
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
