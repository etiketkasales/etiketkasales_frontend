"use client";
import React from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";

import itemClasses from "../item-wrapper/item-wrapper.module.scss";
import swiperItemClasses from "../item/swiper-item.module.scss";
import ItemWrapper from "../item-wrapper";
import ItemWrapperIcon from "../item/icon";
import ItemWrapperText from "../item/name";
import { CategorySwiperT } from "~/src/features/categories/model/categories.interface";
import { allCategory } from "~/src/features/categories/model/categories.const";

interface Props {
  type: CategorySwiperT;
}

export default function AllCategories({ type }: Props) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");

  return (
    <ItemWrapper
      itemId={allCategory.itemId}
      type={type}
      className={classNames(itemClasses.container, {
        [swiperItemClasses.active]: !categoryId && type !== "home",
      })}
      clickAction="clear"
    >
      <ItemWrapperIcon image={allCategory.image} name={allCategory.name} />
      <ItemWrapperText text={allCategory.name} />
    </ItemWrapper>
  );
}
