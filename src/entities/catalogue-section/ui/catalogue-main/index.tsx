"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectCategories } from "~/src/app/store/reducers/categories.slice";
import { selectCatalogue } from "~/src/app/store/reducers/catalogue.slice";

import classes from "./catalogue.module.scss";
import { CatalogueFilterI } from "../../model/catalogue.interface";

interface Props {}

export default function CatalogueMain({}: Props) {
  const { currentFiltersNames } = useAppSelector(selectCategories);
  const { allFilters } = useAppSelector(selectCatalogue);

  const getAllFilters = () => {
    const result: string[][] = [];

    if (Array.isArray(currentFiltersNames)) {
      result.push(currentFiltersNames);
    }

    return result;
  };

  const groupedAllFilters = getAllFilters();

  return <div className={`flex-column ${classes.container} gap-5`}></div>;
}
