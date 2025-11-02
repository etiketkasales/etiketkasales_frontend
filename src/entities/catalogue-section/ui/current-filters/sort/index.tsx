"use client";
import React from "react";
import { useGetSortOptions } from "~/src/entities/catalogue-section/lib/hooks/useGetSortOptions.hook";
import { useSort } from "~/src/entities/catalogue-section/lib/hooks/useSort.hook";

import SortSelect from "./select";

export default function Sort() {
  const { sortOptions } = useGetSortOptions();
  const { activeSortOption, onItemClick } = useSort({ sortOptions });

  return (
    <SortSelect
      options={sortOptions}
      activeOption={activeSortOption}
      onItemClick={onItemClick}
    />
  );
}
