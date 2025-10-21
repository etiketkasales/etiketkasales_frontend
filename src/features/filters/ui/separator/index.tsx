import React, { Suspense } from "react";

import classes from "../filters.module.scss";
import FiltersCheckboxItem from "../checkbox-item";
import AccordeonSkeleton from "~/src/shared/ui/accordeon/ui/skeleton";
import {
  IFiltersItemDefault,
  ParsedFilter,
} from "~/src/features/filters/model";

interface Props extends ParsedFilter {}

export default function FiltersSeparator({ name, type, data }: Props) {
  const getChild = () => {
    switch (type) {
      default:
        return null;
      case "default":
        const filterData = data as IFiltersItemDefault;
        return <FiltersCheckboxItem {...filterData} filterName={name} />;
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
