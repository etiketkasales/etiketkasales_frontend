import React from "react";

import classes from "./checkbox-skeleton.module.scss";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

export default function CheckboxesItemSkeleton() {
  return (
    <div className="flex-row gap-10px align-center">
      <SkeletonWrapper className={classes.icon} />
      <SkeletonWrapper className={classes.text} />
    </div>
  );
}
