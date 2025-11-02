"use client";
import React, { Suspense } from "react";

import classes from "./catalogue-section.module.scss";
import CatalogueProducts from "./products";
import ProductsSkeleton from "./products/skeleton";
import CatalogueFilters from "./current-filters";
import CatalogueFiltersSkeleton from "./current-filters/skeleton";
import { IFilters } from "~/src/features/filters/model";

interface Props {
  initFilters: IFilters;
}

export default function CatalogueSection({ initFilters }: Props) {
  return (
    <section className={`${classes.container} flex-column`}>
      <Suspense fallback={<CatalogueFiltersSkeleton />}>
        <CatalogueFilters initFilters={initFilters} />
      </Suspense>
      <Suspense fallback={<ProductsSkeleton />}>
        <CatalogueProducts />
      </Suspense>
    </section>
  );
}
