"use client";
import React from "react";
import { useCatalogueProducts } from "~/src/entities/catalogue-section/lib/hooks/useCatalogueProducts.hook";

import classes from "./catalogue-products.module.scss";
import ItemWrapper from "~/src/entities/item-wrapper/ui";
import ProductsSkeleton from "./skeleton";

export default function CatalogueProducts() {
  const { products, loading } = useCatalogueProducts();

  if (loading) return <ProductsSkeleton />;

  return (
    <ul className={classes.container}>
      {products.map((item) => {
        return (
          <ItemWrapper key={item.id} item={item} className={classes.item} />
        );
      })}
    </ul>
  );
}
