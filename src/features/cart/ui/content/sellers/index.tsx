"use client";
import React from "react";

import CartSellerItems from "./seller";
import { ICartItem } from "../../../model/cart.interface";

interface Props {
  sellersItems: Array<ICartItem[]>;
  selectedItems: number[];
  selectItem: (id: number) => void;
}

export default function CartSellers({
  sellersItems,
  selectedItems,
  selectItem,
}: Props) {
  return sellersItems.map((item, index) => {
    return (
      <CartSellerItems
        key={index}
        items={item}
        selectedItems={selectedItems}
        selectItem={selectItem}
      />
    );
  });
}
