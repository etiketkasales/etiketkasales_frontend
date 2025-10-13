"use client";
import React from "react";

import classes from "./seller.module.scss";
import CartWrapper from "~/src/features/cart/ui/wrapper";
import SellerInfoContainer from "~/src/shared/ui/seller-info/ui";
import CartSellerItem from "./item";
import { ICartItem } from "~/src/features/cart/model/cart.interface";

interface Props {
  items: ICartItem[];
  selectedItems: number[];
  selectItem: (id: number) => void;
}

export default function CartSellerItems({
  items,
  selectedItems,
  selectItem,
}: Props) {
  return (
    <CartWrapper
      padding="20"
      className={`flex-column gap-8 ${classes.container}`}
    >
      <SellerInfoContainer
        sellerId={items[0].seller_id}
        gap={10}
        spaceBetween={false}
      />
      <ul className={`flex-column gap-6 ${classes.list}`}>
        {items.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <CartSellerItem
                item={item}
                selectedItems={selectedItems}
                selectItem={selectItem}
              />
              {index !== items.length - 1 && <div className={classes.line} />}
            </React.Fragment>
          );
        })}
      </ul>
    </CartWrapper>
  );
}
