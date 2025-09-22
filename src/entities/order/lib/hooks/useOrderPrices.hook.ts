import { useEffect, useState } from "react";
import { useCartSum } from "~/src/features/cart/lib/hooks/useCartSum.hook";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

import { OrderPricesI } from "~/src/entities/order/model/order.interface";
import { orderPricesS } from "~/src/entities/order/model/order.skeleton";

export const useOrderPrices = () => {
  const { selectedItems } = useAppSelector(selectCart);
  const { itemsSum, itemsDiscount } = useCartSum();
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [orderPrices, setOrderPrices] = useState<OrderPricesI>(orderPricesS);

  useEffect(() => {
    setOrderPrices({
      itemsSum,
      discountSum: itemsDiscount,
      deliveryPrice,
      total: itemsSum - itemsDiscount + deliveryPrice,
    });
  }, [itemsDiscount, itemsSum, deliveryPrice]);

  useEffect(() => {
    // to do добавить сумму доставки из апи
    setDeliveryPrice(0);
  }, [selectedItems]);

  return {
    orderPrices,
  };
};
