"use client";
import React, { useRef } from "react";
import classNames from "classnames";
import { useFiltersParse } from "~/src/features/filters/lib/hooks/useFiltersParse.hook";

import classes from "./filters.module.scss";
import Container from "~/src/shared/ui/container/ui";
import FiltersSeparator from "./separator";
import { IFilters } from "~/src/features/filters/model";

interface Props {
  initFilters: IFilters;
}

export default function ProductsFilters({ initFilters }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const parsedFilters = useFiltersParse({ filters: initFilters });

  return (
    <Container
      ref={ref}
      className={classNames(classes.container, `flex-column`)}
    >
      {parsedFilters.map((item, index) => {
        return <FiltersSeparator key={index + item.name} {...item} />;
      })}
    </Container>
  );
}
