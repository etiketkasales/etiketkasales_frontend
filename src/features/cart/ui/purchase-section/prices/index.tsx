"use client";
import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  itemsSum: number;
  itemsDiscount: number;
  itemsCount: number;
}

interface ItemI {
  title: string;
  value: number;
  discount?: boolean;
}

export default function CartPrices({
  itemsDiscount,
  itemsSum,
  itemsCount,
}: Props) {
  const items: ItemI[] = [
    {
      title: StringUtils.pluralizeWords(
        ["товар", "товара", "товаров"],
        itemsCount,
      ),
      value: itemsSum,
    },
    {
      title: "Скидка",
      value: itemsDiscount,
      discount: true,
    },
  ];

  return (
    <div className="flex-column gap-5">
      <div className="flex-column gap-3">
        {items.map((item, index) => {
          if (item.discount && !item.value) return null;
          return (
            <div
              className={`flex-row space-between gap-3 align-center`}
              key={index}
            >
              <p
                className={`${item.discount ? "gray-2" : "black"} text-16 semibold second-family`}
              >
                {item.title}
              </p>
              <p
                className={`${item.discount ? "green" : "black"} text-18 semibold second-family`}
              >
                {item.discount && "- "}
                {item.value} ₽
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex-row gap-4 align-center space-between">
        <p className="black second-family semiibold text-20">Итого</p>
        <p className="black bold text-30 second-family">
          {itemsSum - itemsDiscount} ₽
        </p>
      </div>
    </div>
  );
}
