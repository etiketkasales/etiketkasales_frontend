import React, { Suspense } from "react";

import classes from "./filters-checkboxes.module.scss";
import FiltersItem from "~/src/features/filters/ui/item";
import FiltersCheckboxesItem from "./item";
import CheckboxesItemSkeleton from "./item/skeleton";
import { IFilters } from "~/src/features/filters/model/filters.interface";

interface Props {
  initFilters: IFilters;
  clickRef: React.RefObject<HTMLDivElement | null>;
}

export default function FiltersCheckboxes({ initFilters, clickRef }: Props) {
  const keysToMap = Object.keys(initFilters);

  return keysToMap.map((filterKey, index) => {
    const item = initFilters[filterKey];
    return (
      <Suspense fallback={<CheckboxesItemSkeleton />} key={index + filterKey}>
        <FiltersItem
          title={item.title}
          className={classes.container}
          clickRef={clickRef}
        >
          {item.filters.map((item, index) => {
            return (
              <FiltersCheckboxesItem
                key={index + item}
                filterName={filterKey}
                filterValue={item}
              />
            );
          })}
        </FiltersItem>
      </Suspense>
    );
  });
}
