"use client";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

import classes from "./item.module.scss";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import ImageContainer from "~/src/shared/ui/image-container";
import CartItemInfo from "./info";
import CartItemInfoBottom from "./info/bottom";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item: EtiketkaI;
  selectedItems: number[];
  selectItem: (id: number) => void;
}

export default function CartSellerItem({
  item,
  selectedItems,
  selectItem,
}: Props) {
  const { width } = useWindowSize();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedItems.includes(item.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedItems, item.id]);

  return (
    <li className={`flex-column gap-3`}>
      <div className={`flex-row gap-6 ${classes.container}`}>
        <div className={`${classes.checkbox}`}>
          <CheckboxInput
            onChange={() => selectItem(item.id)}
            checked={isSelected}
          />
        </div>
        <ImageContainer
          src={item.cover_image}
          alt={item.title}
          width={width > 460 ? 120 : 100}
          height={width > 460 ? 120 : 100}
          radius={20}
        />
        <CartItemInfo item={item} />
      </div>
      <CartItemInfoBottom item={item} className={classes.bottom} />
    </li>
  );
}
