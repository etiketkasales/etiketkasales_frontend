"use client";
import React, { Suspense } from "react";

import classes from "./catalogue-section.module.scss";
import CatalogueProducts from "./products";
import ProductsSkeleton from "./products/skeleton";
import CatalogueFilters from "./current-filters";
import CatalogueFiltersSkeleton from "./current-filters/skeleton";

export default function CatalogueSection() {
  return (
    <section className={`${classes.container} flex-column`}>
      <Suspense fallback={<CatalogueFiltersSkeleton />}>
        <CatalogueFilters />
      </Suspense>
      <Suspense fallback={<ProductsSkeleton />}>
        <CatalogueProducts />
      </Suspense>
    </section>
  );
}
