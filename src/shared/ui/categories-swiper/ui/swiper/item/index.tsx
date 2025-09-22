"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  addFilter,
  selectCategories,
} from "~/src/app/store/reducers/categories.slice";

import classes from "./swiper-item.module.scss";
import ItemWrapper from "../item-wrapper";
import ImageContainer from "~/src/shared/ui/image-container";
import { CategoryItemInterface } from "~/src/shared/ui/categories-swiper/model/categories.interface";

interface Props {
  item: CategoryItemInterface;
}

export default function CategoryItem({ item }: Props) {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { currentFilter } = useAppSelector(selectCategories);

  const { url, name, cover_url } = item;

  return (
    <ItemWrapper
      className={currentFilter.includes(url ?? "__") ? classes.active : ""}
      onClick={() => {
        if (!window.location.pathname.includes("catalogue")) {
          push("/catalogue");
        }
        dispatch(addFilter(item));
      }}
    >
      <div className={`bg-gray-container padding-16 radius-16 ${classes.icon}`}>
        <ImageContainer
          src={cover_url}
          width={56}
          height={56}
          alt={name}
          className="radius-16"
        />
      </div>
      <p
        className={`gray-2 text-14 semibold second-family no-select text-center ${classes.text}`}
      >
        {name}
      </p>
    </ItemWrapper>
  );
}
