import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";
import { selectOrder, setOrder } from "~/src/app/store/reducers/order.slice";
import { getCart } from "../api/cart.api";

import { ICartItem } from "../../model/cart.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const { itemsToOrderIds } = useAppSelector(selectOrder);

  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);

  const handleSelectItem = useCallback(
    (id: number) => {
      dispatch(
        setOrder({
          itemsToOrderIds: itemsToOrderIds.includes(id)
            ? itemsToOrderIds.filter((item) => item !== id)
            : [...itemsToOrderIds, id],
        }),
      );
    },
    [itemsToOrderIds, dispatch],
  );

  useEffect(() => {
    dispatch(
      setCart({
        isAllSelected: itemsToOrderIds.length === items.length,
      }),
    );
  }, [itemsToOrderIds, items, dispatch]);

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
      dispatch(setCart({ itemsToOrderIds: [] }));
      setSellerItems([]);
      return;
    }

    const selected = items.map((item) => item.product_id);
    const sellerIdList = [...new Set(items.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      items.filter((item) => item.seller_id === id),
    );

    dispatch(setCart({ itemsToOrderIds: selected }));
    setSellerItems(groupedBySeller);
  }, [items, dispatch]);

  return {
    selectedItems: itemsToOrderIds,
    sellerItems,
    handleSelectItem,
    updateCart,
  };
};
