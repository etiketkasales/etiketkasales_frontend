"use client";
import React from "react";
import { useFiltersCheckbox } from "~/src/features/filters/lib/hooks/useFiltersCheckbox.hook";

import classes from "./filters-checkboxes.module.scss";
import FiltersItem from "~/src/features/filters/ui/item";
import FiltersCheckbox from "./checkbox";
import FiltersCheckAll from "./check-all";
import { IFiltersItemDefault } from "~/src/features/filters/model/filters.interface";
import { IInitializedFilter } from "..";

interface Props extends IFiltersItemDefault {
  filterName: string;
  setFilterForCatalogue: React.Dispatch<
    React.SetStateAction<IInitializedFilter[]>
  >;
}

export default function FiltersCheckboxItem({
  filters,
  title,
  filterName,
  setFilterForCatalogue,
}: Props) {
  const {
    isAllActive,
    activeFilters,
    addCertainFilter,
    removeCertainFilter,
    addAllExceptOne,
    clearAllFilters,
  } = useFiltersCheckbox({
    filterName,
    filtersArray: filters,
    filterTitle: title,
    setFilterForCatalogue,
  });

  return (
    <FiltersItem title={title} className={classes.container}>
      <FiltersCheckAll checked={isAllActive} onChange={clearAllFilters} />
      {filters.map((item, index) => {
        const isActive = activeFilters.includes(item);
        return (
          <FiltersCheckbox
            key={index + item}
            isActiveFilter={isActive}
            onClick={
              isAllActive
                ? addAllExceptOne
                : isActive
                  ? removeCertainFilter
                  : addCertainFilter
            }
            filterValue={item}
          />
        );
      })}
    </FiltersItem>
  );
}
