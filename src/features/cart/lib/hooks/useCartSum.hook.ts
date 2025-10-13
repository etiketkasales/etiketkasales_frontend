import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

// TO DO: переписать под новый апи корзины. Сейчас на костылях

export const useCartSum = () => {
  const { items, selectedItems } = useAppSelector(selectCart);

  const [itemsSum, setItemsSum] = useState<number>(0);
  const [itemsDiscount, setItemsDiscount] = useState<number>(0);

  useEffect(() => {
    if (!items || selectedItems.length === 0) {
      setItemsDiscount(0);
      setItemsSum(0);
      return;
    }

    let sum = 0;
    let discount = 0;

    selectedItems.forEach((id) => {
      const item = items.find((item) => item.id === id);
      if (!item) return;

      const count = item.quantity ?? 1;
      const price = Number(item.price.split(".")[0]);
      const oldPrice = Number(item.old_price.split(".")[0]);

      if (oldPrice) {
        sum += count * oldPrice;
        discount += count * (oldPrice - price);
      } else {
        sum += count * price;
      }
    });

    setItemsSum(sum);
    setItemsDiscount(discount);
  }, [selectedItems, items]); // высчитывает общую сумму и скидку

  return {
    itemsSum,
    itemsDiscount,
  };
};
