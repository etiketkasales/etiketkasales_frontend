"use client";
import React from "react";

import CartSellerItems from "./seller";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  sellersItems: Array<EtiketkaI[]>;
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
