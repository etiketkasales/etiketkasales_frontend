"use client";
import React, { Dispatch, SetStateAction, Suspense } from "react";

import classes from "../filters.module.scss";
import FiltersCheckboxItem from "../checkbox-item";
import AccordeonSkeleton from "~/src/shared/ui/accordeon/ui/skeleton";
import {
  IFiltersItemDefault,
  ParsedFilter,
} from "~/src/features/filters/model";
import { IInitializedFilter } from "..";

interface Props extends ParsedFilter {
  setFilterForCatalogue: Dispatch<SetStateAction<IInitializedFilter[]>>;
}

export default function FiltersSeparator({
  name,
  type,
  data,
  setFilterForCatalogue,
}: Props) {
  const getChild = () => {
    switch (type) {
      default:
        return null;
      case "default":
        const filterData = data as IFiltersItemDefault;
        return (
          <FiltersCheckboxItem
            {...filterData}
            filterName={name}
            setFilterForCatalogue={setFilterForCatalogue}
          />
        );
      case "range":
      case "delivery":
    }
  };

  return (
    <Suspense fallback={<AccordeonSkeleton className={classes.skeleton} />}>
      {getChild()}
    </Suspense>
  );
}
