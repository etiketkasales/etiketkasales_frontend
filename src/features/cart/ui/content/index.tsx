"use client";
import React from "react";

import classes from "./content.module.scss";
import CartFunctional from "./functional";
import CartSellers from "./sellers";
import { ICartItem } from "../../model/cart.interface";

interface Props {
  sellersItems: Array<ICartItem[]>;
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
