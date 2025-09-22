"use client";
import React from "react";
import { useOrderPrices } from "~/src/entities/order/lib/hooks/useOrderPrices.hook";

import classes from "./prices.module.scss";

interface ItemI {
  title: string;
  value: string;
  isDiscount?: boolean;
}

export default function OrderPaymentPrices() {
  const { orderPrices } = useOrderPrices();

  const items: ItemI[] = [
    {
      title: "17 товаров",
      value: `${orderPrices.itemsSum} ₽`,
    },
    {
      title: "Доставка",
      value: orderPrices.deliveryPrice ? `${orderPrices.deliveryPrice} ₽` : "",
    },
    {
      title: "Скидка",
      value: orderPrices.discountSum ? `- ${orderPrices.discountSum} ₽` : "",
      isDiscount: true,
    },
  ];

  const getTextColor = (
    isDiscount: boolean | undefined,
    isFirst: boolean,
  ): string => {
    const className: string[] = [];

    if (isDiscount) {
      className.push("green");
    } else {
      if (isFirst) {
        className.push("black");
      } else {
        className.push("gray-2");
      }
    }

    return `${className.join(" ")}`;
  };

  return (
    <div className={`flex-column gap-5 ${classes.container}`}>
      <ul className="flex-column gap-3">
        {items.map((item, index) => {
          const isFirst = index === 0;
          if (!item.value) return null;
          return (
            <li
              key={index}
              className={`flex-row gap-4 space-between align-items`}
            >
              <p
                className={`${getTextColor(false, isFirst)} text-16 semibold second-family`}
              >
                {item.title}
              </p>
              <p
                className={`${getTextColor(item.isDiscount, isFirst)} text-18 semibold second-family`}
              >
                {item.value}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="flex-row align-center gap-4 space-between">
        <p className="black text-20 semibold second-family">Итого</p>
        <p className="black text-30 bold second-family">
          {orderPrices.total} ₽
        </p>
      </div>
    </div>
  );
}
