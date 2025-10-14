"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import classes from "./swiper-item.module.scss";
import ItemWrapper from "../item-wrapper";
import ImageContainer from "~/src/shared/ui/image-container/ui";
import Container from "~/src/shared/ui/container/ui";
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
      className={currentCategory?.includes(`${id}`) ? classes.active : ""}
      itemId={item.id.toString()}
      type={type}
    >
      <Container
        bgColor="neutral-300"
        className={`${classes.icon} padding-16 radius-16`}
      >
        <ImageContainer
          src={image}
          width={24}
          height={24}
          alt={name}
          className="radius-16"
        />
      </Container>
      <p
        className={`body-text m text-neutral-700 no-select text-center ${classes.text}`}
      >
        {name}
      </p>
    </ItemWrapper>
  );
}
