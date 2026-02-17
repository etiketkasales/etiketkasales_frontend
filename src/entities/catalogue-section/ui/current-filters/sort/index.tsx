"use client";

import { useGetSortOptions } from "~/src/entities/catalogue-section/lib/hooks/useGetSortOptions.hook";
import { useSort } from "~/src/entities/catalogue-section/lib/hooks/useSort.hook";

import SortSelect from "./select";

interface Props {
  className?: string;
}

export default function Sort({ className }: Props) {
  const { sortOptions } = useGetSortOptions();
  const { activeSortOption, onItemClick } = useSort({ sortOptions });

  return (
    <SortSelect
      options={sortOptions}
      activeOption={activeSortOption}
      onItemClick={onItemClick}
      className={className}
    />
  );
}
