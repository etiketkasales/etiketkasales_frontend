"use client";
import React from "react";
import { useWindowSize } from "react-use";

import classes from "./sort-select.module.scss";
import Icon from "~/public/catalogue/sort.svg";
import Select from "~/src/shared/ui/select/ui";
import SortItem from "./item";
import { ISortOption } from "~/src/entities/catalogue-section/model";

interface Props {
  options: ISortOption[];
  activeOption: string;
  onItemClick: (sb: string, so: string) => void;
}

export default function SortSelect({
  options,
  activeOption,
  onItemClick,
}: Props) {
  const { width } = useWindowSize();

  return (
    <Select
      options={options}
      activeOption={activeOption}
      optionsPosTop={8}
      className={classes.container}
      selectButtonClassName={`grid-column align-center gap-6px space between ${classes.sortButton}`}
      optionsClassName={`flex-column ${classes.sortOptions}`}
      renderItem={(itemParent, _) => {
        return itemParent.orders.map((sortItem, index) => {
          return (
            <SortItem
              key={index + itemParent.key}
              name={sortItem.name}
              isActive={activeOption === sortItem.name}
              onClick={() => onItemClick(itemParent.key, sortItem.key)}
            />
          );
        });
      }}
      optionHolder="Способ сортировки"
      HeadingIconRight={
        width <= 1024 ? <Icon className={classes.icon} /> : null
      }
      selectedOptionClassName={classes.activeOption}
    />
  );
}
