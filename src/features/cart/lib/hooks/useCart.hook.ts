import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";
import { selectOrder, setOrder } from "~/src/app/store/reducers/order.slice";
import { getCart, mergeCart, multiDeleteProducts } from "../api/cart.api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { ICartItem } from "../../model/cart.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(selectCart);
  const { itemsToOrderIds } = useAppSelector(selectOrder);
  const [sellerItems, setSellerItems] = useState<Array<ICartItem[]>>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [itemsToOrderIds.length, items.length, dispatch]);

  const onCheckboxChange = useCallback(
    (selectAll: boolean) => {
      dispatch(
        setOrder({
          itemsToOrderIds: selectAll ? items.map((item) => item.id) : [],
        }),
      );
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
        if (itemsToOrderIds.length === 0) return;
        await multiDeleteProducts(itemsToOrderIds);
        await updateCart();
      },
    });
  }, [updateCart, itemsToOrderIds]);

  // группирует по продавцам
  useEffect(() => {
    if (!items.length) {
      dispatch(setOrder({ itemsToOrderIds: [] }));
      setSellerItems([]);
      return;
    }

    const selected = items.map((item) => item.id);
    const sellerIdList = [...new Set(items.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      items.filter((item) => item.seller_id === id),
    );

    dispatch(setOrder({ itemsToOrderIds: selected }));
    setSellerItems(groupedBySeller);
  }, [items, dispatch]);

  return {
    selectedItems: itemsToOrderIds,
    sellerItems,
    handleSelectItem,
    updateCart,
    cartMerging,
    onCheckboxChange,
    deleteMarked,
    loading,
  };
};
