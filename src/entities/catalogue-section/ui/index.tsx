"use client";
import React from "react";

import classes from "./catalogue-section.module.scss";
import CatalogueSuspenseWrapper from "./suspense-wrapper";
import CatalogueProducts from "./products";
import ProductsSkeleton from "./products/skeleton";
import Container from "~/src/shared/ui/container/ui";

export default function CatalogueSection() {
  return (
    <Container as="section" className={`${classes.container} flex-column`}>
      <CatalogueSuspenseWrapper fallback={<ProductsSkeleton />}>
        <CatalogueProducts />
      </CatalogueSuspenseWrapper>
    </Container>
  );
}
