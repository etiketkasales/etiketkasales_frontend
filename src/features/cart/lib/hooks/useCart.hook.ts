import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useCartInit } from ".";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";
import {
  selectOrder,
  setOrderItems,
} from "~/src/app/store/reducers/order.slice";
import { getCart, mergeCart, multiDeleteProducts } from "../api/cart.api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { configureNewItem } from "~/src/features/cart/lib/utils";

import { ICartItem } from "../../model";

interface Props {
  needInitialize?: boolean;
}

export const useCart = ({ needInitialize }: Props) => {
  const dispatch = useAppDispatch();
  const { items: itemsInCart } = useAppSelector(selectCart);
  const { itemsToOrder } = useAppSelector(selectOrder);
  const createNotification = useCreateNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectItem = useCallback(
    (item: ICartItem) => {
      const newItem = configureNewItem(item);
      if (!newItem) return;

      const ids = itemsToOrder.map((item) => item.product_id);
      const newItems = ids.includes(newItem.product_id)
        ? itemsToOrder.filter((item) => item.product_id !== newItem.product_id)
        : [...itemsToOrder, newItem];

      dispatch(setOrderItems(newItems));
    },
    [itemsToOrder, dispatch],
  );

  const onCheckboxChange = useCallback(
    (selectAll: boolean) => {
      const newItems = selectAll
        ? itemsInCart.map((item) => {
            const newItem = configureNewItem(item);
            if (!newItem) {
              throw Error("Ошибка при выборе товара");
            }

            return newItem;
          })
        : [];

      dispatch(setOrderItems(newItems));
    },
    [dispatch, itemsInCart, configureNewItem],
  );

  const updateCart = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getCart();
        dispatch(
          setCart({
            items: Array.isArray(res?.items) ? res.items : [],
            itemsAmount: res.items.reduce(
              (acc, item) => acc + item.quantity,
              0,
            ),
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
        await multiDeleteProducts(itemsToOrder.map((item) => item.product_id));
        await updateCart();
      },
      fallback: (err) =>
        createNotification(err || "Не удалось удалить выбранные товары"),
    });
  }, [updateCart, itemsToOrder, createNotification]);

  const sellerItems = useCartInit({ updateCart, needInitialize });

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
