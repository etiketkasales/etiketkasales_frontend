import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";

import { ICartItem } from "../../model/cart.interface";
import { getCart } from "../api/cart.api";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, selectedItems } = useAppSelector(selectCart);
  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);

  const handleSelectItem = useCallback(
    (id: number) => {
      dispatch(
        setCart({
          selectedItems: selectedItems.includes(id)
            ? selectedItems.filter((item) => item !== id)
            : [...selectedItems, id],
        }),
      );
    },
    [selectedItems, dispatch],
  );

  useEffect(() => {
    dispatch(
      setCart({
        isAllSelected: selectedItems.length === items.length,
      }),
    );
  }, [selectedItems, items, dispatch]);

  const updateCart = useCallback(async () => {
    try {
      const res = await getCart();
      dispatch(
        setCart({
          items: res.items,
        }),
      );
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  // группирует по продавцам
  useEffect(() => {
    if (!items.length) {
      dispatch(setCart({ selectedItems: [] }));
      setSellerItems([]);
      return;
    }

    const selected = items.map((item) => item.product_id);
    const sellerIdList = [...new Set(items.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      items.filter((item) => item.seller_id === id),
    );

    dispatch(setCart({ selectedItems: selected }));
    setSellerItems(groupedBySeller);
  }, [items, dispatch]);

  return {
    selectedItems,
    sellerItems,
    handleSelectItem,
    updateCart,
  };
};
