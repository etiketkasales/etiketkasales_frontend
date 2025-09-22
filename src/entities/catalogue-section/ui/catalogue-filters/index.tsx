"use client";
import React from "react";

import classes from "./catalogue-filters.module.scss";

interface Props {}

export default function CatalogueFilters({}: Props) {
  return (
    <section
      className={`padding-16 flex-column gap-7 ${classes.container}`}
    ></section>
  );
}
