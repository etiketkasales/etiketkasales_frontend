import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";

import classes from "./current-filters.module.scss";
import CurrentFiltersItem from "./filter";
import CurrentCategories from "./categories";

export default function CatalogueFilters() {
  const { activeFilters, activeCategories } = useAppSelector(selectCatalogue);
  return (
    <div className={`flex-row ${classes.container}`}>
      <CurrentCategories categories={activeCategories} />
      {activeFilters &&
        activeFilters.map((item, index) => {
          const value = item.filters[0];
          const lastCount = item.filters.length - 1 || 0;
          if (!value) return null;
          return (
            <CurrentFiltersItem
              key={index + item.filterName}
              title={item.title}
              filterName={item.filterName}
              value={value}
              lastCount={lastCount}
            />
          );
        })}
    </div>
  );
}
