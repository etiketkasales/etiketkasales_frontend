import React from "react";

import classes from "../catalogue-products.module.scss";
import ItemWrapperSkeleton from "~/src/entities/item-wrapper/ui/skeleton";
import Container from "~/src/shared/ui/container/ui";

export default function ProductsSkeleton() {
  const array = Array(12).fill("");

  return (
    <Container as="ul" className={classes.container}>
      {array.map((_, index) => (
        <ItemWrapperSkeleton key={index} className={classes.item} />
      ))}
    </Container>
  );
}
