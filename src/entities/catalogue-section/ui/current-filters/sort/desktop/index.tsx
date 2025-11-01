import React from "react";
import { ISortOption } from "~/src/entities/catalogue-section/model";

import classes from "./desktop-sort.module.scss";
import Select from "~/src/shared/ui/select/ui";
import SortItem from "./item";

interface Props {
  options: ISortOption[];
  activeOption: string;
  onItemClick: (sb: string, so: string) => void;
  loading: boolean;
}

export default function SortDesktop({
  options,
  activeOption,
  onItemClick,
  loading,
}: Props) {
  return (
    <Select
      options={options}
      activeOption={activeOption}
      optionsPosTop={8}
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
      loading={loading}
    />
  );
}
