"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCart } from "~/src/app/store/reducers/cart.slice";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./items.module.scss";
import OrderMainWrapper from "../wrapper";
import ImageContainer from "~/src/shared/ui/image-container";

interface ItemI {
  link: string;
  image: string;
}

export default function OrderMainItems() {
  const { push } = useRouter();
  const { selectedItems, cartItems } = useAppSelector(selectCart);
  const [itemsToMap, setItemsToMap] = useState<ItemI[]>([]);

  useEffect(() => {
    const items = selectedItems.map((id) => {
      const item = cartItems.find((item) => item.id === id);
      return {
        link: item?.url || "",
        image: item?.cover_image || "",
      };
    });
    setItemsToMap(items);
  }, [selectedItems, cartItems]);
  return (
    <OrderMainWrapper
      title={StringUtils.pluralizeWords(
        ["товар", "товара", "товаров"],
        selectedItems.length,
      )}
    >
      <ul className={`flex-row ${classes.container}`}>
        {itemsToMap.length &&
          itemsToMap.map((item, index) => {
            return (
              <li
                key={index}
                className="flex cursor"
                onClick={() => push(`/etiketka/${item.link}`)}
              >
                <ImageContainer
                  src={item.image}
                  alt="Картинка товара"
                  width={80}
                  height={80}
                  radius={16}
                />
              </li>
            );
          })}
      </ul>
    </OrderMainWrapper>
  );
}
