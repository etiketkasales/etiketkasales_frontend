"use client";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectCatalogue,
  setCatalogueActiveFilters,
} from "~/src/app/store/reducers/catalogue.slice";

import classes from "./filters.module.scss";
import Container from "~/src/shared/ui/container/ui";
import FiltersSeparator from "./separator";

interface Props {
  className?: string;
}

export interface IInitializedFilter {
  title: string;
  filterName: string;
  filters: string[];
}

export default function ProductsFilters({ className }: Props) {
  const { parsedFilters } = useAppSelector(selectCatalogue);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
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
