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
import { IItemToOrder } from "~/src/entities/order/model";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items: itemsInCart } = useAppSelector(selectCart);
  const { itemsToOrder } = useAppSelector(selectOrder);
  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const configureNewItem = useCallback((item: ICartItem) => {
    const numPrice = StringUtils.formatPriceToNumber(item.price);
    if (!numPrice) return null;

    return {
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      price: numPrice,
    };
  }, []);

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
    [itemsToOrder, dispatch, configureNewItem],
  );

  useEffect(() => {
    dispatch(
      setCart({
        isAllSelected: itemsToOrder.length === itemsInCart.length,
      }),
    );
  }, [itemsToOrder.length, itemsInCart.length, dispatch]);

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
        await multiDeleteProducts(itemsToOrder.map((i) => i.product_id));
        await updateCart();
      },
    });
  }, [updateCart, itemsToOrder]);

  // группирует по продавцам
  useEffect(() => {
    if (!itemsInCart.length) {
      dispatch(setOrderItems([]));
      setSellerItems([]);
      return;
    }

    const selected = itemsInCart.map((item) => {
      const selectedItem = configureNewItem(item);
      if (!selectedItem) {
        throw Error("Ошибка при выборе товара");
      }
      return selectedItem;
    });

    const sellerIdList = [
      ...new Set(itemsInCart.map((item) => item.seller_id)),
    ];
    const groupedBySeller = sellerIdList.map((id) =>
      itemsInCart.filter((item) => item.seller_id === id),
    );

    dispatch(setOrderItems(selected));
    setSellerItems(groupedBySeller);
  }, [itemsInCart, dispatch]);

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
