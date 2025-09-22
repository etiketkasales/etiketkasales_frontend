"use client";
import React from "react";

import classes from "./content.module.scss";
import CartFunctional from "./functional";
import CartSellers from "./sellers";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  sellersItems: Array<EtiketkaI[]>;
  selectedItems: number[];
  selectItem: (id: number) => void;
}

export default function CartContent({
  sellersItems,
  selectedItems,
  selectItem,
}: Props) {
  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <CartFunctional className={classes.functional} />
      <CartSellers
        sellersItems={sellersItems}
        selectedItems={selectedItems}
        selectItem={selectItem}
      />
    </div>
  );
}
