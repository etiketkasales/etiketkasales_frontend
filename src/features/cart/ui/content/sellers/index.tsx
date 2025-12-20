"use client";
import React from "react";

import CartSellerItems from "./seller";
import { ICartItem } from "../../../model/cart.interface";
import { IProductForDeliveryMethod } from "~/src/entities/order/model";

interface Props {
  sellersItems: Array<ICartItem[]>;
  selectedItems: IProductForDeliveryMethod[];
  selectItem: (id: number, weight: number) => void;
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
