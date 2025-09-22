import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectCart, setCart } from "~/src/app/store/reducers/cart.slice";

import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { cartItems, selectedItems } = useAppSelector(selectCart);
  const [sellerItems, setSellerItems] = useState<Array<EtiketkaI[]>>([]);

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      dispatch(
        setCart({
          selectedItems: selectedItems.filter((item) => item !== id),
        }),
      );
    } else {
      dispatch(
        setCart({
          selectedItems: [...selectedItems, id],
        }),
      );
    }
  };

  useEffect(() => {
    if (selectedItems.length === cartItems.length) {
      dispatch(
        setCart({
          isAllSelected: true,
        }),
      );
    } else {
      dispatch(
        setCart({
          isAllSelected: false,
        }),
      );
    }
  }, [selectedItems, cartItems]);

  useEffect(() => {
    if (!cartItems.length) {
      dispatch(setCart({ selectedItems: [] }));
      setSellerItems([]);
      return;
    }

    const selected = cartItems.map((item) => item.id);
    const sellerIdList = [...new Set(cartItems.map((item) => item.seller_id))];
    const groupedBySeller = sellerIdList.map((id) =>
      cartItems.filter((item) => item.seller_id === id),
    );

    dispatch(setCart({ selectedItems: selected }));
    setSellerItems(groupedBySeller);
  }, [cartItems]); // группирует по продавцам

  return {
    selectedItems,
    sellerItems,
    handleSelectItem,
  };
};
