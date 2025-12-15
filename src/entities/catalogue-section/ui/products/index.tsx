"use client";
import React from "react";
import classNames from "classnames";
import { useCatalogueProducts } from "~/src/entities/catalogue-section/lib/hooks/useCatalogueProducts.hook";

import classes from "./catalogue-products.module.scss";
import ItemWrapper from "~/src/entities/item-wrapper/ui";
import Container from "~/src/shared/ui/container/ui";
import Loader from "~/src/shared/ui/loader";
import LoadMoreButton from "./load-more";

const productsBatchSize = 24;

export default function CatalogueProducts() {
  const { products, loading, paginationPage, setPaginationPage } =
    useCatalogueProducts();

  return (
    <Container
      className={classNames(classes.container, {
        [classes.loading]: loading,
      })}
    >
      {loading && <Loader radius={20} className={classes.loader} />}
      <ul className={classes.list}>
        {products &&
          products.map((item) => {
            return (
              <ItemWrapper key={item.id} item={item} className={classes.item} />
            );
          })}
      </ul>
      {products && products.length === paginationPage * productsBatchSize && (
        <LoadMoreButton
          paginationPage={paginationPage}
          setPaginationPage={(page) => setPaginationPage(page + 1)}
        />
      )}
    </Container>
  );
}
