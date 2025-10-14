"use client";
import React from "react";
import classNames from "classnames";

import classes from "./item-skeleton.module.scss";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

export default function ItemSkeleton() {
  return (
    <div className={classNames(`flex-column gap-2 align-center`)}>
      <SkeletonWrapper className={`${classes.icon_skeleton} radius-16`} />
      <SkeletonWrapper className={`${classes.text_skeleton} radius-16`} />
    </div>
  );
}
