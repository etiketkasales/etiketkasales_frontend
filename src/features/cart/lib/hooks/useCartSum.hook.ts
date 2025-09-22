import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

export const useCartSum = () => {
  const { cartItems, selectedItems } = useAppSelector(selectCart);

  const [itemsSum, setItemsSum] = useState<number>(0);
  const [itemsDiscount, setItemsDiscount] = useState<number>(0);

  useEffect(() => {
    if (!cartItems || selectedItems.length === 0) {
      setItemsDiscount(0);
      setItemsSum(0);
      return;
    }

    let sum = 0;
    let discount = 0;

    selectedItems.forEach((id) => {
      const item = cartItems.find((item) => item.id === id);
      if (!item) return;

      const count = item.in_cart_count ?? 1;
      const price = item.price;
      const oldPrice = item.old_price;

      if (oldPrice) {
        sum += count * oldPrice;
        discount += count * (oldPrice - price);
      } else {
        sum += count * price;
      }
    });

    setItemsSum(sum);
    setItemsDiscount(discount);
  }, [selectedItems, cartItems]); // высчитывает общую сумму и скидку

  return {
    itemsSum,
    itemsDiscount,
  };
};
