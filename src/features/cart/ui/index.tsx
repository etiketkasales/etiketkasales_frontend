"use client";
import React from "react";
import { useCart } from "~/src/features/cart/lib/hooks/useCart.hook";
import { useCartSum } from "~/src/features/cart/lib/hooks/useCartSum.hook";

import classes from "./cart.module.scss";
import CartContent from "./content";
import CartOrderSummary from "./order-summary";
import LoaderCircle from "~/src/shared/ui/loader-circle";

interface Props {
  openModal: () => void;
}

export default function CartSection({ openModal }: Props) {
  const {
    selectedItems,
    sellerItems,
    handleSelectItem,
    onCheckboxChange,
    deleteMarked,
    loading,
  } = useCart();
  const { itemsSum, itemsDiscount, paySum } = useCartSum();

  return (
    <section className={`flex-column gap-30px relative ${classes.container}`}>
      {loading && <LoaderCircle radius={20} />}
      <h1 className="text-28 black second-family bold">Корзина</h1>
      <div className={`flex-row gap-5 flex-start ${classes.inner}`}>
        <CartContent
          sellersItems={sellerItems}
          selectedItems={selectedItems}
          selectItem={handleSelectItem}
          onCheckboxChange={onCheckboxChange}
          onDeleteClick={async () => await deleteMarked()}
        />
        <CartOrderSummary
          totalSum={itemsSum}
          discountSum={itemsDiscount}
          totalItemsCount={selectedItems.length}
          paySum={paySum}
          openModal={openModal}
        />
      </div>
    </section>
  );
}
