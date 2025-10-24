"use client";
import React, { useCallback, useMemo } from "react";
import { useFiltersCheckbox } from "~/src/features/filters/lib/hooks/useFiltersCheckbox.hook";

import FiltersItem from "~/src/features/filters/ui/item";
import {
  IDeliveryCheckbox,
  IFIltersDeliveryInput,
} from "~/src/features/filters/model/filters.interface";
import { IInitializedFilter } from "../..";
import FiltersCheckAll from "../check-all";
import FiltersCheckbox from "../checkbox";

interface Props extends IDeliveryCheckbox {
  setFilterForCatalogue: React.Dispatch<
    React.SetStateAction<IInitializedFilter[]>
  >;
}
// прим.: Тут логика точно такая же как в checkbox-item,
// просто я не придумал как можно объединить эти два компонента поэтому скопировал первый и немного доработал

export default function FiltersDeliveryItem({
  filters,
  title,
  filterName,
  setFilterForCatalogue,
}: Props) {
  const filtersArray = useMemo(
    () => filters.map((item) => item.id.toString()),
    [filters],
  );
  const {
    isAllActive,
    activeFilters,
    addCertainFilter,
    removeCertainFilter,
    addAllExceptOne,
    clearAllFilters,
  } = useFiltersCheckbox({
    filterName,
    filtersArray,
    filterTitle: title,
    setFilterForCatalogue,
  });

  const getName = useCallback((item: IFIltersDeliveryInput) => {
    const name = item.name ? `${item.name},` : "";
    const timestamp = item.delivery_time ? `${item.delivery_time},` : "";
    const cost = item.cost ? `${item.cost}` : "";
    return `${name} ${timestamp} ${cost}`;
  }, []);

  return (
    <FiltersItem title={title}>
      <FiltersCheckAll checked={isAllActive} onChange={clearAllFilters} />
      {filters.map((item) => {
        const isActive = activeFilters.includes(item.id.toString());
        const filterValue = getName(item);
        return (
          <FiltersCheckbox
            key={item.id}
            isActiveFilter={isActive}
            onClick={
              isAllActive
                ? addAllExceptOne
                : isActive
                  ? removeCertainFilter
                  : addCertainFilter
            }
            filterValue={filterValue}
          />
        );
      })}
    </FiltersItem>
  );
}
