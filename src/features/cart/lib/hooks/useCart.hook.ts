import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";
import {
  selectOrder,
  setOrderItems,
} from "~/src/app/store/reducers/order.slice";
import { getCart, mergeCart, multiDeleteProducts } from "../api/cart.api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import StringUtils from "~/src/shared/lib/utils/string.util";

import { ICartItem } from "../../model";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const { itemsToOrder } = useAppSelector(selectOrder);
  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectItem = useCallback(
    (id: number, weight: number) => {
      const ids = itemsToOrder.map((item) => item.id);
      const newItems = ids.includes(id)
        ? itemsToOrder.filter((item) => item.id !== id)
        : [...itemsToOrder, { id, weight }];

      dispatch(setOrderItems(newItems));
    },
    [itemsToOrder, dispatch],
  );

  useEffect(() => {
    dispatch(
      setCart({
        isAllSelected: itemsToOrder.length === items.length,
      }),
    );
  }, [itemsToOrder.length, items.length, dispatch]);

  const onCheckboxChange = useCallback(
    (selectAll: boolean) => {
      const newItems = selectAll
        ? items.map((item) => {
            const numPrice = StringUtils.formatPriceToNumber(item.price);
            if (numPrice <= 0) {
              throw Error("Не удалось вычислить цену товаров");
            }

            const weight = numPrice * item.quantity;
            return { id: item.id, weight };
          })
        : [];

      dispatch(setOrderItems(newItems));
    },
    [dispatch, items],
  );

  const updateCart = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getCart();
        dispatch(
          setCart({
            items: res.items,
          }),
        );
      },
    });
  }, [dispatch]);

  const cartMerging = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        await mergeCart();
        await updateCart();
      },
    });
  }, [updateCart]);

  const deleteMarked = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (itemsToOrder.length === 0) return;
        await multiDeleteProducts(itemsToOrder.map((i) => i.id));
        await updateCart();
      },
    });
  }, [updateCart, itemsToOrder]);

  // группирует по продавцам
  useEffect(() => {
    if (!items.length) {
      dispatch(setOrderItems([]));
      setSellerItems([]);
      return;
    }

    const selected = items.map((item) => {
      const numPrice = StringUtils.formatPriceToNumber(item.price);
      if (numPrice <= 0) {
        throw Error("Не удалось вычислить цену товаров");
      }
      return {
        id: item.id,
        weight: numPrice * item.quantity,
      };
    });
    const sellerIdList = [...new Set(items.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      items.filter((item) => item.seller_id === id),
    );

    dispatch(setOrderItems(selected));
    setSellerItems(groupedBySeller);
  }, [items, dispatch]);

  return {
    selectedItems: itemsToOrder,
    sellerItems,
    handleSelectItem,
    updateCart,
    cartMerging,
    onCheckboxChange,
    deleteMarked,
    loading,
  };
};
