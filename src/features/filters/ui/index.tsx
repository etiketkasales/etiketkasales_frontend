"use client";
import React, { useRef } from "react";
import classNames from "classnames";

import classes from "./filters.module.scss";
import Container from "~/src/shared/ui/container/ui";
import FiltersCheckboxes from "./checkboxes";
import { IFilters } from "../model/filters.interface";

interface Props {
  initFilters: IFilters;
}

export default function ProductsFilters({ initFilters }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Container
      ref={ref}
      className={classNames(classes.container, `flex-column`)}
    >
      <FiltersCheckboxes initFilters={initFilters} clickRef={ref} />
    </Container>
  );
}
