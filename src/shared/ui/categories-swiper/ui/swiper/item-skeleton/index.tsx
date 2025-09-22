"use client";
import React from "react";

import classes from "./item-skeleton.module.scss";
import ItemWrapper from "../item-wrapper";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

export default function ItemSkeleton() {
  return (
    <ItemWrapper>
      <SkeletonWrapper className={`${classes.icon_skeleton} radius-16`} />
      <SkeletonWrapper className={`${classes.text_skeleton} radius-16`} />
    </ItemWrapper>
  );
}
