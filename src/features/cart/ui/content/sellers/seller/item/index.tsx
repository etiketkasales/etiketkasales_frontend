"use client";
import React, { useEffect, useState } from "react";
import { useCartItems } from "~/src/features/cart/lib/hooks/useCartItems.hook";

import classes from "./item.module.scss";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import CartSellerItemInfo from "./info";
import { ICartItem } from "~/src/features/cart/model/cart.interface";
import SellerItemButtons from "./extra";

interface Props {
  item: ICartItem;
  selectedItems: number[];
  selectItem: (id: number) => void;
}

export default function CartSellerItem({
  item,
  selectedItems,
  selectItem,
}: Props) {
  const { handleDeleteEtiketka: deleteFromCart } = useCartItems({
    itemId: item.id,
  });
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    if (selectedItems.includes(item.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedItems, item.id]);

  return (
    <li className={`flex ${classes.container}`}>
      <div className={`flex-row ${classes.innerContainer}`}>
        <CheckboxInput
          checked={isSelected}
          onChange={() => selectItem(item.id)}
          className={classes.checkbox}
        />
        <CartSellerItemInfo
          image={item.images[0]}
          price={item.price}
          old_price={item.old_price}
          slug={item.slug}
          name={item.name}
          deleteFromCart={deleteFromCart}
          id={item.product_id}
        />
      </div>
      <SellerItemButtons
        itemId={item.id}
        itemMin={item.min_order_quantity}
        itemStock={item.stock_quantity}
        itemQuantity={item.quantity}
        deleteFromCart={deleteFromCart}
        price={item.price}
        old_price={item.old_price}
      />
    </li>
  );
}
