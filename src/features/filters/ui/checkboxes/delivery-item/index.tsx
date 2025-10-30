"use client";
import React, { useCallback, useMemo } from "react";
import { useFiltersCheckbox } from "~/src/features/filters/lib/hooks/useFiltersCheckbox.hook";

import FiltersItem from "~/src/features/filters/ui/item";
import FiltersCheckAll from "../check-all";
import FiltersCheckbox from "../checkbox";
import {
  IDeliveryCheckbox,
  IFIltersDeliveryInput,
} from "~/src/features/filters/model/filters.interface";
import { IInitializedFilter } from "../..";
import StringUtils from "~/src/shared/lib/utils/string.util";

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
  order,
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

  const getTiming = useCallback((itemTime: string | number) => {
    if (typeof itemTime === "number") {
      return StringUtils.pluralizeWords(["день", "дня", "дней"], itemTime);
    }
    return itemTime;
  }, []);

  const getName = useCallback((item: IFIltersDeliveryInput) => {
    const name = item.name ? `${item.name}` : "";
    const timestamp = item.delivery_time
      ? `, ${getTiming(item.delivery_time)}`
      : "";
    const cost = item.cost ? `, ${item.cost}₽` : "";
    return `${name}${timestamp}${cost}`;
  }, [getTiming]);

  return (
    <FiltersItem title={title} order={order}>
      {filters && (
        <>
          <FiltersCheckAll checked={isAllActive} onChange={clearAllFilters} />
          {filters.map((item) => {
            const isActive = activeFilters.includes(item.id.toString());
            const filterValue = getName(item);
            return (
              <FiltersCheckbox
                key={item.id}
                isActiveFilter={isActive}
                onClick={() => {
                  const itemId = item.id.toString();
                  if (isAllActive) {
                    addAllExceptOne(itemId);
                  } else if (isActive) {
                    removeCertainFilter(itemId);
                  } else {
                    addCertainFilter(itemId);
                  }
                }}
                filterValue={filterValue}
              />
            );
          })}
        </>
      )}
    </FiltersItem>
  );
}
