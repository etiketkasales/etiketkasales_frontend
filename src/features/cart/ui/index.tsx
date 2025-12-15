"use client";
import React from "react";
import { useCartSum } from "~/src/features/cart/lib/hooks/useCartSum.hook";

import classes from "./cart.module.scss";
import CartContent from "./content";
import CartOrderSummary from "./order-summary";
import Loader from "~/src/shared/ui/loader";
import { ICartItem } from "../model/cart.interface";

interface Props {
  loading: boolean;
  sellerItems: ICartItem[][];
  selectedItems: number[];
  handleSelectItem: (id: number) => void;
  onCheckboxChange: (selectAll: boolean) => void;
  deleteMarked: () => Promise<void>;
  openModal: () => void;
}

export default function CartSection({
  openModal,
  loading,
  sellerItems,
  selectedItems,
  handleSelectItem,
  onCheckboxChange,
  deleteMarked,
}: Props) {
  const { itemsSum, itemsDiscount, paySum } = useCartSum();

  return (
    <section className={`flex-column gap-30px relative ${classes.container}`}>
      {loading && <Loader radius={20} />}
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
