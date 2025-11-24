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
  onCheckboxChange: (selectAll: boolean) => void;
  onDeleteClick: () => void;
}

export default function CartContent({
  sellersItems,
  selectedItems,
  selectItem,
  onCheckboxChange,
  onDeleteClick,
}: Props) {
  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <CartFunctional
        className={classes.functional}
        onCheckboxChange={onCheckboxChange}
        onDeleteClick={onDeleteClick}
      />
      <CartSellers
        sellersItems={sellersItems}
        selectedItems={selectedItems}
        selectItem={selectItem}
      />
    </div>
  );
}
