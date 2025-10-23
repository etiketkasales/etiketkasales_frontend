"use client";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useFiltersParse } from "~/src/features/filters/lib/hooks/useFiltersParse.hook";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueActiveFilters } from "~/src/app/store/reducers/catalogue.slice";

import classes from "./filters.module.scss";
import Container from "~/src/shared/ui/container/ui";
import FiltersSeparator from "./separator";
import { IFilters } from "~/src/features/filters/model";

interface Props {
  initFilters: IFilters;
  className?: string;
}

export interface IInitializedFilter {
  title: string;
  filterName: string;
  filters: string[];
}

export default function ProductsFilters({ initFilters, className }: Props) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const parsedFilters = useFiltersParse({ filters: initFilters });
  const [filterForCatalogue, setFilterForCatalogue] = useState<
    IInitializedFilter[]
  >([]);

  useEffect(() => {
    dispatch(setCatalogueActiveFilters(filterForCatalogue));
  }, [dispatch, filterForCatalogue]);

  return (
    <Container
      ref={ref}
      className={classNames(classes.container, `flex-column`, className)}
    >
      {parsedFilters.map((item, index) => {
        return (
          <FiltersSeparator
            key={index + item.name}
            {...item}
            setFilterForCatalogue={setFilterForCatalogue}
          />
        );
      })}
    </Container>
  );
}
