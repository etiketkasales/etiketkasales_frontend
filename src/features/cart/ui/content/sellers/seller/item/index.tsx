"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";
import { useCartItems } from "~/src/features/cart/lib/hooks";

import classes from "./item.module.scss";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import CartSellerItemInfo from "./info";
import SellerItemButtons from "./extra";
import { ICartItem } from "~/src/features/cart/model";

interface Props {
  item: ICartItem;
  selectItem: (item: ICartItem) => void;
}

export default function CartSellerItem({ item, selectItem }: Props) {
  const { itemsToOrder: selectedItems } = useAppSelector(selectOrder);
  const { handleDeleteEtiketka: deleteFromCart } = useCartItems({
    itemId: item.id,
  });
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    const ids = selectedItems.map((i) => i.product_id);
    if (ids.includes(item.id)) {
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
          onChange={() => {
            selectItem(item);
          }}
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
