"use client";
import React from "react";

import classes from "./catalogue-section.module.scss";
import CatalogueFilters from "./catalogue-filters";

export default function CatalogueSection() {
  return (
    <section className={`${classes.container} flex-row gap-5 align-start`}>
      <CatalogueFilters />
    </section>
  );
}
