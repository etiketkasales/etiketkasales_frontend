import React from "react";

import classes from "./skeleton.module.scss";
import ItemWrapperSkeleton from "./item";

export default function CatalogueFiltersSkeleton() {
  const skeletons = Array(5).fill("");
  return (
    <div className={classes.container}>
      {skeletons.map((_, index) => (
        <ItemWrapperSkeleton key={index} />
      ))}
    </div>
  );
}
