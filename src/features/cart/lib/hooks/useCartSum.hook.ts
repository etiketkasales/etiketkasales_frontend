import { useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

export const useCartSum = () => {
  const { itemsToOrder } = useAppSelector(selectOrder);
  const { items } = useAppSelector(selectCart);
  const [itemsSum, setItemsSum] = useState<number>(0);
  const [itemsDiscount, setItemsDiscount] = useState<number>(0);
  const [paySum, setPaySum] = useState<number>(0);

  useEffect(() => {
    if (!items || itemsToOrder?.length === 0) {
      setItemsDiscount(0);
      setItemsSum(0);
      setPaySum(0);
      return;
    }

    let sum = 0;
    let discount = 0;

    itemsToOrder.forEach((itemFromSlice) => {
      const item = items.find((item) => item.id === itemFromSlice.product_id);
      if (!item) return;

      const count = item.quantity || 0;
      const price = Number(item.price?.split(".")[0] || 0);
      const oldPrice = Number(item.old_price?.split(".")[0] || 0);

      if (oldPrice) {
        sum += count * oldPrice;
        discount += count * (oldPrice - price);
      } else {
        sum += count * price;
      }
    });

    setItemsSum(sum);
    setItemsDiscount(discount);
    setPaySum(sum - discount);
  }, [itemsToOrder, items]); // высчитывает общую сумму и скидку

  return {
    itemsSum,
    itemsDiscount,
    paySum,
  };
};
