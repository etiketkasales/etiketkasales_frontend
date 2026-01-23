"use client";
import React from "react";
import classNames from "classnames";
import { useSearchParams } from "next/navigation";
import { useCategoryItem } from "~/src/features/categories/lib/hooks/useCategoryItem.hook";

import itemClasses from "../item-wrapper/item-wrapper.module.scss";
import swiperItemClasses from "../item/swiper-item.module.scss";
import ItemWrapper from "../item-wrapper";
import ItemWrapperIcon from "../item/icon";
import ItemWrapperText from "../item/name";
import { CategorySwiperT } from "~/src/features/categories/model";
import { allCategory } from "~/src/features/categories/model";

interface Props {
  type: CategorySwiperT;
}

export default function AllCategories({ type }: Props) {
  const { onItemClick } = useCategoryItem(-1, null);
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
      onClick={onItemClick}
    >
      <ItemWrapperIcon image={allCategory.image} />
      <ItemWrapperText text={allCategory.name} />
    </ItemWrapper>
  );
}
