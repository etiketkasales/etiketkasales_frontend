"use client";
import React from "react";
import { useCurrentFilters } from "~/src/entities/catalogue-section/lib/hooks/useCurrentFIlters.hook";

import classes from "./current-filters.module.scss";
import CurrentFiltersItem from "./filter";
import CurrentCategories from "./categories";
import ClearAllFilters from "./clear-filters";
import Sort from "./sort";
import CatalogueFiltersModal from "./filters-modal";
import { IFilters } from "~/src/features/filters/model";

interface Props {
  initFilters: IFilters;
}

export default function CatalogueFilters({ initFilters }: Props) {
  const { activeCategories, activeFilters, needClearButton } =
    useCurrentFilters();

  return (
    <div className="flex-row gap-3 align-center">
      <div
        className={`flex-row gap-3 align-center ${classes.buttonsContainer}`}
      >
        <Sort className={classes.sortMedia} />
        <CatalogueFiltersModal initFilters={initFilters} />
      </div>
      <div className={`flex-row ${classes.container}`}>
        <Sort className={classes.sort} />
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
        {needClearButton ? <ClearAllFilters /> : null}
      </div>
    </div>
  );
}
