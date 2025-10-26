import React from "react";
import { useFiltersRange } from "~/src/features/filters/lib/hooks/useFiltersRange.hook";

import classes from "./range-item.module.scss";
import FiltersItem from "../item";
import FilterRangeClear from "./clear";
import FiltersRange from "./range";
import { IFiltersRange } from "~/src/features/filters/model";

interface Props extends IFiltersRange {
  filterName: string;
}

export default function FiltersRangeItem({
  min,
  max,
  title,
  filterName,
  order,
}: Props) {
  const { rangeValue, isImportant, onInputChange, clearRange } =
    useFiltersRange({
      minLimit: min,
      maxLimit: max,
      filterName,
      filterTitle: title,
    });

  return (
    <FiltersItem
      title={title}
      classNameChildren={`flex-column ${classes.container}`}
      order={order}
    >
      <FiltersRange
        value={rangeValue}
        onInputChange={onInputChange}
        min={min}
        max={max}
        filterName={filterName}
      />
      <FilterRangeClear isActive={!isImportant} onClick={clearRange} />
    </FiltersItem>
  );
}
