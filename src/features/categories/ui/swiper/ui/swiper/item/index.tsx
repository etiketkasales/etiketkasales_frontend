"use client";
import React from "react";
import classNames from "classnames";
import { useCategoryItem } from "~/src/features/categories/lib/hooks/useCategoryItem.hook";

import classes from "./swiper-item.module.scss";
import ItemWrapper from "../item-wrapper";
import ItemWrapperText from "./name";
import ItemWrapperIcon from "./icon";
import {
  CategorySwiperT,
  ICategory,
} from "~/src/features/categories/model/categories.interface";

interface Props {
  item: ICategory;
  type: CategorySwiperT;
}

export default function CategoryItem({ item, type }: Props) {
  const { id, name, image } = item;
  const { isActive, onItemClick } = useCategoryItem(id, name);

  return (
    <ItemWrapper
      className={classNames(classes.container, {
        [classes.active]: isActive,
      })}
      itemId={item.id.toString()}
      type={type}
      onClick={onItemClick}
    >
      <ItemWrapperIcon image={image} />
      <ItemWrapperText text={name} />
    </ItemWrapper>
  );
}
