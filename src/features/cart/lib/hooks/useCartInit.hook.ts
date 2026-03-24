import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";

import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";
import {
  selectOrder,
  setOrderItems,
} from "~/src/app/store/reducers/order.slice";
import { ICartItem } from "../../model";
import { configureNewItem } from "../utils";

interface Props {
  updateCart: () => Promise<void>;
  needInitialize?: boolean;
}

export const useCartInit = ({ updateCart, needInitialize }: Props) => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const { itemsToOrder } = useAppSelector(selectOrder);
  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);

  useEffect(() => {
    if (items.length !== 0) return;
    if (!needInitialize) return;
    void updateCart();
  }, [updateCart, needInitialize, items.length]);

  useEffect(() => {
    dispatch(
      setCart({
        isAllSelected: itemsToOrder.length === items.length,
      }),
    );
  }, [itemsToOrder.length, items.length, dispatch]);

  useEffect(() => {
    if (!items.length) {
      dispatch(setOrderItems([]));
      setSellerItems([]);
      return;
    }

    const selected = items.map((item) => {
      const selectedItem = configureNewItem(item);
      if (!selectedItem) {
        throw Error("Ошибка при выборе товара");
      }
      return selectedItem;
    });

    const sellerIdList = [...new Set(items.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      items.filter((item) => item.seller_id === id),
    );

    dispatch(setOrderItems(selected));
    setSellerItems(groupedBySeller);
  }, [items, dispatch]);

  return sellerItems;
};
