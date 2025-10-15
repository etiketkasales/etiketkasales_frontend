"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category_id");

  return (
    <ItemWrapper
      className={currentCategory === id.toString() ? classes.active : ""}
      itemId={item.id.toString()}
      type={type}
    >
      <ItemWrapperIcon image={image} name={name} />
      <ItemWrapperText text={name} />
    </ItemWrapper>
  );
}
