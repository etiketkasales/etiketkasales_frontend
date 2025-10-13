"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./items.module.scss";
import OrderMainWrapper from "../wrapper";
import ImageContainer from "~/src/shared/ui/image-container/ui";
import { selectCart } from "~/src/app/store/reducers/cart.slice";

interface ItemI {
  link: string;
  image: string;
}

// TO DO: переписать под новый апи корзины, сейчас неправильно

export default function OrderMainItems() {
  const { push } = useRouter();
  const { selectedItems, items } = useAppSelector(selectCart);
  const [itemsToMap, setItemsToMap] = useState<ItemI[]>([]);

  useEffect(() => {
    const newItems = selectedItems.map((id) => {
      const item = items.find((item) => item.id === id);
      return {
        link: item?.slug || "",
        image: item?.images[0] || "",
      };
    });
    setItemsToMap(newItems);
  }, [selectedItems, items]);
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
