"use client";
import React from "react";
import classNames from "classnames";
import { useCatalogueProducts } from "~/src/entities/catalogue-section/lib/hooks/useCatalogueProducts.hook";

import classes from "./catalogue-products.module.scss";
import ItemWrapper from "~/src/entities/item-wrapper/ui";
import Container from "~/src/shared/ui/container/ui";
import LoaderCircle from "~/src/shared/ui/loader-circle";

export default function CatalogueProducts() {
  const { products, loading } = useCatalogueProducts();

  return (
    <Container
      as="ul"
      className={classNames(classes.container, {
        [classes.loading]: loading,
      })}
    >
      {loading && <LoaderCircle radius={20} className={classes.loader} />}
      {products &&
        products.map((item) => {
          return (
            <ItemWrapper key={item.id} item={item} className={classes.item} />
          );
        })}
    </Container>
  );
}
