"use client";
import React from "react";
import { useFiltersCheckbox } from "~/src/features/filters/lib/hooks/useFiltersCheckbox.hook";

import FiltersItem from "~/src/features/filters/ui/item";
import { IFiltersItemDefault } from "~/src/features/filters/model/filters.interface";
import { IInitializedFilter } from "../..";
import FiltersCheckAll from "../check-all";
import FiltersCheckbox from "../checkbox";

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
    <FiltersItem title={title}>
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
