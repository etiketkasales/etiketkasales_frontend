"use client";
import React from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueActiveCategories } from "~/src/app/store/reducers/catalogue.slice";
import { useRouter } from "next/navigation";

import classes from "./clear-filters.module.scss";
import FilterWrapperWithIcon from "../item-wrapper/with-button";

export default function ClearAllFilters() {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  return (
    <FilterWrapperWithIcon
      type="neutral"
      className="relative"
      classNameButton={classes.button}
      classNameIcon={classes.icon}
      onButtonClick={() => {
        push("/catalogue");
        dispatch(setCatalogueActiveCategories(null));
      }}
    >
      <span className="body l text-neutral-800">Очистить фильтры</span>
    </FilterWrapperWithIcon>
  );
}
