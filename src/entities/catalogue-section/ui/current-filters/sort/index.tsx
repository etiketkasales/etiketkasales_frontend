"use client";
import React from "react";
import { useWindowSize } from "react-use";
import { useGetSortOptions } from "~/src/entities/catalogue-section/lib/hooks/useGetSortOptions.hook";
import { useSort } from "~/src/entities/catalogue-section/lib/hooks/useSort.hook";

import classes from "./sort.module.scss";
import SortDesktop from "./desktop";

export default function Sort() {
  const { sortOptions, loading } = useGetSortOptions();
  const { activeSortOption, onItemClick } = useSort({ sortOptions });
  const { width } = useWindowSize();

  return (
    <>
      {width <= 768 ? (
        <></>
      ) : (
        <SortDesktop
          options={sortOptions}
          activeOption={activeSortOption}
          onItemClick={onItemClick}
          loading={loading}
        />
      )}
    </>
  );
}
