import React from "react";

import classes from "./skeleton-caption.module.scss";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

export default function ItemWrapperCaptionSkeleton() {
  return (
    <div className={`flex-column gap-2 flex-start ${classes.container}`}>
      <SkeletonWrapper className={classes.priceSkeleton} />
      <SkeletonWrapper className={classes.titleSkeleton} />
    </div>
  );
}
