"use client";
import React, { Dispatch, SetStateAction, Suspense } from "react";

import classes from "../filters.module.scss";
import AccordeonSkeleton from "~/src/shared/ui/accordeon/ui/skeleton";
import FiltersCheckboxItem from "../checkboxes/default-item";
import FiltersDeliveryItem from "../checkboxes/delivery-item";
import FiltersRangeItem from "../range-item";
import {
  IFiltersDelivery,
  IFiltersItemDefault,
  IFiltersRange,
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
      case "":
        return null;
      case "default":
        const checkboxData = data as IFiltersItemDefault;
        return (
          <FiltersCheckboxItem
            {...checkboxData}
            filterName={name}
            setFilterForCatalogue={setFilterForCatalogue}
          />
        );
      case "range":
        const rangeData = data as IFiltersRange;
        return <FiltersRangeItem filterName={name} {...rangeData} />;
      case "delivery":
        const deliveryData = data as IFiltersDelivery;
        return (
          <FiltersDeliveryItem
            filterName={name}
            setFilterForCatalogue={setFilterForCatalogue}
            {...deliveryData}
          />
        );
    }
  };

  return (
    <Suspense fallback={<AccordeonSkeleton className={classes.skeleton} />}>
      {getChild()}
    </Suspense>
  );
}
