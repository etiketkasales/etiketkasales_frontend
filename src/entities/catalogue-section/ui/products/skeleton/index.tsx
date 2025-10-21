import React from "react";

import classes from "../catalogue-products.module.scss";
import ItemWrapperSkeleton from "~/src/entities/item-wrapper/ui/skeleton";

export default function ProductsSkeleton() {
  const array = Array(12).fill("");

  return (
    <ul className={classes.container}>
      {array.map((_, index) => (
        <ItemWrapperSkeleton key={index} className={classes.item} />
      ))}
    </ul>
  );
}
