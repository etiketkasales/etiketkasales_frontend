"use client";
import React from "react";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useCartSum } from "~/src/features/cart/lib/hooks/useCartSum.hook";

import classes from "./cart.module.scss";
import CartContent from "./content";
import CartPurchaseSection from "./purchase-section";

export default function CartSection() {
  const { selectedItems, sellerItems, handleSelectItem } = useCart();
  const { itemsSum, itemsDiscount } = useCartSum();

  return (
    <section className={`flex-column gap-30px ${classes.container}`}>
      <h1 className="text-28 black second-family bold">Корзина</h1>
      <div className={`flex-row gap-5 flex-start ${classes.inner}`}>
        <CartContent
          sellersItems={sellerItems}
          selectedItems={selectedItems}
          selectItem={handleSelectItem}
        />
        <CartPurchaseSection
          itemsSum={itemsSum}
          itemsDiscount={itemsDiscount}
          itemsCount={selectedItems.length}
        />
      </div>
    </section>
  );
}
