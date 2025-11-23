import React from "react";

import classes from "./item-buttons.module.scss";
import Price from "~/src/shared/ui/price/ui";
import SellerItemDouble from "../actions/double";
import SellerItemButton from "../actions/button";

interface Props {
  itemId: number;
  itemStock: number;
  itemMin: number;
  itemQuantity: number;
  price: string;
  old_price: string | null;
  deleteFromCart: () => Promise<void>;
}

export default function SellerItemButtons({
  itemId,
  itemStock,
  itemMin,
  itemQuantity,
  price,
  old_price,
  deleteFromCart,
}: Props) {
  const cartButtonProps = {
    itemId,
    itemStock,
    itemMin,
    itemQuantity,
  };

  return (
    <div className={`flex ${classes.container}`}>
      <Price old_price={old_price} price={price} className={classes.price} />
      <SellerItemDouble
        containerClassName={classes.double}
        deleteFromCart={deleteFromCart}
      />
      <SellerItemButton {...cartButtonProps} />
    </div>
  );
}
