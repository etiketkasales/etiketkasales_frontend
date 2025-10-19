"use client";
import React from "react";
import { useFiltersItem } from "~/src/features/filters/lib/hooks/useFiltersItem.hook";

import CheckboxInput from "~/src/shared/ui/inputs/checkbox";

interface Props {
  filterName: string;
  filterValue: string;
}

export default function FiltersCheckboxesItem({
  filterName,
  filterValue,
}: Props) {
  const { isActiveFilter, handleUpdateParams } = useFiltersItem({
    filterName,
    filterValue,
  });

  return (
    <CheckboxInput
      onChange={() => {
        handleUpdateParams(filterValue);
      }}
      checked={isActiveFilter}
      label={filterValue}
      classNameLabel="text-neutral-700 text-body l"
      gap="10px"
    />
  );
}
